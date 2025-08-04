const OpenAI = require('openai');

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const generateTravelPlan = async (travelData) => {
  const {
    origin,
    destination,
    startDate,
    endDate,
    budget,
    holidayType,
    persons,
    preferences
  } = travelData;

  // Calculate trip duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const prompt = `Create a comprehensive travel plan with the following requirements:

TRIP DETAILS:
- Origin: ${origin}
- Destination: ${destination}
- Start Date: ${startDate}
- End Date: ${endDate}
- Duration: ${duration} days
- Budget: $${budget} total
- Holiday Type: ${holidayType}
- Number of Travelers: ${persons}
${preferences ? `- Additional Preferences: ${preferences}` : ''}

Please create a detailed travel plan that includes:

1. OVERVIEW
   - Trip summary
   - Best time to visit considerations
   - Overall budget breakdown

2. TRANSPORTATION
   - Recommended flights/transportation options
   - Estimated costs
   - Booking tips

3. ACCOMMODATION
   - Hotel/lodging recommendations by area
   - Price ranges per night
   - Booking strategies

4. DAILY ITINERARY (for each day)
   - Day X: Date
   - Morning: Activities/attractions
   - Afternoon: Activities/attractions  
   - Evening: Dining/entertainment
   - Estimated daily costs
   - Transportation between locations

5. DINING RECOMMENDATIONS
   - Must-try local cuisine
   - Restaurant recommendations (budget to luxury)
   - Estimated meal costs

6. PACKING SUGGESTIONS
   - Weather-appropriate clothing
   - Essential items for activities
   - Local considerations

7. BUDGET BREAKDOWN
   - Transportation: $X
   - Accommodation: $X (total for ${duration} nights)
   - Food: $X
   - Activities/Attractions: $X
   - Shopping/Miscellaneous: $X
   - Emergency fund: $X
   - TOTAL: $${budget}

8. TIPS & CONSIDERATIONS
   - Local customs and etiquette
   - Currency and payment methods
   - Safety considerations
   - Language tips
   - Emergency contacts

Format the response as a well-structured travel plan that's easy to read and follow. Make sure all recommendations fit within the specified budget of $${budget} for ${persons} person(s). Focus on ${holidayType} style activities and experiences.`;

  try {
    // Check if OpenAI is available
    if (!openai) {
      console.log('OpenAI API key not found, using fallback plan');
      return generateFallbackPlan(travelData);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner with extensive knowledge of destinations worldwide. Create detailed, realistic, and budget-conscious travel plans that provide exceptional value and memorable experiences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Parse the response and structure it
    return {
      tripOverview: {
        origin,
        destination,
        startDate,
        endDate,
        duration,
        budget,
        holidayType,
        persons
      },
      plan: aiResponse,
      generatedAt: new Date().toISOString(),
      estimatedCosts: extractBudgetInfo(aiResponse, budget)
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback to a basic plan if AI fails
    if (error.code === 'insufficient_quota' || error.code === 'rate_limit_exceeded') {
      return generateFallbackPlan(travelData);
    }
    
    throw new Error(`AI service unavailable: ${error.message}`);
  }
};

const extractBudgetInfo = (planText, totalBudget) => {
  // Simple regex to extract budget information from the AI response
  const budgetRegex = /\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g;
  const amounts = [];
  let match;
  
  while ((match = budgetRegex.exec(planText)) !== null) {
    amounts.push(parseFloat(match[1].replace(',', '')));
  }
  
  return {
    totalBudget: parseFloat(totalBudget),
    estimatedCosts: amounts.slice(0, 6), // Take first 6 cost estimates
    budgetUtilization: amounts.length > 0 ? (amounts.reduce((a, b) => a + b, 0) / totalBudget * 100).toFixed(1) + '%' : 'N/A'
  };
};

const generateFallbackPlan = (travelData) => {
  const { origin, destination, startDate, endDate, budget, holidayType, persons } = travelData;
  const duration = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  
  return {
    tripOverview: {
      origin,
      destination,
      startDate,
      endDate,
      duration,
      budget,
      holidayType,
      persons
    },
    plan: `# Travel Plan: ${origin} to ${destination}

## Trip Overview
- **Destination**: ${destination}
- **Duration**: ${duration} days
- **Budget**: $${budget}
- **Travel Style**: ${holidayType}
- **Travelers**: ${persons}

## Basic Recommendations

### Transportation
- Research flights from ${origin} to ${destination}
- Budget approximately 25-30% of total budget for transportation
- Consider booking 6-8 weeks in advance for best prices

### Accommodation
- Budget approximately 30-40% of total budget for accommodation
- Look for ${holidayType === 'budget' ? 'hostels, guesthouses, or budget hotels' : holidayType === 'luxury' ? 'luxury hotels and resorts' : 'mid-range hotels'}
- Consider location vs. price trade-offs

### Activities
- Research popular attractions in ${destination}
- Budget 20-25% for activities and experiences
- Book popular attractions in advance

### Dining
- Budget 15-20% for meals
- Try local cuisine and specialties
- Mix of restaurant meals and local street food

### Daily Budget
- Approximate daily budget per person: $${Math.round(budget / persons / duration)}

## Important Notes
- This is a basic plan template
- Please research current travel requirements and restrictions
- Consider travel insurance
- Check visa requirements if applicable

*Note: For detailed personalized recommendations, please ensure AI service is properly configured.*`,
    generatedAt: new Date().toISOString(),
    estimatedCosts: {
      totalBudget: parseFloat(budget),
      budgetUtilization: 'Basic estimate'
    },
    fallback: true
  };
};

module.exports = {
  generateTravelPlan
};
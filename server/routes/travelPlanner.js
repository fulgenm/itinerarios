const express = require('express');
const { generateTravelPlan } = require('../services/aiService');

const router = express.Router();

// POST /api/travel/plan - Generate travel plan
router.post('/plan', async (req, res) => {
  try {
    const {
      origin,
      destination,
      startDate,
      endDate,
      budget,
      holidayType,
      persons,
      preferences
    } = req.body;

    // Validate required fields
    if (!origin || !destination || !startDate || !endDate || !budget || !holidayType || !persons) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['origin', 'destination', 'startDate', 'endDate', 'budget', 'holidayType', 'persons']
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Reset time to start of day

    if (start >= end) {
      return res.status(400).json({
        error: 'End date must be after start date'
      });
    }

    if (start < now) {
      return res.status(400).json({
        error: 'Start date cannot be in the past'
      });
    }

    // Validate budget
    if (isNaN(budget) || budget <= 0) {
      return res.status(400).json({
        error: 'Budget must be a positive number'
      });
    }

    // Validate persons
    if (isNaN(persons) || persons <= 0) {
      return res.status(400).json({
        error: 'Number of persons must be a positive number'
      });
    }

    console.log('Generating travel plan for:', { origin, destination, startDate, endDate, budget, holidayType, persons });

    // Generate travel plan using AI
    const travelPlan = await generateTravelPlan({
      origin,
      destination,
      startDate,
      endDate,
      budget,
      holidayType,
      persons,
      preferences
    });

    res.json({
      success: true,
      travelPlan
    });

  } catch (error) {
    console.error('Error generating travel plan:', error);
    res.status(500).json({
      error: 'Failed to generate travel plan',
      message: error.message
    });
  }
});

module.exports = router;
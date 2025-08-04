# AI Travel Planner 🌍✨

An intelligent travel planning web application that uses AI to create comprehensive, personalized travel itineraries based on user preferences.

## Features

- **AI-Powered Planning**: Utilizes OpenAI's GPT-4 to generate detailed travel plans
- **Comprehensive Input Form**: Collects origin, destination, dates, budget, travel style, and preferences
- **Beautiful Modern UI**: Responsive design with Tailwind CSS and smooth animations
- **Detailed Itineraries**: Day-by-day planning with activities, dining, and budget breakdowns
- **Multiple Travel Styles**: Supports leisure, adventure, cultural, business, romantic, family, budget, and luxury travel
- **Interactive Results**: Tabbed interface for easy navigation through plan sections
- **Print & Share**: Export and share your travel plans
- **Fallback System**: Basic template plans when AI service is unavailable

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js & Express** - Server runtime and web framework
- **OpenAI API** - AI-powered travel plan generation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, client)
npm run install-all
```

### 2. Environment Setup

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
CLIENT_URL=http://localhost:3000

# Rate Limiting (requests per 15 minutes)
RATE_LIMIT_MAX=10
```

### 3. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### 4. Start the Application

**Development Mode (both server and client):**
```bash
npm run dev
```

**Or start them separately:**

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Usage

1. **Fill out the travel form**:
   - Enter your departure city and destination
   - Select travel dates
   - Set your budget and number of travelers
   - Choose your travel style (leisure, adventure, cultural, etc.)
   - Add any additional preferences

2. **Generate your plan**:
   - Click "Generate My Travel Plan"
   - Wait 30-60 seconds for AI processing

3. **Explore your itinerary**:
   - Review the overview, daily itinerary, budget breakdown, and tips
   - Use the tabs to navigate between sections
   - Print or share your plan

## API Endpoints

### Travel Planning
- `POST /api/travel/plan` - Generate a travel plan

**Request Body:**
```json
{
  "origin": "New York, NY",
  "destination": "Paris, France",
  "startDate": "2024-06-01",
  "endDate": "2024-06-08",
  "budget": 3000,
  "holidayType": "cultural",
  "persons": 2,
  "preferences": "Love museums and local cuisine"
}
```

### Health Check
- `GET /api/health` - Check API status

## Project Structure

```
ai-travel-planner/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.js
│   │   │   ├── TravelForm.js
│   │   │   ├── TravelPlan.js
│   │   │   └── LoadingSpinner.js
│   │   ├── App.js        # Main app component
│   │   └── index.js      # App entry point
│   └── package.json
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── index.js         # Server entry point
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**1. OpenAI API Errors**
- Ensure your API key is valid and has sufficient credits
- Check the `.env` file configuration
- Verify network connectivity

**2. Frontend Connection Issues**
- Make sure the backend is running on port 5000
- Check CORS configuration
- Verify the API URL in the frontend

**3. Installation Problems**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall
- Ensure Node.js version compatibility

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `PORT` | Backend server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |
| `RATE_LIMIT_MAX` | API rate limit | 10 |

## Security Features

- Rate limiting to prevent API abuse
- Input validation and sanitization
- CORS protection
- Helmet security middleware
- Environment variable protection

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- Tailwind CSS for the beautiful styling system
- Heroicons for the icon set
- React team for the amazing framework

## Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ and AI** - Happy traveling! 🌍✈️
# 🎣 Fishing Weather Dashboard

A modern, React-based weather dashboard designed specifically for fishing enthusiasts. Get real-time weather data, moon phases, tide information, and intelligent fishing scores to plan your perfect fishing trip.

## ✨ Features

- **7-Day Weather Forecast**: Comprehensive weather data for the week ahead
- **Moon Phase Tracking**: Visual moon phase display with fishing impact scores
- **Tide Information**: High and low tide predictions with optimal fishing times
- **Fishing Score Algorithm**: Intelligent 1-10 rating system based on:
  - Moon phases (full and new moons = better fishing)
  - Wind speed and direction
  - Wave height
  - Temperature
  - Precipitation
  - Cloud cover
- **Interactive Day Details**: Click any day for in-depth weather analysis
- **Multiple Locations**: Pre-configured popular fishing spots or custom coordinates
- **Real-time Data**: Powered by Open-Meteo API (free, no API key required)
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd fishing-weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Usage

1. **Select a Location**: Choose from popular fishing spots or enter custom coordinates
2. **View 7-Day Forecast**: Browse weather cards showing key metrics and fishing scores
3. **Click for Details**: Click any day card to see comprehensive weather information
4. **Plan Your Trip**: Use the fishing scores and tips to choose the best fishing days

## 🎯 Fishing Score Explained

The fishing score (1-10) considers multiple factors:

- **Moon Phase** (High Impact): Full and new moons score highest
- **Wind Speed** (Medium Impact): Light winds are ideal
- **Temperature** (Medium Impact): 15-25°C is optimal
- **Wave Height** (Medium Impact): Calm to moderate waves preferred
- **Precipitation** (Low Impact): Less rain is better
- **Cloud Cover** (Low Impact): Partial clouds can be beneficial

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **date-fns**: Date manipulation and formatting
- **Open-Meteo API**: Free weather data (no API key needed)
- **Open-Meteo Marine API**: Wave and marine data

## 🌊 API Data Sources

- **Weather Data**: [Open-Meteo Weather API](https://open-meteo.com/)
- **Marine Data**: [Open-Meteo Marine API](https://open-meteo.com/en/docs/marine-weather-api)

Both APIs are free and don't require authentication!

## 📂 Project Structure

```
fishing-weather-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LocationSelector.jsx
│   │   ├── WeatherCard.jsx
│   │   └── DayDetails.jsx
│   ├── utils/
│   │   ├── moonPhase.js
│   │   └── fishingScore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Customization

### Adding New Locations

Edit `src/components/LocationSelector.jsx` and add to the `popularLocations` array:

```javascript
{ name: 'Your Location', lat: 00.0000, lon: 00.0000 }
```

### Adjusting Fishing Score Algorithm

Modify `src/utils/fishingScore.js` to change how different factors affect the score.

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

## 🐛 Known Limitations

- Tide times are currently simulated (Open-Meteo free tier doesn't include precise tide data)
- Some weather parameters may not be available for all locations
- Fishing scores are estimates and should be used as guidance only

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Happy Fishing! 🎣**

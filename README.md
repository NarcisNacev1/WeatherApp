# WeatherVue - Modern Weather Dashboard

[![Vue](https://img.shields.io/badge/Vue-3.3-4FC08D.svg?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A beautiful, real-time weather dashboard built with Vue 3 and TypeScript, featuring dynamic backgrounds, detailed forecasts, and a mobile-first design.

![Weather Dashboard Preview](screenshot.png)

## Features

- 🌦️ Real-time weather data with 3-day forecast
- 📍 Automatic location detection
- 🎨 Dynamic background videos based on weather conditions
- 📱 Mobile-responsive design with phone-like UI
- 🌡️ Temperature-based color coding
- 💧 Humidity and wind speed displays
- 🔍 City search with auto-complete
- 🛠️ Type-safe codebase with Vue 3 Composition API
- ⚡ Vite-powered ultra-fast development

## Technologies

- **Frontend**: Vue 3 + TypeScript
- **State Management**: Pinia
- **Styling**: Modern CSS with Glassmorphism effects
- **API Integration**:
  - WeatherAPI.com (Weather data)
  - OpenCage Geocoder (Geolocation)
- **Build Tool**: Vite
- **Testing**: Vitest (Unit tests)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/weathervue.git
cd weathervue
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API keys**
Create `.env` file in root directory:
```env
VITE_WEATHER_API_KEY=your_weatherapi_key
VITE_GEOCODING_API_KEY=your_opencage_key
```

4. **Run development server**
```bash
npm run dev
```

## Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEATHER_API_KEY` | API key from [WeatherAPI.com](https://www.weatherapi.com/) | Yes |
| `VITE_GEOCODING_API_KEY` | API key from [OpenCage Geocoder](https://opencagedata.com/) | Yes |

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint and fix files
- `npm run test` - Run unit tests

## Project Structure
```
/src
├── assets/          # Static assets
├── components/      # Vue components
│   ├── AddressDate.vue
│   ├── SearchBar.vue
│   └── Temperature.vue
├── stores/          # Pinia stores
│   └── weatherStore.ts
├── interfaces/      # TypeScript interfaces
├── styles/          # Global styles
└── main.ts          # Application entry
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Geocoding by [OpenCage Geocoder](https://opencagedata.com/)
- UI inspiration from modern weather applications
```

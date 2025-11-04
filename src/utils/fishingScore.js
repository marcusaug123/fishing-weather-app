import { getMoonPhase } from './moonPhase';

// Calculate fishing score based on various weather conditions
export function calculateFishingScore(weatherData, date) {
  let score = 5; // Base score
  
  // Moon phase impact (0-3 points)
  const moonPhase = getMoonPhase(date);
  score += (moonPhase.score / 10) * 3;
  
  // Temperature impact (0-2 points) - ideal range 60-80°F
  const temp = weatherData.temperature_2m;
  if (temp >= 60 && temp <= 80) {
    score += 2;
  } else if (temp >= 50 && temp < 90) {
    score += 1;
  }
  
  // Wind speed impact (-2 to 1 points) - light wind is good (in knots)
  const windSpeed = weatherData.wind_speed_10m;
  if (windSpeed < 10) {
    score += 1;
  } else if (windSpeed > 20) {
    score -= 2;
  } else if (windSpeed > 15) {
    score -= 1;
  }
  
  // Rain impact (-2 to 0 points) - in inches
  const rain = weatherData.precipitation;
  if (rain > 0.5) {
    score -= 2;
  } else if (rain > 0.2) {
    score -= 1;
  }
  
  // Wave height impact (-3 to 1 points) - rough seas significantly hurt fishing (in feet)
  const waveHeight = weatherData.wave_height;
  if (waveHeight < 2) {
    score += 1; // Calm seas are great
  } else if (waveHeight >= 3 && waveHeight < 5) {
    score -= 2; // Rough - significantly worse
  } else if (waveHeight >= 5) {
    score -= 3; // Very rough - much worse for fishing
  }
  
  // Cloud cover impact (0-1 points) - overcast can be good
  const cloudCover = weatherData.cloud_cover;
  if (cloudCover >= 40 && cloudCover <= 70) {
    score += 1;
  }
  
  // Ensure score is between 1 and 10
  return Math.max(1, Math.min(10, Math.round(score)));
}

export function getScoreColor(score) {
  if (score >= 8) return 'text-green-600 bg-green-100';
  if (score >= 6) return 'text-yellow-600 bg-yellow-100';
  if (score >= 4) return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
}

export function getScoreLabel(score) {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  return 'Poor';
}

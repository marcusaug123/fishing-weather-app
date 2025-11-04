// Calculate moon phase for a given date
export function getMoonPhase(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  
  let c, e, jd, b;
  
  if (month < 3) {
    year--;
    month += 12;
  }
  
  month++;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt(jd);
  jd -= b;
  b = Math.round(jd * 8);
  
  if (b >= 8) b = 0;
  
  const phases = [
    { name: 'New Moon', icon: '🌑', score: 10 },
    { name: 'Waxing Crescent', icon: '🌒', score: 7 },
    { name: 'First Quarter', icon: '🌓', score: 8 },
    { name: 'Waxing Gibbous', icon: '🌔', score: 7 },
    { name: 'Full Moon', icon: '🌕', score: 10 },
    { name: 'Waning Gibbous', icon: '🌖', score: 7 },
    { name: 'Last Quarter', icon: '🌗', score: 8 },
    { name: 'Waning Crescent', icon: '🌘', score: 7 }
  ];
  
  return phases[b];
}

// Calculate moon illumination percentage
export function getMoonIllumination(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  
  let c, e, jd, b;
  
  if (month < 3) {
    year--;
    month += 12;
  }
  
  month++;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  b = parseInt(jd);
  jd -= b;
  
  return Math.round(jd * 100);
}

export const GLOBAL_LOCATIONS = [
  // 🇮🇳 INDIA
  { name: "Kolkata", lat: 22.57, lon: 88.36 },
  { name: "Mumbai", lat: 19.07, lon: 72.87 },
  { name: "Chennai", lat: 13.08, lon: 80.27 },
  { name: "Visakhapatnam", lat: 17.69, lon: 83.22 },
  { name: "Puri", lat: 19.81, lon: 85.83 },
  { name: "Paradip", lat: 20.32, lon: 86.61 },
  { name: "Kochi", lat: 9.97, lon: 76.28 },
  { name: "Thiruvananthapuram", lat: 8.52, lon: 76.94 },
  { name: "Goa", lat: 15.49, lon: 73.82 },
  { name: "Mangalore", lat: 12.91, lon: 74.85 },

  // 🇧🇩 BANGLADESH
  { name: "Dhaka", lat: 23.81, lon: 90.41 },
  { name: "Chittagong", lat: 22.36, lon: 91.78 },
  { name: "Cox's Bazar", lat: 21.43, lon: 91.97 },
  { name: "Khulna", lat: 22.85, lon: 89.54 },

  // 🇵🇰 PAKISTAN
  { name: "Karachi", lat: 24.86, lon: 67.01 },
  { name: "Gwadar", lat: 25.12, lon: 62.32 },

  // 🇱🇰 SRI LANKA
  { name: "Colombo", lat: 6.93, lon: 79.86 },
  { name: "Galle", lat: 6.05, lon: 80.22 },

  // 🇯🇵 JAPAN
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Osaka", lat: 34.69, lon: 135.5 },
  { name: "Yokohama", lat: 35.44, lon: 139.64 },
  { name: "Kobe", lat: 34.69, lon: 135.19 },
  { name: "Fukuoka", lat: 33.59, lon: 130.4 },

  // 🇨🇳 CHINA
  { name: "Shanghai", lat: 31.23, lon: 121.47 },
  { name: "Guangzhou", lat: 23.13, lon: 113.26 },
  { name: "Shenzhen", lat: 22.54, lon: 114.06 },
  { name: "Hong Kong", lat: 22.32, lon: 114.17 },
  { name: "Xiamen", lat: 24.48, lon: 118.08 },
  { name: "Qingdao", lat: 36.07, lon: 120.38 },

  // 🇮🇩 INDONESIA
  { name: "Jakarta", lat: -6.2, lon: 106.84 },
  { name: "Surabaya", lat: -7.25, lon: 112.75 },
  { name: "Semarang", lat: -6.97, lon: 110.42 },
  { name: "Makassar", lat: -5.15, lon: 119.43 },

  // 🇵🇭 PHILIPPINES
  { name: "Manila", lat: 14.59, lon: 120.98 },
  { name: "Cebu", lat: 10.31, lon: 123.89 },
  { name: "Davao", lat: 7.07, lon: 125.61 },
  { name: "Tacloban", lat: 11.24, lon: 125.0 },

  // 🇹🇭 THAILAND
  { name: "Bangkok", lat: 13.75, lon: 100.5 },
  { name: "Pattaya", lat: 12.92, lon: 100.88 },
  { name: "Phuket", lat: 7.88, lon: 98.39 },

  // 🇻🇳 VIETNAM
  { name: "Ho Chi Minh City", lat: 10.82, lon: 106.63 },
  { name: "Da Nang", lat: 16.05, lon: 108.2 },
  { name: "Haiphong", lat: 20.84, lon: 106.68 },

  // 🌍 AFRICA
  { name: "Lagos", lat: 6.52, lon: 3.37 },
  { name: "Accra", lat: 5.6, lon: -0.18 },
  { name: "Abidjan", lat: 5.34, lon: -4.03 },
  { name: "Dakar", lat: 14.69, lon: -17.45 },
  { name: "Mombasa", lat: -4.04, lon: 39.67 },
  { name: "Dar es Salaam", lat: -6.79, lon: 39.21 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Alexandria", lat: 31.2, lon: 29.91 },

  // 🌎 USA & AMERICAS
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "Miami", lat: 25.76, lon: -80.19 },
  { name: "New Orleans", lat: 29.95, lon: -90.07 },
  { name: "Houston", lat: 29.76, lon: -95.37 },
  { name: "Los Angeles", lat: 34.05, lon: -118.24 },
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "San Diego", lat: 32.72, lon: -117.16 },
  { name: "Tampa", lat: 27.95, lon: -82.46 },
  { name: "Havana", lat: 23.11, lon: -82.37 },
  { name: "Kingston", lat: 17.98, lon: -76.8 },

  // 🌎 SOUTH AMERICA
  { name: "Rio de Janeiro", lat: -22.91, lon: -43.17 },
  { name: "Sao Paulo", lat: -23.55, lon: -46.63 },
  { name: "Buenos Aires", lat: -34.6, lon: -58.38 },
  { name: "Lima", lat: -12.04, lon: -77.03 },
  { name: "Guayaquil", lat: -2.19, lon: -79.88 },

  // 🇪🇺 EUROPE
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Amsterdam", lat: 52.37, lon: 4.9 },
  { name: "Venice", lat: 45.44, lon: 12.33 },
  { name: "Barcelona", lat: 41.38, lon: 2.17 },
  { name: "Marseille", lat: 43.29, lon: 5.37 },
  { name: "Athens", lat: 37.98, lon: 23.72 },
  { name: "Istanbul", lat: 41.01, lon: 28.97 },

  // 🇦🇺 AUSTRALIA
  { name: "Sydney", lat: -33.86, lon: 151.21 },
  { name: "Melbourne", lat: -37.81, lon: 144.96 },
  { name: "Brisbane", lat: -27.47, lon: 153.03 },
  { name: "Perth", lat: -31.95, lon: 115.86 },

  // 🌊 ISLANDS / CYCLONE ZONES
  { name: "Malé", lat: 4.17, lon: 73.51 },
  { name: "Port Louis", lat: -20.16, lon: 57.5 },
  { name: "Suva", lat: -18.12, lon: 178.45 },
  { name: "Honolulu", lat: 21.31, lon: -157.86 },

  // 🌴 ANDAMAN & NICOBAR ISLANDS
  { name: "Port Blair", lat: 11.67, lon: 92.75 },
  { name: "Havelock Island (Swaraj Dweep)", lat: 11.98, lon: 92.98 },
  { name: "Neil Island (Shaheed Dweep)", lat: 11.83, lon: 93.03 },
  { name: "Diglipur", lat: 13.27, lon: 93.02 },
  { name: "Mayabunder", lat: 12.91, lon: 92.9 },
  { name: "Rangat", lat: 12.5, lon: 92.9 },
  { name: "Little Andaman", lat: 10.72, lon: 92.5 },
  { name: "Car Nicobar", lat: 9.15, lon: 92.82 },
  { name: "Nancowry", lat: 8.03, lon: 93.53 },
  { name: "Great Nicobar", lat: 6.98, lon: 93.85 },
  { name: "Campbell Bay", lat: 7.0, lon: 93.92 },

  // 🌊 LAKSHADWEEP ISLANDS
  { name: "Kavaratti", lat: 10.57, lon: 72.64 },
  { name: "Agatti", lat: 10.85, lon: 72.18 },
  { name: "Minicoy", lat: 8.3, lon: 73.05 },
  { name: "Amini", lat: 11.11, lon: 72.73 },
  { name: "Andrott", lat: 10.82, lon: 73.69 },
  { name: "Kalpeni", lat: 10.08, lon: 73.64 },
  { name: "Kadmat", lat: 11.22, lon: 72.78 },
  { name: "Chetlat", lat: 11.69, lon: 72.72 },
  { name: "Bitra", lat: 11.59, lon: 72.17 },

  // 🌊 OTHER INDIAN ISLAND AREAS
  { name: "Diu Island", lat: 20.71, lon: 70.99 },
  { name: "Elephanta Island", lat: 18.96, lon: 72.93 },
  { name: "Pamban Island (Rameswaram)", lat: 9.28, lon: 79.31 },
];

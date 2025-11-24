// Comprehensive fake flight data for Air New Zealand demo

const FLIGHT_DATA = {
  airports: {
    AKL: { code: 'AKL', name: 'Auckland International Airport', city: 'Auckland', country: 'New Zealand' },
    CHC: { code: 'CHC', name: 'Christchurch International Airport', city: 'Christchurch', country: 'New Zealand' },
    WLG: { code: 'WLG', name: 'Wellington International Airport', city: 'Wellington', country: 'New Zealand' },
    DEL: { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
    BOM: { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
    SIN: { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
    SYD: { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
    MEL: { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
    LAX: { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
    LHR: { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'UK' }
  },

  flights: {
    // AKL to India routes
    'NZ123': {
      flightNumber: 'NZ123',
      airline: 'Air New Zealand',
      departure: { airport: 'AKL', terminal: 'International', time: '18:30', date: '2024-12-29' },
      arrival: { airport: 'DEL', terminal: '3', time: '05:15', date: '2024-12-30' },
      duration: '15h 45m',
      aircraft: 'Boeing 787-9 Dreamliner',
      status: 'Scheduled',
      classes: {
        economy: { price: 1299, available: true },
        premiumEconomy: { price: 2199, available: true },
        business: { price: 4599, available: true }
      },
      stops: 0,
      baggage: { carryOn: '7kg', checked: '23kg' }
    },
    'NZ456': {
      flightNumber: 'NZ456',
      airline: 'Air New Zealand',
      departure: { airport: 'AKL', terminal: 'International', time: '21:15', date: '2024-12-29' },
      arrival: { airport: 'BOM', terminal: '2', time: '08:30', date: '2024-12-30' },
      duration: '16h 15m',
      aircraft: 'Boeing 777-300ER',
      status: 'Scheduled',
      classes: {
        economy: { price: 1399, available: true },
        premiumEconomy: { price: 2299, available: true },
        business: { price: 4799, available: true }
      },
      stops: 0,
      baggage: { carryOn: '7kg', checked: '23kg' }
    },
    'NZ789': {
      flightNumber: 'NZ789',
      airline: 'Air New Zealand',
      departure: { airport: 'AKL', terminal: 'International', time: '14:45', date: '2024-12-29' },
      arrival: { airport: 'DEL', terminal: '3', time: '12:30', date: '2024-12-30' },
      duration: '19h 45m',
      aircraft: 'Boeing 787-9 Dreamliner',
      status: 'Scheduled',
      classes: {
        economy: { price: 1199, available: true },
        premiumEconomy: { price: 1999, available: true },
        business: { price: 4299, available: true }
      },
      stops: 1,
      via: 'SIN',
      baggage: { carryOn: '7kg', checked: '23kg' }
    },

    // Arrivals for today at 12 PM
    'NZ101': {
      flightNumber: 'NZ101',
      airline: 'Air New Zealand',
      departure: { airport: 'SYD', terminal: '1', time: '08:30', date: '2024-12-29' },
      arrival: { airport: 'AKL', terminal: 'International', time: '12:00', date: '2024-12-29' },
      duration: '3h 30m',
      aircraft: 'Airbus A320',
      status: 'Landed',
      classes: {
        economy: { price: 299, available: false },
        premiumEconomy: { price: 499, available: false }
      },
      stops: 0,
      baggage: { carryOn: '7kg', checked: '23kg' }
    },
    'NZ202': {
      flightNumber: 'NZ202',
      airline: 'Air New Zealand',
      departure: { airport: 'MEL', terminal: '2', time: '09:15', date: '2024-12-29' },
      arrival: { airport: 'AKL', terminal: 'International', time: '12:05', date: '2024-12-29' },
      duration: '3h 50m',
      aircraft: 'Boeing 737',
      status: 'Landed',
      classes: {
        economy: { price: 329, available: false },
        premiumEconomy: { price: 549, available: false }
      },
      stops: 0,
      baggage: { carryOn: '7kg', checked: '23kg' }
    },

    // Domestic flights
    'NZ301': {
      flightNumber: 'NZ301',
      airline: 'Air New Zealand',
      departure: { airport: 'AKL', terminal: 'Domestic', time: '07:00', date: '2024-12-29' },
      arrival: { airport: 'CHC', terminal: 'Domestic', time: '08:30', date: '2024-12-29' },
      duration: '1h 30m',
      aircraft: 'Airbus A320',
      status: 'Scheduled',
      classes: {
        economy: { price: 199, available: true },
        worksDeluxe: { price: 299, available: true }
      },
      stops: 0,
      baggage: { carryOn: '7kg', checked: '23kg' }
    },

    // International flights
    'NZ801': {
      flightNumber: 'NZ801',
      airline: 'Air New Zealand',
      departure: { airport: 'AKL', terminal: 'International', time: '16:00', date: '2024-12-29' },
      arrival: { airport: 'SIN', terminal: '1', time: '22:30', date: '2024-12-29' },
      duration: '10h 30m',
      aircraft: 'Boeing 787-9 Dreamliner',
      status: 'Scheduled',
      classes: {
        economy: { price: 899, available: true },
        premiumEconomy: { price: 1599, available: true },
        business: { price: 3299, available: true }
      },
      stops: 0,
      baggage: { carryOn: '7kg', checked: '23kg' }
    }
  },

  // Additional flight data for other routes
  additionalFlights: [
    {
      flightNumber: 'NZ321',
      route: 'AKL-SIN',
      departure: '20:45',
      arrival: '04:30',
      duration: '10h 45m',
      frequency: 'Daily'
    },
    {
      flightNumber: 'NZ654',
      route: 'AKL-LAX',
      departure: '17:30',
      arrival: '10:15',
      duration: '12h 45m',
      frequency: 'Daily'
    },
    {
      flightNumber: 'NZ987',
      route: 'AKL-LHR',
      departure: '19:15',
      arrival: '14:30',
      duration: '22h 15m',
      frequency: 'Daily'
    }
  ],

  // Special offers and promotions
  promotions: [
    {
      id: 'asia2024',
      title: 'Unlock Asia',
      description: 'Special fares to Singapore, Bali, and Tokyo',
      discount: '25%',
      validUntil: '2024-12-31'
    },
    {
      id: 'pacific2024',
      title: 'Pacific Escape',
      description: 'Great deals to Fiji, Cook Islands, and Samoa',
      discount: '30%',
      validUntil: '2024-11-30'
    }
  ],

  // Aircraft information
  aircraft: {
    'Boeing 787-9 Dreamliner': {
      capacity: 302,
      features: ['Skycouch', 'Premium Economy', 'Business Premier', 'WiFi'],
      configuration: 'J30W33Y214'
    },
    'Boeing 777-300ER': {
      capacity: 342,
      features: ['Business Premier', 'Premium Economy', 'Spacious Economy', 'Entertainment'],
      configuration: 'J44W52Y246'
    },
    'Airbus A320': {
      capacity: 171,
      features: ['Economy', 'Works Deluxe', 'Standard seating'],
      configuration: 'J0W24Y147'
    }
  }
};

// Helper functions
const FlightUtils = {
  formatPrice(price) {
    return `NZ$${price.toLocaleString()}`;
  },

  formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  },

  getFlightStatus(flight) {
    const now = new Date();
    const arrivalTime = new Date(`${flight.arrival.date}T${flight.arrival.time}`);
    if (now > arrivalTime) return 'Landed';
    if (flight.status === 'Scheduled') return 'On Time';
    return flight.status;
  },

  searchFlights(from, to, date) {
    const results = [];
    for (const [flightNumber, flight] of Object.entries(FLIGHT_DATA.flights)) {
      if (flight.departure.airport === from && 
          flight.arrival.airport === to && 
          flight.departure.date === date) {
        results.push(flight);
      }
    }
    return results;
  },

  getArrivals(airport, time) {
    const results = [];
    for (const [flightNumber, flight] of Object.entries(FLIGHT_DATA.flights)) {
      if (flight.arrival.airport === airport && 
          flight.arrival.time.startsWith(time)) {
        results.push(flight);
      }
    }
    return results;
  },

  getAllFlights() {
    return FLIGHT_DATA.flights;
  },

  getAirportInfo(code) {
    return FLIGHT_DATA.airports[code];
  },

  getFlightByNumber(flightNumber) {
    return FLIGHT_DATA.flights[flightNumber];
  },

  getFlightsByRoute(from, to) {
    const results = [];
    for (const [flightNumber, flight] of Object.entries(FLIGHT_DATA.flights)) {
      if (flight.departure.airport === from && flight.arrival.airport === to) {
        results.push(flight);
      }
    }
    return results;
  }
};

// Export using ES module syntax
export { FLIGHT_DATA, FlightUtils };
export default FLIGHT_DATA;
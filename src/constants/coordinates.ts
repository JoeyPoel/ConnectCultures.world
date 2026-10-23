import { CulturalCoordinate, FlightArc } from "../types/story.types";

export const ORIGIN_COORDINATE = {
  lat: 52.6800,
  lng: 5.0300,
  label: "NETHERLANDS • 52.6800° N, 5.0300° E",
};

export const CULTURAL_COORDINATES: CulturalCoordinate[] = [
  {
    id: "netherlands",
    name: "Wognum / Amsterdam",
    country: "Netherlands",
    lat: 52.6800,
    lng: 5.0300,
    chapterId: "chapter-0",
    badge: "Origin",
    previewTitle: "The Shared Horizon",
    previewSnippet: "Where the journey started. Stepping outside the Dutch polders to see the world from within.",
  },
  {
    id: "benidorm",
    name: "Benidorm",
    country: "Spain",
    lat: 38.5411,
    lng: -0.1225,
    chapterId: "chapter-1",
    badge: "The Awakening",
    previewTitle: "The Iberian Spark",
    previewSnippet: "Childhood wonder with grandparents. Midnight communal dinners and the first shock of Mediterranean warmth.",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    lat: 41.3879,
    lng: 2.1699,
    chapterId: "chapter-2",
    badge: "First Solo Flight",
    previewTitle: "The Independent Horizon",
    previewSnippet: "Taking off solo at age 20 into Catalonia: discovering self-reliance and navigating foreign streets alone.",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    lat: 30.0444,
    lng: 31.2357,
    chapterId: "chapter-2",
    badge: "Spontaneity",
    previewTitle: "The Sacred Chaos of Cairo",
    previewSnippet: "Dancing alongside residents at a local Egyptian wedding party without words, united through pure hospitality.",
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    lat: 41.0086,
    lng: 28.9802,
    chapterId: "chapter-3",
    badge: "The Sacred Threshold",
    previewTitle: "The Courtyards of Istanbul",
    previewSnippet: "Navigating deep into Hagia Sophia, dialoguing with an Islamic scholar, and receiving his first Quran.",
  },
  {
    id: "warsaw",
    name: "Warsaw",
    country: "Poland",
    lat: 52.2297,
    lng: 21.0122,
    chapterId: "chapter-4",
    badge: "Kinship & Prom",
    previewTitle: "The Slavic Heart",
    previewSnippet: "Dancing the Polonaise at the Studniówka, learning Polish, and discovering a family outside of blood.",
  },
  {
    id: "varna",
    name: "Varna",
    country: "Bulgaria",
    lat: 43.2141,
    lng: 27.9147,
    chapterId: "chapter-4",
    badge: "The Reconnection",
    previewTitle: "The Black Sea Bond",
    previewSnippet: "Greeting Polish travelers in their tongue on the Black Sea coast, forging a bond that led back to Warsaw.",
  },
];

export const FLIGHT_ARCS: FlightArc[] = [
  {
    from: [52.6800, 5.0300], // Amsterdam
    to: [38.5411, -0.1225],  // Benidorm
    label: "Amsterdam → Benidorm",
  },
  {
    from: [52.6800, 5.0300], // Amsterdam
    to: [41.3879, 2.1699],   // Barcelona
    label: "Amsterdam → Barcelona",
  },
  {
    from: [41.3879, 2.1699], // Barcelona
    to: [30.0444, 31.2357],  // Cairo
    label: "Barcelona → Cairo",
  },
  {
    from: [52.6800, 5.0300], // Amsterdam
    to: [41.0086, 28.9802],  // Istanbul
    label: "Amsterdam → Istanbul",
  },
  {
    from: [52.6800, 5.0300], // Amsterdam
    to: [52.2297, 21.0122],  // Warsaw
    label: "Amsterdam → Warsaw",
  },
  {
    from: [52.2297, 21.0122], // Warsaw
    to: [43.2141, 27.9147],  // Varna
    label: "Warsaw ↔ Varna",
  },
];

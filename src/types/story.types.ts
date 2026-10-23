/**
 * Narrative Chapter and Geographic Waypoint data models.
 */
export interface CulturalCoordinate {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  chapterId: string;
  badge: string;
  previewTitle: string;
  previewSnippet: string;
  audioPreview?: string;
}

export interface FlightArc {
  from: [number, number]; // [lat, lng]
  to: [number, number];   // [lat, lng]
  label: string;
}

export interface ChapterData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  location: string;
  coordinates: string;
  quote: string;
  quoteAuthor?: string;
  leadParagraph: string;
  narrativeBody: string[];
  keyInsight: string;
}

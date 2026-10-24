/**
 * Centralized string constants for Connect Cultures.
 * All user-facing text, labels, headlines, and narrative copy are defined here
 * to eliminate hardcoded strings and ensure a natural, authentic tone.
 */

export interface NavItemString {
  id: string;
  label: string;
  num: string;
}

export interface PhilosophyTenet {
  id: string;
  num: string;
  tenet: string;
  title: string;
  subtitle: string;
  quote: string;
  location: string;
  imageUrl: string;
}

export interface MilestoneString {
  id: string;
  num: string;
  year: string;
  location: string;
  coordinates: string;
  title: string;
  tagline: string;
  quote: string;
  story: string;
  lesson: string;
  imageUrl: string;
  photoCaption: string;
  widgetType?: "dial" | "rhythm" | "parchment" | "phrases" | "manifesto";
}

export interface HubTabString {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  location: string;
  highlight: string;
  imageUrl: string;
  offerings: string[];
}

export interface HubListingString {
  id: string;
  type: "host" | "salon" | "dinner";
  title: string;
  host: string;
  location: string;
  country: string;
  dateOrAvailability: string;
  description: string;
  capacityOrVibe: string;
  offerings: string[];
  imageUrl: string;
}

export interface CulturalStoryString {
  id: string;
  author: string;
  originCountry: string;
  experiencedCulture: string;
  location: string;
  oneLiner: string;
  reflection: string;
  category: string;
  imageUrl: string;
}

export interface PolishPhraseString {
  phrase: string;
  phonetic: string;
  meaning: string;
  culturalNote: string;
}

export interface ReflectionVerseString {
  topic: string;
  verse: string;
}

// -----------------------------------------------------------------------------
// 00. HERO SECTION STRINGS
// -----------------------------------------------------------------------------
export const HERO_STRINGS = {
  brandFirst: "CONNECT",
  brandSecond: "CULTURES.",
  tagline: "A stranger is simply a friend you haven't met yet.",
  subTagline: "Opening living rooms and sharing tables across borders.",
  ctaStepIn: "Step In",
  ctaPhilosophy: "The Philosophy",
  scrollIndicator: "Scroll To Enter",
  scrollAriaLabel: "Scroll to enter the philosophy section",
} as const;

// -----------------------------------------------------------------------------
// 01. NAVIGATION STRINGS
// -----------------------------------------------------------------------------
export const NAV_STRINGS = {
  brand: "Connect Cultures",
  brandSubtitle: "Global Cultural Collective",
  menuAriaLabel: "Toggle navigation menu",
  items: [
    { id: "vision", label: "Vision", num: "00" },
    { id: "philosophy", label: "Philosophy", num: "01" },
    { id: "founding-story", label: "The Story", num: "02" },
    { id: "community-hub", label: "Connect Hub", num: "03" },
    { id: "community-stories", label: "Global Voices", num: "04" },
    { id: "community-portal", label: "Join Collective", num: "05" },
  ] as NavItemString[],
} as const;

// -----------------------------------------------------------------------------
// 02. PHILOSOPHY SECTION STRINGS
// -----------------------------------------------------------------------------
export const PHILOSOPHY_STRINGS = {
  kicker: "HOW WE CONNECT • THE PHILOSOPHY",
  headlineMain: "Culture shouldn't feel like a foreign barrier.",
  headlineSub: "It should feel like an open door.",
  founderNote: {
    badge: "A NOTE FROM FOUNDER JOEY",
    tag: "EARLY ACCESS • FOUNDING PHASE",
    paragraph1:
      "Every meaningful community starts with real experiences and an honest direction. We don't have thousands of active listings or events running yet. This platform is the blueprint of what we are building together across the world.",
    paragraph2:
      "My personal journey below is entirely real. Every meal shared, every foreign doorstep, and every friendship actually happened. We are inviting our first hosts and members to help bring this community to life.",
    skipPrompt: "Skip straight to the stories that started it all:",
    skipButton: "Skip to The Story",
  },
  tenets: [
    {
      id: "tenet-1",
      num: "01",
      tenet: "HOSPITALITY OVER ISOLATION",
      title: "Prejudice dissolves at the kitchen table.",
      subtitle:
        "It's easy to hold assumptions about a country from afar. But when you sit in someone's kitchen and share a home-cooked meal, stereotypes disappear. You see a family, a story, and a friend.",
      quote: "Laughter doesn't need a passport.",
      location: "Ronda & Warsaw",
      imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "tenet-2",
      num: "02",
      tenet: "HOMES OVER HOTEL CORRIDORS",
      title: "Hotels insulate you. Homes give you perspective.",
      subtitle:
        "Hotels keep you inside a predictable tourist bubble. Connect Cultures opens doors to local homes, where you hear the language spoken by elders, eat family recipes, and experience daily life from within.",
      quote: "Travel to understand, not just to look.",
      location: "Cairo & Amsterdam",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "tenet-3",
      num: "03",
      tenet: "OPEN DOORS & SHARED TABLES",
      title: "Culture is not a barrier. It is an open door.",
      subtitle:
        "Around the world, living rooms sit with empty chairs while curious travelers wander quiet streets. We build the bridge that brings people together around welcoming tables.",
      quote: "A stranger is simply a friend you haven't met yet.",
      location: "Istanbul & Oaxaca",
      imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
    },
  ] as PhilosophyTenet[],
  tenetPrefix: "TENET",
  ariaPrev: "Previous card in stack",
  ariaNext: "Next card in stack",
  ariaJumpPrefix: "Jump to tenet",
  dragHint: "Swipe or Drag",
  ctaStory: "The Story",
  ctaCommunity: "Connect Hub →",
  bottomPrinciples: [
    { title: "GENUINE", subtitle: "Living Room Hospitality" },
    { title: "DIRECT", subtitle: "Personal Cultural Kinship" },
    { title: "OPEN", subtitle: "Shared Table Community" },
  ],
  curatedBadge: "Community Guidelines & Safety",
} as const;

// -----------------------------------------------------------------------------
// 03. FOUNDING STORY STRINGS
// -----------------------------------------------------------------------------
export const FOUNDING_STORY_STRINGS = {
  kickerBadge: "FOUNDING STORY • JOEY VAN DER POEL",
  headline: "How It All Started",
  leadParagraph:
    "Connect Cultures grew out of real moments on the road. From family dinners in Spain to an impromptu wedding dance in Cairo, these experiences showed founder Joey van der Poel that stepping into someone else's daily life changes how you see the world.",
  milestones: [
    {
      id: "origin",
      num: "01",
      year: "Origin",
      location: "Wognum, Netherlands",
      coordinates: "52.6800° N, 5.0300° E",
      title: "The Dutch Polder Bubble",
      tagline: "The Orderly Starting Point",
      quote: "You only realize you are inside a bubble once you step outside it.",
      story:
        "Growing up in Wognum, life was orderly, safe, and predictable. Dinner was prompt at 6:00 PM, and the world made sense. But I always wondered what daily life felt like on the other side of the horizon.",
      lesson: "Curiosity begins with realizing how small your corner of the world really is.",
      imageUrl: "/images/story/wognum-origin.jpg",
      photoCaption: "Wognum, Netherlands: Hanging the school bag on the Dutch flag, ready for what lay beyond.",
      widgetType: "manifesto",
    },
    {
      id: "benidorm",
      num: "02",
      year: "Childhood",
      location: "Benidorm, Spain",
      coordinates: "38.5411° N, 0.1225° W",
      title: "The Iberian Spark",
      tagline: "Late Dinners with Grandparents",
      quote: "A culture's heart is revealed by how it gathers after dark.",
      story:
        "Visiting Spain with my grandparents was the first time I saw another rhythm of life. Back home, streets were quiet by dusk. Here, midnight was when families gathered over paella and laughter under warm streetlights.",
      lesson: "Different cultures don't just speak differently, they live with a different heartbeat.",
      imageUrl: "/images/story/benidorm-grandparents.jpg",
      photoCaption: "Benidorm, Spain: Walking through the evening streets with my grandparents.",
      widgetType: "dial",
    },
    {
      id: "barcelona-cairo",
      num: "03",
      year: "Age 20",
      location: "Barcelona & Cairo",
      coordinates: "41.3879° N → 30.0444° N",
      title: "Solo Leap & The Wedding Circle",
      tagline: "Hospitality Without Words",
      quote: "You don't need a shared language to share a genuine moment.",
      story:
        "At 20, I took my first solo trip to Barcelona to see if I could navigate the world on my own. Later in Cairo, wandering through a quiet neighborhood, drum music drew me to an open courtyard wedding. Within minutes, people smiled, pulled me into their dance circle, and we celebrated together for hours.",
      lesson: "Genuine hospitality requires no translation.",
      imageUrl: "/images/story/cairo-wedding.jpg",
      photoCaption: "Cairo, Egypt: An open courtyard where strangers became friends.",
      widgetType: "rhythm",
    },
    {
      id: "istanbul",
      num: "04",
      year: "Threshold",
      location: "Istanbul, Turkey",
      coordinates: "41.0086° N, 28.9802° E",
      title: "Courtyards of Hagia Sophia",
      tagline: "Dialogue & Shared Respect",
      quote: "When you enter someone else's sacred space with respect, you are never an intruder.",
      story:
        "At Hagia Sophia, I had to pass through three police checkpoints and talk with the female imam to convince them to let me in since I wasn't Muslim. Inside, I received my first Quran and read it right there. After that, I was able to visit and enter every mosque, welcomed everywhere because I showed genuine respect.",
      lesson: "Respect opens doors that arguments never could.",
      imageUrl: "/images/story/istanbul-bosphorus.jpg",
      photoCaption: "Istanbul, Turkey: Sitting along the Bosphorus between continents.",
      widgetType: "parchment",
    },
    {
      id: "warsaw-varna",
      num: "05",
      year: "Slavic Kinship",
      location: "Warsaw & Varna",
      coordinates: "52.2297° N, 21.0122° E",
      title: "The Warsaw Living Room",
      tagline: "Studniówka & Finding Family",
      quote: "Speaking someone's mother tongue shows you care enough to try.",
      story:
        "After learning conversational Polish, I danced the traditional Polonaise at a high school Studniówka prom. Months later by the Black Sea in Bulgaria, greeting travelers with 'Dzień dobry' sparked an instant friendship. Weeks later, I was staying in their Warsaw home, welcomed not as a guest, but as family.",
      lesson: "Family isn't only about where you're born, it's about who invites you in.",
      imageUrl: "/images/story/warsaw-studniowka.jpg",
      photoCaption: "Warsaw, Poland: Dancing the Polonaise at Studniówka, welcomed as family.",
      widgetType: "phrases",
    },
  ] as MilestoneString[],
  reflectionVerses: [
    {
      topic: "Hospitality & The Stranger",
      verse: "Do good to the neighbor who is near, the neighbor who is a stranger, and the companion by your side.",
    },
    {
      topic: "Shared Humanity",
      verse: "We made you into peoples and tribes so that you may come to know one another.",
    },
  ] as ReflectionVerseString[],
  polishPhrases: [
    {
      phrase: "Dzień dobry",
      phonetic: "jen DOH-brih",
      meaning: "Good day / Hello",
      culturalNote: "A warm and polite greeting used throughout daily life in Poland.",
    },
    {
      phrase: "Dziękuję bardzo",
      phonetic: "jen-KOO-yeh BAR-dzoh",
      meaning: "Thank you very much",
      culturalNote: "Heartfelt gratitude expressed with sincere warmth.",
    },
    {
      phrase: "Czuć się jak w domu",
      phonetic: "chootsh sheh yahk v DOH-moo",
      meaning: "To feel right at home",
      culturalNote: "The highest compliment to a host who welcomes you like family.",
    },
    {
      phrase: "Smacznego",
      phonetic: "smach-NEH-goh",
      meaning: "Enjoy your meal",
      culturalNote: "Spoken warmly before every shared meal around the table.",
    },
  ] as PolishPhraseString[],
  milestonePrefix: "MILESTONE",
  coreLessonLabel: "CORE LESSON:",
  dial: {
    title: "Cultural Rhythm Comparison",
    quietLabel: "North Holland Quiet (18:00 Dinner)",
    warmLabel: "Spanish Evening Hearth",
    ariaLabel: "Cultural Tempo Dial",
  },
  rhythm: {
    title: "Cairo Courtyard Rhythm",
    activeSubtitle: "Synchronized visual rhythm",
    pausedSubtitle: "Rhythm paused",
    ariaPause: "Pause rhythm pulse",
    ariaPlay: "Start rhythm pulse",
  },
  parchment: {
    title: "Hagia Sophia Verse",
    nextButton: "Next Verse →",
  },
  phrases: {
    title: "Common Polish Phrases",
  },
  manifesto: {
    title: "The Journey Begins • New Horizons Ahead",
    tag: "CHAPTER 01",
  },
  card: {
    archiveLabel: "EXPEDITION ARCHIVE •",
    prevButton: "Previous Stop",
    nextButton: "Next Stop",
    stopCounter: (curr: number, total: number) => `Stop ${curr} of ${total}`,
    continueToHub: "Continue to Connect Hub",
  },
} as const;

// -----------------------------------------------------------------------------
// 04. COMMUNITY HUB STRINGS
// -----------------------------------------------------------------------------
export const COMMUNITY_HUB_STRINGS = {
  kicker: "THE BLUEPRINT • CONNECT HUB",
  headline: "What We Are Building",
  subtitle:
    "Four ways to experience culture from within. We are actively looking for our first hosts around the world to help launch these experiences.",
  tabs: [
    {
      id: "homestays",
      num: "01",
      title: "Living Room Homestays",
      category: "Overnight Stays",
      description:
        "Stay with local families instead of commercial hotels. Sleep in private guest rooms, share morning coffee, and experience daily life alongside hosts who open their doors in genuine hospitality.",
      location: "Warsaw, Benidorm, Varna",
      highlight: "Private rooms and cultural exchange in authentic local homes.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      offerings: ["Private Guest Room", "Language Exchange", "Home Breakfast"],
    },
    {
      id: "dinners",
      num: "02",
      title: "Communal Kitchen Dinners",
      category: "Home Cooking",
      description:
        "Gather around the table with small groups of travelers and locals. Cook traditional recipes together, share stories, and enjoy a relaxed evening over good food.",
      location: "Cairo, Amsterdam, Oaxaca",
      highlight: "Home-cooked dishes, cooking together, and relaxed conversation.",
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      offerings: ["Cook Together", "Traditional Recipes", "Shared Wine & Tea"],
    },
    {
      id: "salons",
      num: "03",
      title: "Evening Story Salons",
      category: "Gatherings",
      description:
        "Casual evening gatherings in courtyards, living rooms, and local spots. Discuss cultural perspectives, family traditions, and personal stories over tea and music.",
      location: "Istanbul, Ronda, Kyoto",
      highlight: "Open discussions, good tea, and meaningful conversations.",
      imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
      offerings: ["Acoustic Music", "Tea & Treats", "Open Discussion"],
    },
    {
      id: "craft",
      num: "04",
      title: "Artisanal & Cooking Workshops",
      category: "Hands-On",
      description:
        "Learn regional craft and cooking traditions directly from local artisans. From baking regional breads to pottery and woodwork, learn by doing.",
      location: "Fes, Seville, Zakopane",
      highlight: "Hands-on workshops led by local craftspeople.",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      offerings: ["Direct Mentorship", "Traditional Tools", "Take-Home Project"],
    },
  ] as HubTabString[],
  tabBadge: "Format Blueprint • Seeking Founding Hosts",
  targetCitiesPrefix: "Target Cities:",
  directoryHeadline: "Pioneer Host Opportunities",
  directorySubtitle:
    "The inaugural experiences we are preparing. We are recruiting our first hosts to launch these locations.",
  searchPlaceholder: "Search city, format, or country...",
  cardBadge: "Pioneer Blueprint",
  applyButton: "Apply to Host",
  listings: [
    {
      id: "hub-1",
      type: "host",
      title: "Warsaw Old Town Homestay",
      host: "Open Host Role • Warsaw",
      location: "Warsaw",
      country: "Poland",
      dateOrAvailability: "Founding Phase",
      description:
        "A stay in a pre-war Warsaw apartment. Make pierogi from scratch, practice conversational Polish, and learn about the city from a local family.",
      capacityOrVibe: "Homestay • Kitchen Table",
      offerings: ["Pierogi Workshop", "Old Town Walk", "Family Dinner"],
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hub-2",
      type: "host",
      title: "Mediterranean Terrace Homestay",
      host: "Open Host Role • Costa Blanca",
      location: "Benidorm",
      country: "Spain",
      dateOrAvailability: "Founding Phase",
      description:
        "Experience coastal Spanish life. Evening paella on the terrace, local wine, and relaxed family conversations under the stars.",
      capacityOrVibe: "Homestay • Family Hearth",
      offerings: ["Midnight Paella", "Terrace Sunset", "Village Stories"],
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hub-3",
      type: "dinner",
      title: "Cairo Courtyard Dinner",
      host: "Open Host Role • Cairo",
      location: "Cairo",
      country: "Egypt",
      dateOrAvailability: "Founding Phase",
      description:
        "Traditional Egyptian courtyard hospitality. Fresh koshari, mint tea, and live darbuka drum rhythms with local neighbors.",
      capacityOrVibe: "Dinner • Live Music",
      offerings: ["Live Darbuka", "Fresh Mint Tea", "Courtyard Circle"],
      imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hub-4",
      type: "salon",
      title: "Istanbul Tea & Conversation",
      host: "Open Host Role • Istanbul",
      location: "Istanbul",
      country: "Turkey",
      dateOrAvailability: "Founding Phase",
      description:
        "An evening gathering in Kadıköy discussing faith, traditions, and breaking through cultural stereotypes over Turkish tea.",
      capacityOrVibe: "Salon • Open Circle",
      offerings: ["Cay Ritual", "Philosophical Dialogue", "Chestnut Roasting"],
      imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80",
    },
  ] as HubListingString[],
  modal: {
    kicker: "Founding Host Callout",
    titlePrefix: "Bring This to ",
    description: (location: string) =>
      `This experience is our blueprint for ${location}. We are searching for our founding host in this city to welcome travelers and open this hearth. If you want to open your home, kitchen, or salon, register your interest below.`,
    closeButton: "Close",
    applyButton: "Apply as Founding Host",
  },
} as const;

// -----------------------------------------------------------------------------
// 05. CULTURAL STORY STREAM STRINGS
// -----------------------------------------------------------------------------
export const STORY_STREAM_STRINGS = {
  kicker: "COMMUNITY PERSPECTIVES",
  headline: "Voices Across Borders",
  subtitle:
    "Real connections happen in simple moments. These narratives represent the depth of human encounter we are setting out to cultivate. If you have lived an experience like this, join us in building this community.",
  dragHint: "Drag or click to explore stories",
  prevAria: "Previous story",
  nextAria: "Next story",
  jumpAriaPrefix: "Jump to story",
  submitStoryButton: "Submit Your Real Story",
  stories: [
    {
      id: "story-1",
      author: "Elena Rostova",
      originCountry: "Poland",
      experiencedCulture: "Andalusia",
      location: "Ronda, Spain",
      oneLiner: "I spoke ten words of Spanish. They fed me fresh figs and laughed with their hands.",
      reflection:
        "When you stop worrying about speaking perfectly, strangers quickly feel like family. In Ronda, quiet moments weren't awkward, they were peaceful.",
      category: "Homestay",
      imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "story-2",
      author: "Tariq Mansour",
      originCountry: "Egypt",
      experiencedCulture: "North Holland",
      location: "Alkmaar, Netherlands",
      oneLiner: "Cairo noise dissolved into quiet apple pie. Stillness became home.",
      reflection:
        "Every home in the world has a warm kitchen if you dare to knock. The rain against the Dutch windows felt like music after years of sand.",
      category: "Table Fellowship",
      imageUrl: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "story-3",
      author: "Mateusz Kowalski",
      originCountry: "Poland",
      experiencedCulture: "Istanbul",
      location: "Kadikoy, Turkey",
      oneLiner: "Tea on the Bosphorus with strangers sharing roasted chestnuts.",
      reflection:
        "Sharing tea in Turkey is a sign of hospitality and respect. Sitting by the ferry docks, we discussed life in broken English and understood each other completely.",
      category: "Street Dialogue",
      imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "story-4",
      author: "Sofia Hernandez",
      originCountry: "Spain",
      experiencedCulture: "Warsaw",
      location: "Warsaw, Poland",
      oneLiner: "They shared the Christmas wafer and treated me like family.",
      reflection:
        "Family is not only about biology; it is about open doors and shared bread. Snow was falling outside in Warsaw, but inside was warmth and genuine laughter.",
      category: "Kinship",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "story-5",
      author: "Kenji & Amina",
      originCountry: "Japan",
      experiencedCulture: "Morocco",
      location: "Fes Medina, Morocco",
      oneLiner: "Three hours carving cedar without a shared word, only rhythmic nods.",
      reflection:
        "Craft is a universal human language that predates borders. When hands work together on wood, words are entirely secondary.",
      category: "Artisanal Craft",
      imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "story-6",
      author: "Lukas Lindqvist",
      originCountry: "Sweden",
      experiencedCulture: "Oaxaca",
      location: "Oaxaca, Mexico",
      oneLiner: "Grinding roasted cacao with Doña Carmen before dawn over stone.",
      reflection:
        "Taste memory anchors you to a land deeper than any photograph ever could. The aroma of smoked chili and cinnamon stays with you forever.",
      category: "Culinary Roots",
      imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
    },
  ] as CulturalStoryString[],
} as const;

// -----------------------------------------------------------------------------
// 06. COMMUNITY PORTAL & STATS STRINGS
// -----------------------------------------------------------------------------
export const PORTAL_STRINGS = {
  kicker: "THE GATEWAY • EARLY ACCESS",
  headline: "Take The Step.",
  subtitle:
    "We are building our founding community. Join as an inaugural host or register as an explorer interested in upcoming cultural homestays, dinners, and gatherings.",
  stats: [
    { label: "DAY ZERO", sub: "Launch Phase" },
    { label: "WORLDWIDE", sub: "Global Horizon" },
    { label: "PIONEER", sub: "Founding Hosts Call" },
    { label: "AUTHENTIC", sub: "Real Experiences" },
  ],
} as const;

// -----------------------------------------------------------------------------
// 07. JOIN FORM STRINGS
// -----------------------------------------------------------------------------
export const JOIN_FORM_STRINGS = {
  badge: "Founding Fellowship • Pioneer Seat",
  title: "Claim Your Founding Pass",
  description:
    "Step in at Day Zero. Apply to be an inaugural pioneer host in your city or join our first wave of global cultural fellows.",
  nameLabel: "Your Full Name",
  namePlaceholder: "e.g. Elena Rostova",
  emailLabel: "Email Address",
  emailPlaceholder: "email@domain.com",
  countryLabel: "Your Country of Residence",
  countryPlaceholder: "e.g. Poland, Netherlands, Spain...",
  dreamCultureLabel: "What culture do you want to experience from within?",
  dreamCulturePlaceholder: "e.g. Polish family life, Cairo hospitality, Andalusian village...",
  hostCheckbox: "I want to apply to be an inaugural Founding Host (opening my kitchen table, salon, or home).",
  submitButton: "Claim Founding Boarding Pass",
  submittingButton: "Registering...",
  errorName: "Please enter your name.",
  errorEmail: "Please enter a valid email.",
  errorCountry: "Please enter your country.",
  fallbackSuccess: "You have joined the waitlist. Welcome to Connect Cultures.",
  defaultSuccess: "Welcome. You have taken the step.",
  defaultError: "Unable to join. Please try again.",
} as const;

// -----------------------------------------------------------------------------
// 08. LANYARD PASS STRINGS
// -----------------------------------------------------------------------------
export const LANYARD_STRINGS = {
  headerBrand: "CONNECT CULTURES",
  headerType: "BOARDING PASS",
  journeyLabel: "JOURNEY",
  journeyValue: "CC-EXPEDITION",
  portalLabel: "PORTAL",
  portalValue: "HEARTH",
  seatLabel: "SEAT",
  seatValue: "OPEN TABLE",
  passengerLabel: "PASSENGER • BEARER",
  defaultName: "YOUR NAME",
  originLabel: "ORIGIN",
  defaultCountry: "YOUR COUNTRY",
  globalTag: "GLOBAL",
  destinationLabel: "DESTINATION",
  defaultCulture: "YOUR DESTINATION",
  statusLabel: "CLASS • STATUS",
  statusHost: "PIONEER HOST",
  statusFellow: "FOUNDING FELLOW",
  boardingLabel: "BOARDING",
  boardingValue: "PRIORITY ACCESS",
  stubPassLabel: "FELLOWSHIP PASS",
  stubNotice: "NON-TRANSFERABLE • WORLDWIDE",
  stubBarcodeText: "CC-EXPEDITION",
  dragHint: "Grab, drag & swing boarding pass",
} as const;

// -----------------------------------------------------------------------------
// 09. FOOTER STRINGS
// -----------------------------------------------------------------------------
export const FOOTER_STRINGS = {
  brand: "Connect Cultures",
  tagline: "Opening living rooms and sharing tables across borders.",
  returnToTop: "Return to Top",
  copyrightSuffix: "ConnectCultures.world • Global Cultural Collective",
} as const;

// -----------------------------------------------------------------------------
// 10. TELEMETRY & AMBIENT AUDIO STRINGS
// -----------------------------------------------------------------------------
export const TELEMETRY_STRINGS = {
  defaultLocation: "NETHERLANDS",
  defaultCoordinates: "52.6800° N, 5.0300° E",
} as const;

export const AMBIENT_STRINGS = {
  ariaPlay: "Play ambient audio",
  ariaMute: "Mute ambient audio",
  playingLabel: "Dusk Soundscape",
  mutedLabel: "Audio Muted",
  volumeAria: "Audio volume",
} as const;

export const GLOBE_PIN_STRINGS = {
  exploreChapter: "Explore Chapter",
} as const;

export const IMAGE_FRAME_STRINGS = {
  verifiedBadge: "ARCHIVE VERIFIED",
} as const;

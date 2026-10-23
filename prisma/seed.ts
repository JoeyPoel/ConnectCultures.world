import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const culturalNodes = [
  {
    slug: "wognum-amsterdam",
    city: "Wognum / Amsterdam",
    country: "Netherlands",
    latitude: 52.6800,
    longitude: 5.0300,
    chapterNum: 0,
    title: "The Shared Horizon",
    summary: "The Dutch origin where a youth in his twenties discovered the hunger to explore beyond the comfort zone.",
    accentColor: "terracotta-base",
    quote: "True learning occurs only when cultures are experienced from within.",
  },
  {
    slug: "seville-andalusia",
    city: "Seville / Madrid",
    country: "Spain",
    latitude: 37.3891,
    longitude: -5.9845,
    chapterNum: 1,
    title: "The Iberian Spark",
    summary: "Childhood journey with grandparents; the visceral shock of warmth and midnight dinner camaraderie.",
    accentColor: "terracotta-glow",
    quote: "The Dutch domestic reality is only one chapter in a vast world book.",
  },
  {
    slug: "cairo-egypt",
    city: "Cairo",
    country: "Egypt",
    latitude: 30.0444,
    longitude: 31.2357,
    chapterNum: 2,
    title: "The Sacred Chaos of Cairo",
    summary: "Unrestrained celebration at an authentic local Egyptian wedding party without words, united through hospitality.",
    accentColor: "gold-sand",
    quote: "Language is the smallest part of human understanding.",
  },
  {
    slug: "istanbul-turkey",
    city: "Istanbul",
    country: "Turkey",
    latitude: 41.0086,
    longitude: 28.9802,
    chapterNum: 3,
    title: "The Courtyards of Istanbul & Hagia Sophia",
    summary: "Deep dialogue with an Islamic scholar under the grand domes, receiving the sacred text read to this day.",
    accentColor: "azure-dome",
    quote: "Faith, hospitality, and patience transcend every border.",
  },
  {
    slug: "katowice-poland",
    city: "Katowice / Warsaw",
    country: "Poland",
    latitude: 50.2649,
    longitude: 19.0238,
    chapterNum: 4,
    title: "The Slavic Heart & Prom Night",
    summary: "Studniówka formal dance, learning conversational Polish, and experiencing profound Slavic generosity.",
    accentColor: "amber-flame",
    quote: "Czuć się jak w domu — feeling truly at home in a foreign family.",
  },
  {
    slug: "varna-bulgaria",
    city: "Varna",
    country: "Bulgaria",
    latitude: 43.2141,
    longitude: 27.9147,
    chapterNum: 4,
    title: "The Unexpected Reconnection",
    summary: "A chance greeting in Polish to travelers on the Black Sea coast that led back to Warsaw as family.",
    accentColor: "gold-shimmer",
    quote: "When a cultural bridge is built with genuine love, it never collapses.",
  },
];

/**
 * Seeds the database with core cultural journey nodes.
 */
async function main() {
  console.log("Seeding cultural journey nodes...");
  for (const node of culturalNodes) {
    await prisma.culturalNode.upsert({
      where: { slug: node.slug },
      update: node,
      create: node,
    });
  }
  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

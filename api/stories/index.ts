import type { IncomingMessage, ServerResponse } from "http";
import { prisma, isDatabaseConfigured } from "../lib/prisma.js";

/**
 * Serverless handler delivering episodic narrative chapters and journey nodes.
 */
export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (isDatabaseConfigured) {
    try {
      const nodes = await prisma.culturalNode.findMany({
        orderBy: { chapterNum: "asc" },
      });
      if (nodes.length > 0) {
        res.statusCode = 200;
        res.end(JSON.stringify({ chapters: nodes }));
        return;
      }
    } catch (e) {
      console.warn("Falling back to static stories array due to database issue:", e);
    }
  }

  // Fallback static payload
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      chapters: [
        {
          chapterNum: 0,
          title: "The Shared Horizon",
          city: "Wognum / Amsterdam",
          country: "Netherlands",
          quote: "True learning occurs only when cultures are experienced from within.",
        },
        {
          chapterNum: 1,
          title: "The Iberian Spark",
          city: "Seville / Madrid",
          country: "Spain",
          quote: "The Dutch domestic reality is only one chapter in a vast world book.",
        },
        {
          chapterNum: 2,
          title: "The Sacred Chaos of Cairo",
          city: "Cairo",
          country: "Egypt",
          quote: "Language is the smallest part of human understanding.",
        },
        {
          chapterNum: 3,
          title: "The Courtyards of Istanbul & Hagia Sophia",
          city: "Istanbul",
          country: "Turkey",
          quote: "Faith, hospitality, and patience transcend every border.",
        },
        {
          chapterNum: 4,
          title: "The Slavic Heart & Prom Night",
          city: "Katowice / Warsaw & Varna",
          country: "Poland & Bulgaria",
          quote: "When a cultural bridge is built with genuine love, it never collapses.",
        },
      ],
    })
  );
}

import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import cheerio from "cheerio";
import Internship from "../models/Internship.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const START_URL = process.env.SCRAPE_URL || "https://example.com/internships";

async function connectDB() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");
}

async function fetchPage(url) {
  const res = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PMInternShipScraper/1.0)"
    }
  });
  return res.data;
}

function parseInternships(html) {
  const $ = cheerio.load(html);
  const items = [];

  // --- UPDATE SELECTORS BELOW to match actual site ---
  // Example assumes each internship is within ".internship-card"
  $(".internship-card").each((i, el) => {
    const title = $(el).find(".title").text().trim() || $(el).find("h2").text().trim();
    const description = $(el).find(".description").text().trim() || $(el).find("p").text().trim();
    const organization = $(el).find(".org").text().trim() || $(el).find(".organization").text().trim();
    const location = $(el).find(".location").text().trim();
    const skillsText = $(el).find(".skills").text().trim(); // comma-separated maybe
    const skills = skillsText ? skillsText.split(",").map(s => s.trim()).filter(Boolean) : [];
    const duration = $(el).find(".duration").text().trim();
    items.push({ title, description, organization, location, skills, duration });
  });

  return items;
}

async function upsertInternships(items) {
  for (const it of items) {
    if (!it.title) continue;
    const filter = { title: it.title, organization: it.organization || "" };
    const update = {
      $set: {
        description: it.description || "",
        skills: it.skills || [],
        location: it.location || "",
        duration: it.duration || "",
        organization: it.organization || "",
        scrapedFrom: "PM Internship (scraper)",
        sourceUrl: START_URL
      }
    };
    const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
    await Internship.findOneAndUpdate(filter, update, opts);
    console.log("Upserted:", it.title);
  }
}

async function main() {
  try {
    await connectDB();
    const html = await fetchPage(START_URL);
    const items = parseInternships(html);
    if (!items.length) console.warn("No internships found — update selectors in script.");
    await upsertInternships(items);
  } catch (err) {
    console.error("Scraper error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

main();

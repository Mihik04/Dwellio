const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // change if using Atlas

async function migrate() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");


const listings = await Listing.find({});
console.log(`Found ${listings.length} total listings`);

for (let listing of listings) {
    console.log(`Processing: ${listing.title} → geometry:`, JSON.stringify(listing.geometry));
    try {
        const query = `${listing.location}, ${listing.country}`;
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
            { headers: { "User-Agent": "Dwellio/1.0" } }
        );

        const geoData = response.data[0];
        if (geoData) {
            listing.geometry = {
                type: "Point",
                coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)],
            };
            await listing.save();
            console.log(`✅ ${listing.title} → [${geoData.lon}, ${geoData.lat}]`);
        } else {
            console.log(`❌ No result for: ${listing.title} (${query})`);
        }

        await new Promise((r) => setTimeout(r, 1100));

    } catch (err) {
        console.log(`❌ Failed for ${listing.title}:`, err.message);
    }
}

    console.log("Migration complete!");
    await mongoose.connection.close();
}

migrate();
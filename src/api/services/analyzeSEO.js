const axios = require("axios");
const cheerio = require("cheerio");

// Function to analyze SEO of a given URL
const analyzeSEO = async (url) => {
  try {
    // Fetch HTML content of the URL
    const response = await axios.get(url);
    const html = response.data;

    // Use Cheerio to parse the HTML content
    const $ = cheerio.load(html);

    // Extract SEO-related information
    const title = $("title").text(); // Get page title
    const metaDescription = $("meta[name='description']").attr("content"); // Get meta description
    const headings = {
      h1: $("h1").length,
      h2: $("h2").length,
      h3: $("h3").length,
      // Add more headings if needed
    };
    const images = $("img").length; // Get number of images

    // Example analysis result
    const analysisResult = {
      title,
      metaDescription,
      headings,
      images,
    };

    return analysisResult;
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw error;
  }
};

module.exports = { analyzeSEO };

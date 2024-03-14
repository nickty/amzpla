const axios = require("axios");
const cheerio = require("cheerio");
const { analyzeAccessibility } = require("./analyzeAccessibility");

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

    // Extract SEO details
    const seoDetails = {
      title,
      metaDescription,
      headings,
      images,
      // Add more SEO-related details as needed
    };

    // Perform HTML semantic analysis
    const semanticTags = $("html")
      .find("*")
      .toArray()
      .reduce((acc, elem) => {
        acc[elem.name] = (acc[elem.name] || 0) + 1;
        return acc;
      }, {});

    // Perform accessibility analysis
    // Add your accessibility checks here
    const accessibilityDetails = analyzeAccessibility($);

    // Combine all analysis results
    const analysisResult = {
      seoDetails,
      semanticTags,
      accessibilityDetails,
      // Add accessibility analysis results here
    };

    return analysisResult;
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw error;
  }
};

module.exports = { analyzeSEO };

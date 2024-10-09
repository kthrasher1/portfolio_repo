const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const striptags = require("striptags");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Set up markdown-it with HTML support
  const md = markdownIt({
    html: true, // Allow HTML tags in markdown
  }).use(markdownItAnchor);

  // Set the markdown library
  eleventyConfig.setLibrary("md", md);

  // Set the markdown filter
  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  // Human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (dateObj === "null") {
      return "Present";
    }

    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "MMMM yyyy"
    );
  });

  // Sort items by date
  eleventyConfig.addFilter('sortByDate', (items) => {
    return items.sort((a, b) => {
      return DateTime.fromISO(b.data.published) - DateTime.fromISO(a.data.published);
    });
  });

  // Extract excerpt for articles
  eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Support .yaml Extension in _data
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Add Tailwind Output CSS as Watch Target
  eleventyConfig.addWatchTarget("./_tmp/static/scss/");

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addPassthroughCopy("./src/static/files");
  eleventyConfig.addPassthroughCopy("./src/static/js");
  eleventyConfig.addPassthroughCopy("./src/static/favicon");

  // Let Eleventy transform HTML files as nunjucks
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty("templateContent")) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    );
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  excerpt = striptags(content)
    .substring(0, 1000) // Cap at 1000 characters
    .replace(/^\\s+|\\s+$|\\s+(?=\\s)/g, "")
    .trim();
  return excerpt;
}

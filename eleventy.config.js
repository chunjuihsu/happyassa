export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  const isExternalLink = (href) => {
    try {
      const url = new URL(href, "https://happyassa.com");
      return ["http:", "https:"].includes(url.protocol)
        && !["happyassa.com", "www.happyassa.com"].includes(url.hostname);
    } catch {
      return false;
    }
  };

  eleventyConfig.addFilter("isExternalLink", isExternalLink);
  eleventyConfig.amendLibrary("md", (markdown) => {
    const renderLink = markdown.renderer.rules.link_open
      || ((tokens, index, options, env, renderer) => renderer.renderToken(tokens, index, options));
    markdown.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
      const token = tokens[index];
      if (isExternalLink(token.attrGet("href"))) {
        token.attrSet("target", "_blank");
        token.attrJoin("rel", "noopener noreferrer");
      }
      return renderLink(tokens, index, options, env, renderer);
    };
  });
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"]
  };
}

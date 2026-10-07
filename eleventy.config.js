export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  const defaultLocale = "en";
  const prefixedLocales = new Set(["zh", "ko"]);

  eleventyConfig.addFilter("localeValue", (value, locale, fallback = defaultLocale) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[locale] ?? value[fallback] ?? Object.values(value)[0] ?? "";
    }

    return value ?? "";
  });

  eleventyConfig.addFilter("switchLocaleUrl", (url = "/", targetLocale) => {
    const [path, hash = ""] = url.split("#", 2);
    const hasTrailingSlash = path.endsWith("/");
    const segments = path.split("/").filter(Boolean);

    if (prefixedLocales.has(segments[0])) {
      segments.shift();
    }

    if (targetLocale !== defaultLocale) {
      segments.unshift(targetLocale);
    }

    let localizedPath = `/${segments.join("/")}`;
    if (localizedPath !== "/" && (hasTrailingSlash || !localizedPath.split("/").pop().includes("."))) {
      localizedPath += "/";
    }

    return hash ? `${localizedPath}#${hash}` : localizedPath;
  });

  eleventyConfig.addFilter("absoluteUrl", (url, base) => new URL(url, base).toString());

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

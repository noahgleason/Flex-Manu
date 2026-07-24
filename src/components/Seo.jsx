import { useEffect } from "react";

const SITE_URL = "https://flexmanufacturing.net";
const SITE_NAME = "Flex Manufacturing, Inc.";
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:image", OG_IMAGE);

    const robots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      setMeta("name", "robots", "noindex");
    } else if (robots) {
      robots.remove();
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, noindex]);

  return null;
}

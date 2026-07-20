# Flex Manufacturing Website

Static site for Flex Manufacturing, a custom gear and precision machining company in Clinton Township, Michigan (est. 1974). Plain HTML/CSS with minimal vanilla JS — no build step, no framework. Hosted on Netlify (connected to this repo for continuous deploys) so the quote form can use Netlify's native form handling.

## Pages

- `index.html` — Home
- `capabilities.html` — Capabilities
- `reverse-engineering.html` — Reverse Engineering
- `about.html` — About
- `quote.html` — Request a Quote (Netlify Forms, incl. file upload for prints/photos)
- `thank-you.html` — post-submit confirmation page (not in nav; used as the form's redirect target)

## Structure

- `css/styles.css` — design tokens & component classes (source of truth for the look)
- `css/site.css` — page layout/nav helpers built on top of those tokens
- `js/nav.js` — mobile hamburger menu toggle

## Form handling

`quote.html`'s form is wired for [Netlify Forms](https://docs.netlify.com/manage/forms/setup/): `data-netlify="true"`, a `form-name` hidden input, and a `bot-field` honeypot. This only works once the site is deployed on Netlify — Netlify's build step scans the static HTML for the form at deploy time. It will not work if the site is served from GitHub Pages or elsewhere.

## Status

Real design/copy from Claude Design in place. Photos referenced as placeholders (e.g. in the homepage part photo) still need real assets before launch.

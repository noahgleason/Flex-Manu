# Flex Manufacturing Website

React site for Flex Manufacturing, a custom gear and precision machining company in Clinton Township, Michigan (est. 1974). Built with Vite + React + React Router, client-rendered as a static single-page app. Hosted on Netlify (connected to this repo for continuous deploys) so the quote form can use Netlify's native form handling.

## Stack

- [Vite](https://vitejs.dev/) — build tool / dev server
- [React](https://react.dev/) + [React Router](https://reactrouter.com/) — SPA routing
- Plain CSS (`src/styles/`) — no CSS-in-JS, no framework classes

## Development

```
npm install
npm run dev      # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Pages (`src/pages/`)

- `Home.jsx` — `/`
- `Capabilities.jsx` — `/capabilities`
- `ReverseEngineering.jsx` — `/reverse-engineering`
- `About.jsx` — `/about`
- `Quote.jsx` — `/quote` (Netlify Forms, incl. file upload for prints/photos)
- `ThankYou.jsx` — `/thank-you` — post-submit confirmation page (not in nav; used as the form's redirect target)
- `NotFound.jsx` — catch-all 404 route

## Structure

- `src/styles/styles.css` — design tokens & component classes (source of truth for the look)
- `src/styles/site.css` — page layout/nav helpers built on top of those tokens
- `src/components/Header.jsx` — nav bar, including the mobile hamburger menu (React state, replaces the old `js/nav.js`)
- `src/components/Footer.jsx` — shared footer
- `src/components/Seo.jsx` — sets per-page `document.title`, meta description/OG/Twitter tags and canonical link via `useEffect` (no external SEO library)
- `public/` — static assets served as-is (favicon, `assets/`, `robots.txt`, `sitemap.xml`)

## Form handling

`Quote.jsx` renders a real HTML `<form>` wired for [Netlify Forms](https://docs.netlify.com/manage/forms/setup/): `data-netlify="true"`, a `form-name` hidden input, and a `bot-field` honeypot. It submits as a normal (non-AJAX) POST to `/thank-you` so file uploads work exactly like a plain HTML form.

Because this form is only ever rendered client-side by React, Netlify's build-time crawler (which scans the static HTML output for `data-netlify` forms) would never see it. To work around that, `index.html` includes a `hidden` static duplicate of the form with the same name and field names — Netlify registers the form from that copy, and submissions from the real React-rendered form are matched to it by `form-name`. This only works once the site is deployed on Netlify.

## Routing on Netlify

`netlify.toml` includes a catch-all redirect (`/* -> /index.html`, 200) so client-side routes resolve correctly on refresh/direct link, plus 301 redirects from the old static `*.html` URLs to the new clean paths.

## Status

Real design/copy from Claude Design in place. Photos referenced as placeholders (e.g. in the homepage part photo) still need real assets before launch.

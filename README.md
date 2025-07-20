# Xtradite Salon Quiz

This repository contains a self‑contained quiz that recommends a technology stack for salon owners. The quiz is written in plain HTML, CSS and JavaScript with Tailwind CSS loaded via CDN.

## Running Locally

Open `index.html` in any modern browser. No build step is required. If the page
is loaded with common UTM parameters (e.g. `utm_source`, `utm_medium` and
`utm_campaign`), these values will be stored and logged in the console whenever a
quiz option is selected. This allows lightweight tracking of how users arrived at
the quiz.

## Embedding or Hosting

GitHub Pages can serve this static site by enabling Pages in the repository settings. When hosted on GitHub, the site is served with an `X-Frame-Options: DENY` header which prevents embedding the page in an iframe from other domains. If you need to embed the quiz in a service like GoDaddy Website Builder you have two options:

1. **Host elsewhere** – Deploy the contents of this repository on a hosting provider that allows iframing (for example Netlify or a custom server).
2. **Copy the code** – Paste the HTML, CSS and JavaScript directly into your builder so it is served from the same origin as your site.

Ensure the `styles.css` file is served from the same directory as `index.html` so the background and components render correctly.

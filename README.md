# Portfolio Template

A clean, single-page developer portfolio. No frameworks, no build step — just HTML, CSS, and JavaScript with Tailwind CSS via CDN.

## Features

- **Hero** — animated typing text, avatar, call-to-action buttons
- **About** — personal description with animated skill progress bars
- **Tech Stack** — technology icons with hover effects
- **Projects** — auto-fetched from GitHub API (`api.github.com/users/{username}/repos`)
- **Contact** — form (UI only) + social links
- **Dark/Light theme** — dark by default, toggle with localStorage persistence
- **Smooth scroll** — anchor-based navigation with scroll spy
- **Fade-in animations** — Intersection Observer-powered reveal on scroll
- **Fully responsive** — mobile-first design

## Structure

```
index.html          — main page
css/style.css       — custom styles & CSS variables
js/config.js        — all customization in one file
js/app.js           — application logic
README.md           — this file
```

## Quick Start

1. Clone the repo
2. Edit `js/config.js` with your name, GitHub username, skills, and social links
3. Open `index.html` in a browser — no build step needed

## Configuration

All personalization lives in `js/config.js`:

| Key              | Description                                   |
|------------------|-----------------------------------------------|
| `name`           | Your display name                             |
| `role`           | Your job title                                |
| `avatarUrl`      | URL to your avatar image                      |
| `githubUsername`  | GitHub username for fetching repositories     |
| `hero`           | Hero section texts and CTA buttons            |
| `about`          | About description and skills with levels      |
| `techStack`      | Array of technologies with Devicon class names |
| `projects`       | Max repos, sort order, fork exclusion         |
| `contact`        | Email address                                 |
| `socials`        | Social media links and icons                  |
| `nav`            | Navigation menu items                         |

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Devicon](https://devicon.dev/) for technology icons
- [Inter](https://fonts.google.com/specimen/Inter) font via Google Fonts
- GitHub REST API for project data

## License

MIT

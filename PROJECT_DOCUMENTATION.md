# Ghost Paranormal Investigators - VuePress Website

This document provides a brief overview of the VuePress V2 project structure, setup, and key functionalities for the rebuilt Ghost Paranormal Investigators team website.

## Project Overview

The website has been rebuilt from scratch using VuePress V2, Node.js, and custom Vue 3 components (using the Composition API within `<script setup>`). The goal was to maintain the original paranormal investigation theme while enhancing functionality, modernizing the design with a dark black-grey-teal palette, and completely rewriting the content.

## Key Technologies

-   **VuePress V2:** Static site generator.
-   **Vue 3:** JavaScript framework used for interactivity within Markdown files.
-   **Node.js & npm:** For dependency management and running scripts.
-   **CSS3:** For styling, including custom properties (variables), animations, and responsive design.

## Project Structure

-   `docs/`: Contains all VuePress source files.
    -   `README.md`: Homepage (Command Center).
    -   `casefiles/README.md`: Case Files page.
    -   `chronicle/README.md`: Chronicle page.
    -   `dispatch/README.md`: Dispatch/Contact page.
    -   `dossier/README.md`: Dossier/About Us page.
    -   `evidence/README.md`: Evidence gallery page.
    -   `laboratory/README.md`: Laboratory/Team page.
    -   `oracle/README.md`: Oracle/FAQ page.
    -   `.vuepress/`: VuePress specific configuration and assets.
        -   `config.js`: Main VuePress configuration file (site title, theme, navbar, sidebar, base path, plugins).
        -   `client.js`: Client app enhancement file, used here to import global styles.
        -   `public/`: Static assets.
            -   `images/`: Contains all site images (team photos, evidence placeholders, logo placeholder).
        -   `styles/`: Custom styles.
            -   `index.css`: Global stylesheet defining the dark theme, typography (VT323 font), responsive media queries, animations, and overrides for the default VuePress theme.
-   `package.json`: Lists project dependencies and npm scripts.
-   `deploy.sh`: Shell script for building and deploying the site to GitHub Pages.
-   `PROJECT_DOCUMENTATION.md`: This file.

## Setup and Running Locally

1.  **Prerequisites:** Node.js and npm installed.
2.  **Clone the repository.**
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run docs:dev
    ```
    This will typically start the site on `http://localhost:8080`.

## Building for Production

To generate the static site files:

```bash
npm run docs:build
```

The output will be in `docs/.vuepress/dist/`.

## Deployment

The `deploy.sh` script is configured to deploy the site to the `gh-pages` branch of the `BDGAMINGYT8003/MEGAPORTFOLIOPROJECT` repository. Ensure you have push access and have configured SSH keys if using SSH URLs for git.

The `base` path in `docs/.vuepress/config.js` is set to `/MEGAPORTFOLIOPROJECT/` for this deployment.

## Key Functionalities & Customizations

-   **Dark Theme & Typography:** A custom dark theme (black-grey-teal) and the `VT323` monospace font are applied globally via `docs/.vuepress/styles/index.css`.
-   **Interactive Pages:**
    -   **Command Center (`docs/README.md`):** Features dynamic data updates (uptime, operational status, anomaly readings, etc.) powered by Vue 3 Composition API.
    -   **Dossier (`docs/dossier/README.md`):** Implements collapsible sections for biography, skills, etc.
    -   **Evidence (`docs/evidence/README.md`):** An image gallery with modal pop-ups for detailed views.
    -   **Dispatch (`docs/dispatch/README.md`):** A contact form with dynamic title updates and submission handling (via FormSubmit.co).
    -   **Oracle (`docs/oracle/README.md`):** Collapsible FAQ sections.
    -   **Laboratory (`docs/laboratory/README.md`):** Dynamically renders team member profiles.
-   **Global Effects:** Includes a persistent grid overlay and scanline animation for thematic consistency.
-   **Content Rewrite:** All textual content has been rewritten for a more engaging and sophisticated tone.
-   **Asset Management:** Images are served from `docs/.vuepress/public/images/`. Placeholders are used for missing evidence images and the logo.

## Missing Assets

The following images were not found in the original project and have been replaced with empty placeholders. These should be added to `docs/.vuepress/public/images/` for the site to display correctly:
-   `IMG-20250217-WA0004.jpg`
-   `FB_IMG_1739953366991.jpg`
-   `evidence3.png` through `evidence10.png`
-   `logo_placeholder.png` (actual site logo)

This documentation provides a starting point for understanding and maintaining the project.

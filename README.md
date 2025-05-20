# The Ectoplasmic Investigators - Command Center

This project is built using Vite.

## Development

To run the development server:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```

This will typically open the application in your browser at `http://localhost:5173`.

## Building for Production

To build the project for production:

1. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
2. Run the Vite build command:
   ```bash
   npm run build
   ```

This will create a `dist` folder with the optimized static assets. You can then deploy the contents of this folder to your web server.

## Project Structure

- `index.html`: Main entry point for the application.
- `main.js`: Main JavaScript file.
- `style.scss`: Main SCSS file.
- `vite.config.js`: Vite configuration file.
- `package.json`: Project metadata and dependencies.
- Other HTML files (`casefiles.html`, `chronicle.html`, etc.) are also entry points for their respective pages. Vite should handle these automatically. If you encounter issues, you might need to adjust `vite.config.js` for multi-page application setup.
- `images/`: Contains image assets.

# FarmLink - Direct to Industry (AgriTech Hackathon)

FarmLink is a simple demo web app to help farmers list their crops and allow industries to view & contact them directly — removing middlemen and improving transparency.

## Features
- Add and view crop listings (stored locally for the demo)
- Mobile-friendly responsive UI with a light green theme
- Live weather updates using Open-Meteo (no API key required)
- Contact information included (farmlinkteam@gmail.com)

## How to use (Upload to GitHub Pages)
1. Create a GitHub repository (public) named e.g. `FarmLink-App`.
2. Upload these files (`index.html`, `style.css`, `script.js`, `README.md`) to the repository root.
3. In the repository settings, enable **Pages** and select `main` branch and `/ (root)` folder. Save.
4. After a minute, your site will be live at `https://<your-github-username>.github.io/<repo-name>/`

## Notes for Hackathon Demo
- The app stores demo listings in browser `localStorage`. For a production backend, connect to Firebase, Supabase, or Google Sheets.
- Weather uses Open-Meteo free API and browser geolocation to show current weather for the user's location.
- Change contact email in `index.html` if desired.

---
Good luck with your hackathon! 🚀

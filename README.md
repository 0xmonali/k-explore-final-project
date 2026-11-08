# K Explore – Event Management Website

A clean, responsive event site for **K Explore – Web Designing**. Plain HTML5, CSS3 and JavaScript. No build step, no dependencies.

**Live site:** _add your Vercel / Netlify / GitHub Pages link here_

## Features
- Hero with a live "Coming up" board counting down to the next events
- Event cards with illustrated posters, society, date, venue, description and a seat meter
- **Grid and timeline views**, plus search, category, society and intent filters
- **Command palette** (`Ctrl/Cmd + K` or `/`) to jump straight to any event
- **Campus map** with clickable event pins
- Registration form with JavaScript validation (name, email, 10-digit phone, event), duplicate check and **schedule clash warning**
- Confirmation message and a **digital pass** with a pass code and **Add to calendar** (.ics)
- Registrations and saved events kept in Local Storage
- Dark / light mode that follows the system and remembers your choice
- Responsive layout, visible keyboard focus, reduced-motion support

## Files
```
index.html   structure and map drawing
style.css    design tokens, themes, layout
script.js    events, filters, validation, passes, palette, countdown
```

## Run
Open `index.html`, or use VS Code Live Server.

## Use real event details
Sample events are based on publicly listed KIIT society programmes. Edit the `EVENTS` array at the top of `script.js` with official names, dates, venues and seat counts. `in` is days from today. To use real poster images, add files to `images/` and replace `art(e)` with the file path.

## Deploy
GitHub Pages: Settings > Pages > branch `main`, root. Netlify or Vercel: import the repo, no build command.
# k-explore-final-project

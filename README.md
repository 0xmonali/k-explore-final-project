# K Explore – Event Management Website

A clean, responsive event website built for the **K Explore – Web Designing** assignment. It lets users explore upcoming campus events, view details and register for the ones they like.

**Live site:** https://0xmonali.github.io/k-explore-final-project/
**Repository:** https://github.com/0xmonali/k-explore-final-project

## Tech stack
- HTML5
- CSS3
- JavaScript (vanilla, no frameworks or build step)
- Git and GitHub, deployed with GitHub Pages

## Features
- Hero section with a live "Coming up" board counting down to the next events
- Event cards with an illustrated poster, society, date, venue, description and a seat meter
- Search, plus filters by category, society and intent
- Grid and timeline views
- Command palette (`Ctrl/Cmd + K` or `/`) to jump to any event
- Stylised campus map with clickable event pins
- Event details dialog with a registration form
- JavaScript form validation:
  - Name: letters only, at least 3 characters
  - Email: valid format
  - Phone: 10 digits starting with 6, 7, 8 or 9
  - Event: must be selected
  - Duplicate registration check and a schedule clash warning
- Confirmation message and a digital pass with a pass code
- "Add to calendar" download (.ics)
- Registrations and saved events stored in Local Storage
- Dark / light mode that follows the system setting and remembers your choice
- Responsive on mobile, tablet and desktop, with keyboard focus styles and reduced-motion support

## Project structure
```
index.html   page structure and campus map
style.css    design tokens, themes, layout and responsive rules
script.js    event data, filters, validation, passes, countdown, palette
README.md    project documentation
```

## How it works
1. Events are stored in one JavaScript array (`EVENTS` in `script.js`) and rendered into cards or a timeline.
2. Search and filters re-run on that array and redraw the list.
3. Selecting an event opens a dialog with its details and the registration form.
4. On submit, each field is checked against a rule and errors appear under the field.
5. Valid registrations are saved to `localStorage` and shown under **My passes**.
6. Countdowns update every second using the event's date and time.

## Run locally
Open `index.html` in a browser, or use the VS Code **Live Server** extension.

## Customise events
Edit the `EVENTS` array at the top of `script.js`. The `in` field is the number of days from today, so countdowns always stay in the future.

## Deployment
Deployed on GitHub Pages from the `main` branch (root folder).

## Note
Event details are sample data based on publicly listed KIIT society programmes and should be replaced with official information.
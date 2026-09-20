# Personal Portfolio Website

## Overview

This is a responsive personal portfolio for Shiwanshu Verma. It presents my skills, projects, education, and software engineering journey, while giving visitors a simple way to explore my work and get in touch.

## Features

- Responsive portfolio layout for desktop and mobile screens
- Animated visual effects and interactive theme controls
- About, learning highlights, skills, projects, curriculum, and journey sections
- Project Lab with search, category filters, expandable learning notes, and live result status
- Contact links for email, LinkedIn, and GitHub
- Floating AI assistant entry point
- Contact is the final main section before the footer

## Screenshots

The portfolio is designed to be explored on both large and small screens. Add current desktop and mobile captures to a `screenshots/` directory and link them here when previews are available.

## Tech Stack

- HTML5 for the page structure
- CSS3 for layout, responsive styling, themes, and animations
- Vanilla JavaScript for interactions and Project Lab behavior

## Page Sections

1. Home
2. About
3. Learning Highlights
4. Projects
5. Skills & Technologies
6. Curriculum
7. Journey
8. Project Lab
9. Get In Touch

## Run Locally

No build step or dependency installation is required. Open `index.html` in a browser, or serve the folder with any local static web server.

For example, with Python installed:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Validate Project Lab

Run the PowerShell validation script from the project directory:

```powershell
.\validate-project-lab.ps1
```

The script checks the required Project Lab markup, JavaScript hooks, and JavaScript syntax.

## Project Lab

The Project Lab turns the learning journey into an interactive build log:

- Search projects by name, technology, or focus
- Filter builds by AI systems, web apps, or foundations
- Expand each build to read the key lesson behind it
- See the live number of matching builds while exploring

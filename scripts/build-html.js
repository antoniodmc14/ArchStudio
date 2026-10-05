/* ==========================================================================
   FILE: scripts/build-html.js — Generates index.html from data + templates
   ========================================================================== */

const fs = require("node:fs");
const path = require("node:path");

const about = require("../src/data/about");
const { projects } = require("../src/data/projects");
const { renderPage } = require("../src/templates/render");

const LOCKED_ABOUT_HEADINGS = about.ABOUT_SECTION_HEADINGS ?? [
  "Projects",
  "Clients",
  "Collaborators",
  "Awards",
];

const LOCKED_ABOUT_ICONS = {
  Projects: "work",
  Clients: "feliz",
  Collaborators: "circulo",
  Awards: "estrella",
};

about.groups.forEach((group, index) => {
  const expected = LOCKED_ABOUT_HEADINGS[index];
  if (group.title !== expected) {
    throw new Error(
      `About section heading at groups[${index}] must be exactly "${expected}", got "${group.title}".`,
    );
  }
  const expectedIcon = LOCKED_ABOUT_ICONS[group.title];
  if (group.icon !== expectedIcon) {
    throw new Error(
      `About section icon for "${group.title}" must be "${expectedIcon}", got "${group.icon}".`,
    );
  }
});

const outputPath = path.resolve(__dirname, "..", "index.html");
const html = renderPage(projects, about);

fs.writeFileSync(outputPath, html, "utf8");

const lineCount = html.split(/\r?\n/).length;
console.log(`Generated index.html (${lineCount} lines)`);

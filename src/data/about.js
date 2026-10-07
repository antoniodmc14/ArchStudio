/* ==========================================================================
   FILE: src/data/about.js — About view copy and metadata groups
   ========================================================================== */

/** @type {readonly ["Projects", "Clients", "Collaborators", "Awards"]} */
const ABOUT_SECTION_HEADINGS = [
  "Projects",
  "Clients",
  "Collaborators",
  "Awards",
];

module.exports = {
  ABOUT_SECTION_HEADINGS,
  intro:
    "Dante Beltrán Studio is an architectural practice based in Vigo, Spain, founded in 2018. The office operates at the intersection of spatial restraint, material exploration, and structural clarity across residential, commercial, and interior interventions. Emphasizing a tectonic approach to construction, the practice prioritizes raw textures, natural light as a primary building component, and long-term durability over transient trends. Each project is conceived as a context-specific synthesis of local craft, rigorous geometry, and modern functionality.",
  email: "info@dantebeltran.com",
  socialLabels: ["instagram", "are.na"],
  groups: [
    {
      title: "Projects",
      icon: "work",
      items: [
        "La Jolla Beachside",
        "Piaule",
        "Casa da Praia",
        "Apartamento Relicário",
        "SBC Apartment",
        "Forest Edge House",
      ],
    },
    {
      title: "Clients",
      icon: "feliz",
      items: [
        "Holzrausch",
        "Hersen Mendes Arquitetura",
        "Studio Papaya",
        "Edifice Upstate",
        "Aeterna Civis",
      ],
    },
    {
      title: "Collaborators",
      icon: "circulo",
      items: [
        "Valerio Olgiati",
        "Souto de Moura-Arquitectos",
        "Accademia di Architettura di Mendrisio",
        "John Pawson",
        "Elena Varela Arquitectura",
      ],
    },
    {
      title: "Awards",
      icon: "estrella",
      items: [
        "COAG Architecture Award, Residential Category",
        "FAD Awards Finalist, Interior Architecture",
        "ArchDaily Building of the Year Nominee",
        "Architectural Review Emerging Architecture Award, Commendation",
      ],
    },
  ],
  copyright: "Dante Beltrán Studio ©",
  aboutColumnFooter: "Last Updated 06.10.26",
};

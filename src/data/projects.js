/* ==========================================================================
   FILE: src/data/projects.js — Project grid content and gallery metadata
   ========================================================================== */

/* --- Icon sets (per-project decorative rows) --- */

const iconSets = {
  a: ["luna", "casa", "cafe", "corazon", "circulo", "flechas", "flor", "sol"],
  b: ["hoja", "arco", "bird", "trebol", "reloj", "estrella", "meteoro", "paz"],
};

/* --- Project records (order preserved for DOM / build output) --- */

const projects = [
  {
    id: "daniel",
    title: "La Jolla Beachside",
    meta: "2025/26 San Diego, USA",
    iconSet: "a",
    iconsBeforeInfo: true,
    fadeAfterScroll: true,
    description: [
      "The central challenge of this La Jolla beachside residence lay in transforming a rigid 1950s coastal footprint into a reauthored architectural environment. Bound by strict Coastal Commission regulations, the project operates less as a renovation and more as a rigorous recalibration of space, structure, and light.",
      "Stripped to its essential framework, the interior unfolds through a disciplined palette of warm oak millwork, hand-carved solid onyx, and muted tactile finishes. Subtle nautical geometry shapes the spatial sequence—from vaulted oak ceiling planes reminiscent of a ship's hull to controlled aperture windows that frame precise perspectives of the Pacific.",
      "Architecture, material, and light are held in quiet equilibrium, distilling order, spatial editing, and understated material authenticity.",
    ],
    altPrefix: "Daniel",
    images: [
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-01.jpg", width: 1280, height: 854 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-16-1229x1536.jpg", width: 1229, height: 1536 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-07-1097x1536.jpg", width: 1097, height: 1536 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-10.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-11.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-22-1097x1536.jpg", width: 1097, height: 1536 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-30-1097x1536.jpg", width: 1097, height: 1536 },
      { src: "assets/img/projects/Daniel/La-Jolla-Beachside-Haven-Daniel-Joseph-Chenin-25-1025x1536.jpg", width: 1025, height: 1536 },
    ],
  },
  {
    id: "piaule",
    title: "Piaule",
    meta: "2025/26 Vidrà, Spain",
    iconSet: "b",
    description: [
      "Set across a wooded hillside in Vidrà, Piaule operates as a quiet constellation of cedar-clad cabins elevated on stilts to preserve the terrain beneath. Designed in collaboration with Design Within Reach, the interiors form an intimate dialogue between modern classics—featuring pieces by Charlotte Perriand, Arne Jacobsen, and John Pawson—and the tactile presence of the surrounding forest.",
      "At the highest elevation sits the Oak House, a three-bedroom residence structured around continuous apertures. Each space opens onto private decks, allowing light, wind, and shadow to register dynamically throughout the day.",
      "Architecture, curated furniture, and nature exist in sustained equilibrium, prioritizing spatial editing, material integrity, and unhurried mountain atmosphere.",
    ],
    altPrefix: "Piaule",
    images: [
      { src: "assets/img/projects/Piaule/DWR-Piaule-Double-Cabin-02-1229x1536.jpg", width: 1229, height: 1536 },
      { src: "assets/img/projects/Piaule/DWR-Piaule-Oak-House-10.jpg", width: 1280, height: 720 },
      { src: "assets/img/projects/Piaule/DWR-Piaule-Oak-House-08-1229x1536.jpg", width: 1229, height: 1536 },
      { src: "assets/img/projects/Piaule/DWR-Piaule-Oak-House-00.jpg", width: 1280, height: 720 },
      { src: "assets/img/projects/Piaule/DWR-Piaule-Oak-House-03.jpg", width: 1280, height: 720 },
      { src: "assets/img/projects/Piaule/DWR-Piaule-Oak-House-11-1-1229x1536.jpg", width: 1229, height: 1536 },
    ],
  },
  {
    id: "holzrausch",
    title: "Casa da Praia",
    meta: "2025/26 Alcúdia, Spain",
    iconSet: "a",
    description: [
      "Perched along the Alcúdia coastline, Casa da Praia transforms an original 1980s structure into a refined holiday retreat. Designed by Munich-based studio Holzrausch, the project merges Mediterranean materiality with mid-century California geometry and Latin American modernist references.",
      "The intervention preserves the original two-level layout and pine beams while introducing teak millwork, custom HUGUET terrazzo, and targeted color fields inspired by Luis Barragán. A central false ceiling was opened to funnel natural light deep into the core, establishing a continuous dialogue between interior volumes and the sea.",
      "Architecture, vibrant texture, and Mediterranean light exist in quiet equilibrium, prioritizing material authenticity, precise editing, and an unhurried coastal atmosphere.",
    ],
    altPrefix: "Casa da Praia",
    images: [
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-19-1152x1536.jpg", width: 1152, height: 1536 },
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-3-1152x1536.jpg", width: 1152, height: 1536 },
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-4-1152x1536.jpg", width: 1152, height: 1536 },
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-11.jpg", width: 1280, height: 960 },
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-7-1152x1536.jpg", width: 1152, height: 1536 },
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-23.jpg", width: 1280, height: 960 },
      { src: "assets/img/projects/Holzrau/Mallorca-Vacation-House-Holzrausch-13.jpg", width: 1280, height: 960 },
    ],
  },
  {
    id: "relicario",
    title: "Apartamento Relicário",
    meta: "2025/26 Brasília, Brazil",
    iconSet: "b",
    description: [
      "Located in Brasília, Apartamento Relicário reimagines a 1,022-square-foot residential layout into a multi-generational home for an elderly resident. Designed by Hersen Mendes Arquitetura, the intervention opens fluid sightlines between living and dining areas while integrating subtle, non-clinical accessibility solutions.",
      "A lifetime of travel souvenirs, photographs, and personal artifacts are framed within custom joinery, treating domestic history as an architectural element. Soft indirect lighting, wide circulation paths, and tactile timber finishes prioritize autonomy, warmth, and visual clarity.",
      "The space strikes a balance between memory and functional modernization, providing a serene environment for family gathering and daily rituals.",
    ],
    altPrefix: "Apartamento Relicário",
    images: [
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-1.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-6-1024x1536.jpg", width: 1024, height: 1536 },
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-8-1024x1536.jpg", width: 1024, height: 1536 },
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-9.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-10.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-12-1024x1536.jpg", width: 1024, height: 1536 },
      { src: "assets/img/projects/Relicario/Apartamento-Relicario-Brazil-Hersen-Mendes-Arquitetura-15-1024x1536.jpg", width: 1024, height: 1536 },
    ],
  },
  {
    id: "papayas",
    title: "SBC Apartment",
    meta: "2025/26 São Paulo, Brazil",
    iconSet: "a",
    description: [
      "Located in São Paulo, SBC Apartment reimagines a 538-square-foot duplex into a fluid, highly integrated living environment. Designed by Studio Papaya, the project uses saturated green tones, exposed plywood joinery, and strategic floor material shifts to delineate functional zones without erect interior walls.",
      "A custom sliding table transforms the main plane between culinary worktop, dining area, and workspace. Absorbing the former balcony into the double-height volume maximizes natural light, while custom millwork and a suspended mezzanine wardrobe optimize spatial efficiency.",
      "Architecture, bespoke furniture, and precise color fields combine to create a flexible, airy residence tailored for flexible urban living.",
    ],
    altPrefix: "SBC Apartment",
    images: [
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-3.jpg", width: 1280, height: 854 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-5-1025x1536.jpg", width: 1025, height: 1536 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-9.jpg", width: 1280, height: 1208 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-by-Studio-Papaya.png", width: 1200, height: 674 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-8.jpg", width: 1280, height: 1707 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-13.jpg", width: 1280, height: 1919 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-17.jpg", width: 1280, height: 854 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-18.jpg", width: 1280, height: 854 },
      { src: "assets/img/projects/Papayas/SBC-Apartment-Brazil-Studio-Papaya-19.jpg", width: 1280, height: 854 },
    ],
  },
  {
    id: "forest-edge",
    title: "Forest Edge House",
    meta: "2025/26 Sierra de las Nieves, Spain",
    iconSet: "b",
    description: [
      "Located in the foothills of the Sierra de las Nieves in Málaga, Forest Edge House is a 1,500-square-foot off-grid residence designed by Marc Thorpe (Edifice Upstate). Sited along a gentle forested slope, the dark pine-clad volume integrates a facade-integrated solar array generating 38 kWh daily, anchoring the project around strict energy self-reliance and descriptive functionalism.",
      "The architecture draws inspiration from regional agrarian structures, where form directly follows necessity. Windows are strategically positioned for cross-ventilation and framed views of the Mediterranean canopy, while a 25-foot cantilevered black steel deck extends directly into the surrounding trees.",
      "Inside, open-plan living spaces feature full-floor radiant heating, white minimal surfaces, and tactile natural materials paired with Ligne Roset furnishings. The project stands as a quiet framework for systemic, ecological living, balancing contemporary comfort with passive performance.",
    ],
    altPrefix: "Forest Edge House",
    images: [
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-07.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-09.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-00.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-01-1024x1536.jpg", width: 1024, height: 1536 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-02-1024x1536.jpg", width: 1024, height: 1536 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-05.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-04.jpg", width: 1280, height: 853 },
      { src: "assets/img/projects/Marc/Forest-Edge-House-Marc-Thorpe-Design-and-Architecture-Edifice-Upstate-06.jpg", width: 1280, height: 853 },
    ],
  },
];

module.exports = { iconSets, projects };

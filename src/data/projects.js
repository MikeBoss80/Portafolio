const projectImage = (fileName) => new URL(`../../assets/images/projects/${fileName}`, import.meta.url).href;

export const projects = [
  {
    id: 1,
    title: "Portafolio Web",
    category: "Web",
    description:
      "Sitio web personal responsive con tema oscuro/claro, animaciones GSAP y fondo SVG 3D.",
    image: projectImage("portafolio.webp"),
    tech: ["HTML", "JavaScript", "CSS", "GSAP"],
    demo: "https://github.com/MikeBoss80/Portafolio",
    code: "https://github.com/MikeBoss80/Portafolio",
  },
  {
    id: 2,
    title: "BarberB",
    category: "Web App",
    description:
      "Aplicación web para reservar citas en barbería con gestión de usuarios, establecimientos y notificaciones.",
    image: projectImage("barberb.webp"),
    tech: ["Django", "Python", "JavaScript", "HTML", "CSS", "MySQL"],
    demo: "https://github.com/MikeBoss80/web_barberb",
    code: "https://github.com/MikeBoss80/web_barberb",
  },
  {
    id: 3,
    title: "COVID-19 Analysis",
    category: "Data",
    description:
      "Análisis de hospitalización por COVID-19 con visualización de datos y métricas clave.",
    image: projectImage("covid19.webp"),
    tech: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    demo: "https://github.com/MikeBoss80/covid_hospitalization_analysis",
    code: "https://github.com/MikeBoss80/covid_hospitalization_analysis",
  },
  {
    id: 4,
    title: "Reciclaje CEMPRE",
    category: "Data",
    description:
      "Análisis de datos para CEMPRE Uruguay sobre reciclaje con visualizaciones interactivas.",
    image: projectImage("reciclaje.webp"),
    tech: ["Python", "Pandas", "Data Analysis", "Dash"],
    demo: "https://github.com/MikeBoss80/prueba_data_analyst_cempre",
    code: "https://github.com/MikeBoss80/prueba_data_analyst_cempre",
  },
  {
    id: 5,
    title: "Transporte Dashboard",
    category: "BI",
    description:
      "Dashboard en Power BI para análisis de incidentes de transporte público.",
    image: projectImage("dashboard-transporte.webp"),
    tech: ["Power BI", "DAX", "SQL", "ETL"],
    demo: "https://github.com/MikeBoss80/power_bi_transport_incident_dashboard",
    code: "https://github.com/MikeBoss80/power_bi_transport_incident_dashboard",
  },
  {
    id: 6,
    title: "Mattech",
    category: "Web",
    description:
      "Plataforma tecnológica para gestión de materiales y recursos.",
    image: projectImage("mattech.webp"),
    tech: ["Python", "Django", "JavaScript", "PostgreSQL"],
    demo: "https://github.com/MikeBoss80/Mattech",
    code: "https://github.com/MikeBoss80/Mattech",
  },
  {
    id: 7,
    title: "LawHonor",
    category: "Web App",
    description:
      "Sistema de gestión para despachos jurídicos con seguimiento de casos y clientes.",
    image: projectImage("lawhonor.webp"),
    tech: ["Python", "Django", "Bootstrap", "SQLite"],
    demo: "https://github.com/MikeBoss80/LawHonor",
    code: "https://github.com/MikeBoss80/LawHonor",
  },
  {
    id: 8,
    title: "Perfil GitHub",
    category: "README",
    description:
      "README interactivo para perfil de GitHub con estadísticas y tecnologías.",
    image: projectImage("perfil-readme.webp"),
    tech: ["Markdown", "HTML", "Badges"],
    demo: "https://github.com/MikeBoss80/MikeBoss80",
    code: "https://github.com/MikeBoss80/MikeBoss80",
  },
];

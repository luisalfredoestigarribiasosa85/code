export type Locale = "en" | "es"

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      language: "Language",
      menu: "Menu",
    },
    hero: {
      title: "Luis Estigarribia",
      subtitle: "Full-stack developer focused on clean, reliable web apps.",
      badge: "Open to opportunities",
      ctaPrimary: "View Projects",
      ctaSecondary: "Download CV",
    },
    stack: {
      title: "Tech I work with",
    },
    projects: {
      title: "Selected Projects",
      p1: { title: "Vestiventa", desc: "Marketplace-style Rails app deployed on Render." },
      p2: { title: "Vendelo", desc: "Rails app deployed with Kamal + Docker on Google Cloud." },
      p3: { title: "CSE341 API", desc: "REST API in Node.js documented with Swagger/OpenAPI." },
      visit: "Visit",
      caseStudy: "Case Study",
    },
    about: {
      title: "About",
      body: "I build pragmatic, maintainable products with a focus on clarity, performance, and developer ergonomics. Comfortable across Rails and Node.js, I enjoy shaping clean APIs and shipping production-ready features.",
    },
    contact: {
      title: "Contact",
      body: "Want to collaborate or have a question? Send a message and I'll get back to you.",
      direct: "Or reach out directly",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        success: "Thanks! I'll reply soon.",
        error: "Something went wrong. Please try again.",
      },
    },
    footer: {
      rights: "All rights reserved.",
    },
    caseStudy: {
      overview: "Overview",
      role: "Role & Responsibilities",
      techStack: "Tech Stack",
      problem: "Problem → Solution",
      architecture: "Architecture & Key Decisions",
      challenges: "Challenges & Learnings",
      outcomes: "Outcomes & Metrics",
      links: "Key Highlights",
      backToProjects: "← Back to Projects",
    },
    skipToContent: "Skip to content",
  },
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
      language: "Idioma",
      menu: "Menú",
    },
    hero: {
      title: "Luis Estigarribia",
      subtitle: "Desarrollador full-stack enfocado en apps web claras y confiables.",
      badge: "Abierto a oportunidades",
      ctaPrimary: "Ver Proyectos",
      ctaSecondary: "Descargar CV",
    },
    stack: {
      title: "Tecnologías que uso",
    },
    projects: {
      title: "Proyectos Destacados",
      p1: { title: "Vestiventa", desc: "Aplicación Rails tipo marketplace desplegada en Render." },
      p2: { title: "Vendelo", desc: "App Rails desplegada con Kamal + Docker en Google Cloud." },
      p3: { title: "CSE341 API", desc: "API REST en Node.js documentada con Swagger/OpenAPI." },
      visit: "Visitar",
      caseStudy: "Caso de Estudio",
    },
    about: {
      title: "Sobre mí",
      body: "Construyo productos mantenibles y pragmáticos, priorizando claridad, rendimiento y ergonomía para desarrolladores. Cómodo trabajando con Rails y Node.js, disfruto diseñar APIs limpias y lanzar funcionalidades listas para producción.",
    },
    contact: {
      title: "Contacto",
      body: "¿Querés colaborar o tenés una consulta? Enviá un mensaje y te responderé pronto.",
      direct: "O escribime directo",
      form: {
        name: "Nombre",
        email: "Correo",
        message: "Mensaje",
        send: "Enviar",
        success: "¡Gracias! Responderé pronto.",
        error: "Algo salió mal. Volvé a intentar.",
      },
    },
    footer: {
      rights: "Todos los derechos reservados.",
    },
    caseStudy: {
      overview: "Resumen",
      role: "Rol y Responsabilidades",
      techStack: "Stack Tecnológico",
      problem: "Problema → Solución",
      architecture: "Arquitectura y Decisiones Clave",
      challenges: "Desafíos y Aprendizajes",
      outcomes: "Resultados y Métricas",
      links: "Aspectos Destacados",
      backToProjects: "← Volver a Proyectos",
    },
    skipToContent: "Saltar al contenido",
  },
} as const

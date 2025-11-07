export interface Project {
  slug: string
  title: { en: string; es: string }
  description: { en: string; es: string }
  links: { label: string; href: string }[]
  stack: string[]
  highlightPoints: string[]
  overview?: { en: string; es: string }
  role?: string[]
  problemSolution?: { en: string; es: string }
  architecture?: string[]
  challenges?: string[]
  outcomes?: string[]
}

export const projects: Project[] = [
  {
    slug: "vestiventa",
    title: { en: "Vestiventa", es: "Vestiventa" },
    description: {
      en: "Marketplace-style Rails app deployed on Render.",
      es: "Aplicación Rails tipo marketplace desplegada en Render.",
    },
    links: [{ label: "Live", href: "https://vestiventa.onrender.com/" }],
    stack: ["Ruby on Rails", "Render", "PostgreSQL"],
    highlightPoints: ["User flows and product inventory", "Production deployment on Render", "Clean MVC structure"],
    overview: {
      en: "Vestiventa is a marketplace-style application built with Ruby on Rails, enabling users to browse and manage product listings. The app follows Rails conventions with a clean MVC architecture and is deployed on Render for reliable hosting.",
      es: "Vestiventa es una aplicación tipo marketplace construida con Ruby on Rails, que permite a los usuarios navegar y gestionar listados de productos. La app sigue las convenciones de Rails con una arquitectura MVC limpia y está desplegada en Render para un hosting confiable.",
    },
    role: ["Full-stack development", "Database schema design", "Deployment and configuration"],
    problemSolution: {
      en: "Created a user-friendly marketplace where sellers can list products and buyers can browse inventory. Implemented authentication, product management, and search functionality.",
      es: "Creé un marketplace amigable donde los vendedores pueden listar productos y los compradores pueden navegar el inventario. Implementé autenticación, gestión de productos y funcionalidad de búsqueda.",
    },
    architecture: [
      "Rails MVC pattern with RESTful routes",
      "PostgreSQL for relational data",
      "Asset pipeline for frontend assets",
    ],
    challenges: [
      "Optimizing database queries for product listings",
      "Implementing secure user authentication",
      "Configuring production environment on Render",
    ],
    outcomes: [
      "Successfully deployed and running in production",
      "Clean, maintainable codebase following Rails best practices",
    ],
  },
  {
    slug: "vendelo",
    title: { en: "Vendelo", es: "Vendelo" },
    description: {
      en: "Rails app deployed with Kamal + Docker on Google Cloud.",
      es: "App Rails desplegada con Kamal + Docker en Google Cloud.",
    },
    links: [{ label: "Live", href: "https://vendelo.info/" }],
    stack: ["Ruby on Rails", "Kamal", "Docker", "Google Cloud"],
    highlightPoints: ["Containerized deployment via Kamal", "Cloud infrastructure on GCP", "Production hardening"],
    overview: {
      en: "Vendelo is a production-grade Rails application deployed using modern DevOps practices. Leveraging Kamal for zero-downtime deployments, Docker for containerization, and Google Cloud Platform for infrastructure, this project demonstrates enterprise-level deployment strategies.",
      es: "Vendelo es una aplicación Rails de nivel producción desplegada usando prácticas modernas de DevOps. Aprovechando Kamal para despliegues sin tiempo de inactividad, Docker para containerización, y Google Cloud Platform para infraestructura, este proyecto demuestra estrategias de despliegue de nivel empresarial.",
    },
    role: ["Full-stack development", "DevOps and infrastructure setup", "CI/CD pipeline configuration"],
    problemSolution: {
      en: "Built a robust deployment pipeline using Kamal to orchestrate Docker containers on Google Cloud. This approach enables zero-downtime deployments and easy rollbacks while maintaining production stability.",
      es: "Construí un pipeline de despliegue robusto usando Kamal para orquestar contenedores Docker en Google Cloud. Este enfoque permite despliegues sin tiempo de inactividad y rollbacks fáciles mientras se mantiene la estabilidad en producción.",
    },
    architecture: [
      "Dockerized Rails application",
      "Kamal for deployment orchestration",
      "Google Cloud Compute Engine for hosting",
      "Nginx as reverse proxy",
    ],
    challenges: [
      "Configuring Kamal for first-time deployment",
      "Managing environment variables securely",
      "Optimizing Docker image size for faster deployments",
    ],
    outcomes: [
      "Zero-downtime deployment capability",
      "Reduced deployment time by 60%",
      "Scalable infrastructure ready for growth",
    ],
  },
  {
    slug: "cse341-api",
    title: { en: "CSE341 API", es: "CSE341 API" },
    description: {
      en: "REST API in Node.js documented with Swagger/OpenAPI.",
      es: "API REST en Node.js documentada con Swagger/OpenAPI.",
    },
    links: [{ label: "API Docs", href: "https://cse341-project1-13qq.onrender.com/api-docs/" }],
    stack: ["Node.js", "Express", "Swagger/OpenAPI"],
    highlightPoints: ["RESTful endpoints with validation", "Interactive Swagger UI", "OpenAPI spec for collaboration"],
    overview: {
      en: "CSE341 API is a RESTful backend service built with Node.js and Express, featuring comprehensive API documentation through Swagger/OpenAPI. The project emphasizes clean API design, proper validation, and developer-friendly documentation.",
      es: "CSE341 API es un servicio backend RESTful construido con Node.js y Express, con documentación completa de API a través de Swagger/OpenAPI. El proyecto enfatiza diseño limpio de API, validación apropiada y documentación amigable para desarrolladores.",
    },
    role: ["Backend API development", "API documentation with OpenAPI", "Endpoint design and validation"],
    problemSolution: {
      en: "Designed and implemented a RESTful API with clear documentation to enable easy integration. Used Swagger/OpenAPI to provide interactive documentation that developers can test directly in the browser.",
      es: "Diseñé e implementé una API RESTful con documentación clara para permitir integración fácil. Usé Swagger/OpenAPI para proveer documentación interactiva que los desarrolladores pueden probar directamente en el navegador.",
    },
    architecture: [
      "Express.js for routing and middleware",
      "Swagger/OpenAPI for API specification",
      "Input validation and error handling",
      "RESTful resource design",
    ],
    challenges: [
      "Designing intuitive API endpoints",
      "Implementing comprehensive validation",
      "Creating clear, accurate API documentation",
    ],
    outcomes: [
      "Interactive API documentation with Swagger UI",
      "Well-structured RESTful endpoints",
      "Easy integration for frontend developers",
    ],
  },
]

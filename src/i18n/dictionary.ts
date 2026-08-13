export type Lang = "es" | "en";

export const DEFAULT_LANG: Lang = "es";
export const STORAGE_KEY = "anamorphic-lang";

interface Dict {
  [key: string]: string;
}

export const dictionary: Record<Lang, Dict> = {
  es: {
    "meta.title": "ANAMORPHIC — más allá de la pantalla, por Penta",
    "meta.description":
      "Diseño y producción de contenido anamórfico para pantallas, instalaciones, campañas y experiencias digitales. Una vertical de Penta.",

    "nav.by": "por Penta",
    "nav.work": "Trabajo",
    "nav.capabilities": "Capacidades",
    "nav.cta": "Iniciar un proyecto",

    "hero.title.line1": "Más allá",
    "hero.title.line2": "de la pantalla.",
    "hero.subcopy": "Contenido anamórfico diseñado para romper los límites de las pantallas tradicionales.",
    "hero.scroll": "Scroll",

    "concept.eyebrow": "01 — Concepto",
    "concept.statement.line1": "Diseñamos experiencias visuales",
    "concept.statement.line2": "que no se quedan dentro de la pantalla.",
    "concept.body":
      "Contenido anamórfico para marcas, productos, retail, eventos, pantallas LED, instalaciones y experiencias digitales — pensado para sentirse dimensional desde un único punto de vista.",
    "concept.tag.brands": "Marcas",
    "concept.tag.products": "Productos",
    "concept.tag.retail": "Retail",
    "concept.tag.events": "Eventos",
    "concept.tag.led": "Pantallas LED",
    "concept.tag.installations": "Instalaciones",
    "concept.tag.digital": "Experiencias digitales",

    "scrollexp.step0": "Forma completa",
    "scrollexp.step1": "Cambio de perspectiva",
    "scrollexp.step2": "Emerge la profundidad",
    "scrollexp.step3": "Más allá del cuadro",

    "breakdown.eyebrow": "03 — Anatomía",
    "breakdown.layer0": "Placa base",
    "breakdown.layer1": "Máscara de profundidad",
    "breakdown.layer2": "Capa de refracción",
    "breakdown.layer3": "Superficie anamórfica",
    "breakdown.layer4": "Punto de vista fijo del espectador",
    "breakdown.badge": "Geometría provisoria — a reemplazar por el render 3D final",
    "breakdown.caption":
      "Ensamblar → explotar → inspeccionar → reconstruir. Esta estructura está lista para recibir un render 3D real o una secuencia capturada en la próxima iteración.",

    "showcase.eyebrow": "04 — Trabajos seleccionados",
    "showcase.placeholder": "PROVISORIO",
    "showcase.item1.title": "Reel anamórfico",
    "showcase.item1.desc": "Piezas anamórficas seleccionadas · Compilado",
    "showcase.item2.title": "Vidriera retail 3D",
    "showcase.item2.desc": "Formato de exhibición · Producto en profundidad",
    "showcase.item3.title": "Pantalla LED inmersiva",
    "showcase.item3.desc": "Instalación CGI · Ilusión a pantalla completa",
    "showcase.item4.title": "Publicidad exterior 3D",
    "showcase.item4.desc": "Formato OOH · Anamórfico en vía pública",
    "showcase.item5.title": "Anuncio en pantalla plana",
    "showcase.item5.desc": "CGI en tiempo real · Ilusión de profundidad",

    "capabilities.eyebrow": "05 — Capacidades",
    "capabilities.item1.title": "Contenido Anamórfico",
    "capabilities.item1.desc": "Concepto + producción.",
    "capabilities.item2.title": "Visualización de Producto 3D",
    "capabilities.item2.desc": "Productos diseñados para profundidad y perspectiva.",
    "capabilities.item3.title": "Motion & CGI",
    "capabilities.item3.desc": "Animación de alto impacto y narrativa visual.",
    "capabilities.item4.title": "Experiencias Web Interactivas",
    "capabilities.item4.desc": "Contenido anamórfico llevado a entornos digitales impulsados por scroll.",
    "capabilities.item5.title": "LED y Pantallas Físicas",
    "capabilities.item5.desc": "Contenido diseñado para instalaciones reales.",

    "final.title.line1": "Creemos algo",
    "final.title.line2": "más allá de la pantalla.",
    "final.sub": "Penta — División de Contenido Anamórfico",

    "footer.text": "Anamorphic Web — prototipo",
  },
  en: {
    "meta.title": "ANAMORPHIC — beyond the screen, by Penta",
    "meta.description":
      "Anamorphic content design and production for screens, installations, campaigns and digital experiences. A vertical of Penta.",

    "nav.by": "by Penta",
    "nav.work": "Work",
    "nav.capabilities": "Capabilities",
    "nav.cta": "Start a project",

    "hero.title.line1": "Beyond",
    "hero.title.line2": "the screen.",
    "hero.subcopy": "Anamorphic content designed to break the boundaries of traditional displays.",
    "hero.scroll": "Scroll",

    "concept.eyebrow": "01 — Concept",
    "concept.statement.line1": "We design visual experiences",
    "concept.statement.line2": "that don't stay inside the screen.",
    "concept.body":
      "Anamorphic content for brands, products, retail, events, LED screens, installations and digital experiences — engineered to feel dimensional from a single point of view.",
    "concept.tag.brands": "Brands",
    "concept.tag.products": "Products",
    "concept.tag.retail": "Retail",
    "concept.tag.events": "Events",
    "concept.tag.led": "LED Screens",
    "concept.tag.installations": "Installations",
    "concept.tag.digital": "Digital experiences",

    "scrollexp.step0": "Full form",
    "scrollexp.step1": "Perspective shift",
    "scrollexp.step2": "Depth emerges",
    "scrollexp.step3": "Beyond the frame",

    "breakdown.eyebrow": "03 — Anatomy",
    "breakdown.layer0": "Base plate",
    "breakdown.layer1": "Depth mask",
    "breakdown.layer2": "Refraction layer",
    "breakdown.layer3": "Anamorphic surface",
    "breakdown.layer4": "Viewer perspective lock",
    "breakdown.badge": "Placeholder geometry — swap for final 3D / render asset",
    "breakdown.caption":
      "Assemble → explode → inspect → rebuild. This structure is built to receive a real 3D render or captured sequence in the next iteration.",

    "showcase.eyebrow": "04 — Selected work",
    "showcase.placeholder": "PLACEHOLDER",
    "showcase.item1.title": "Anamorphic reel",
    "showcase.item1.desc": "Selected anamorphic pieces · Compilation",
    "showcase.item2.title": "3D retail vitrine",
    "showcase.item2.desc": "Display format · Product in depth",
    "showcase.item3.title": "Immersive LED screen",
    "showcase.item3.desc": "CGI installation · Full-screen illusion",
    "showcase.item4.title": "3D out-of-home",
    "showcase.item4.desc": "OOH format · Anamorphic in public space",
    "showcase.item5.title": "Flat-screen ad",
    "showcase.item5.desc": "Real-time CGI · Depth illusion",

    "capabilities.eyebrow": "05 — Capabilities",
    "capabilities.item1.title": "Anamorphic Content",
    "capabilities.item1.desc": "Concept + production.",
    "capabilities.item2.title": "3D Product Visualization",
    "capabilities.item2.desc": "Products designed for depth and perspective.",
    "capabilities.item3.title": "Motion & CGI",
    "capabilities.item3.desc": "High-impact animation and visual storytelling.",
    "capabilities.item4.title": "Interactive Web Experiences",
    "capabilities.item4.desc": "Bringing anamorphic content into scroll-driven digital environments.",
    "capabilities.item5.title": "LED & Physical Displays",
    "capabilities.item5.desc": "Content designed for real-world installations.",

    "final.title.line1": "Let's create something",
    "final.title.line2": "beyond the screen.",
    "final.sub": "Penta — Anamorphic Content Division",

    "footer.text": "Anamorphic Web — prototype",
  },
};

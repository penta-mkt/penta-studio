export type Lang = "es" | "en";

export const DEFAULT_LANG: Lang = "es";
export const STORAGE_KEY = "anamorphic-lang";

interface Dict {
  [key: string]: string;
}

export const dictionary: Record<Lang, Dict> = {
  es: {
    "meta.title": "Penta Studio — Marketing, comunicación e innovación",
    "meta.description":
      "Estrategia, branding, contenido, pauta y experiencias para marcas que quieren crecer con sentido. Penta Studio.",

    "nav.by": "por Penta",
    "nav.work": "Trabajo",
    "nav.capabilities": "Capacidades",
    "nav.accounts": "Cuentas",
    "nav.cta": "Iniciar un proyecto",

    "hero.title.line1": "Creative &",
    "hero.title.line2": "Experiential Studio",
    "hero.subcopy": "Un mismo equipo para estrategia, creatividad, contenido y producción — sin coordinar diez proveedores distintos.",
    "hero.scroll": "Scroll",

    "concept.eyebrow": "01 — Concepto",
    "concept.badge": "Creative Studio 360°",
    "concept.statement.line1": "Everything creative,",
    "concept.statement.line2": "under one studio.",
    "concept.body":
      "Estrategia, branding, contenido audiovisual, eventos y tecnología digital trabajando como un mismo sistema — para que cada marca tenga una dirección clara en todos los puntos de contacto.",
    "concept.tag.creative": "Creative",
    "concept.tag.events": "Events",
    "concept.tag.digital": "Digital",
    "concept.tag.branding": "Branding",
    "concept.tag.marketing": "Marketing",

    "scrollexp.step0": "Marketing Strategy & Growth",
    "scrollexp.step1": "Branding & Dirección Creativa",
    "scrollexp.step2": "Diseño & Contenido Audiovisual",
    "scrollexp.step3": "Eventos & Activaciones",
    "scrollexp.step4": "Web & Ecosistema Digital",

    "gallery.eyebrow": "05 — Producto en foco",
    "gallery.title.line1": "Fotografía de producto:",
    "gallery.title.line2": "Street.",
    "gallery.desc":
      "Fotografía de producto pensada para moverse: en la calle, en la pauta, en el feed. Así se ve una pieza cuando no se queda quieta en un catálogo.",

    "showcase.eyebrow": "07 — Trabajos seleccionados",
    "showcase.placeholder": "PROVISORIO",
    "showcase.item1.title": "Reel anamórfico",
    "showcase.item1.desc": "Piezas anamórficas seleccionadas · Compilado",
    "showcase.item2.title": "Institucional TTE Group",
    "showcase.item2.desc": "Video corporativo · Operación y logística industrial",
    "showcase.item3.title": "Anuncio en pantalla plana",
    "showcase.item3.desc": "CGI en tiempo real · Ilusión de profundidad",

    "stand.eyebrow": "08 — Puesta en escena",
    "stand.title": "Del render a la experiencia real.",
    "stand.desc":
      "Diseñamos y producimos stands y espacios de marca de punta a punta: propuesta 3D, identidad, iluminación, contenido audiovisual y montaje en el lugar.",

    "motionFeature.eyebrow": "06 — Pieza destacada",
    "motionFeature.title": "Producto médico · Motion 3D",
    "motionFeature.desc":
      "Render y animación de producto pensados para comunicación institucional, con foco en claridad técnica y precisión visual.",

    "capabilities.eyebrow": "09 — Capacidades",
    "capabilities.item1.title": "Marketing Strategy & Growth",
    "capabilities.item1.desc":
      "No se trata solo de comunicar: se trata de construir una dirección clara. Diseñamos estrategias que conectan los objetivos comerciales de cada marca con campañas, contenidos y acciones pensadas para crecer, posicionarse y generar resultados medibles.",
    "capabilities.item2.title": "Branding & Dirección Creativa",
    "capabilities.item2.desc":
      "Una marca es mucho más que un logo. Construimos identidades visuales con personalidad, criterio y coherencia, capaces de transmitir una historia, diferenciarse en el mercado y sostenerse en todos los puntos de contacto.",
    "capabilities.item3.title": "Diseño & Contenido Audiovisual",
    "capabilities.item3.desc":
      "Creamos contenido visual pensado para captar atención, comunicar con claridad y potenciar la presencia de cada marca en redes, campañas, eventos y plataformas digitales.",
    "capabilities.item4.title": "Eventos & Activaciones",
    "capabilities.item4.desc":
      "Convertimos ideas en experiencias reales. Diseñamos, producimos y acompañamos activaciones de marca, lanzamientos y eventos que combinan creatividad, producción integral y soluciones tecnológicas.",
    "capabilities.item5.title": "Web & Ecosistema Digital",
    "capabilities.item5.desc":
      "Diseñamos sitios y plataformas digitales que no solo se ven bien, sino que también ordenan la comunicación, presentan servicios, captan oportunidades y fortalecen la presencia online de cada marca.",

    "nav.manuals": "Manuales",
    "manuals.eyebrow": "02 — Manuales de marca",
    "manuals.tte.title": "Manual de marca",
    "manuals.tte.badge": "Cuenta activa",
    "manuals.tte.desc":
      "Sistema de identidad completo para una empresa de energía y transformadores: isologo, paleta, tipografía, usos correctos y piezas de comunicación aplicadas a vía pública, gráfica y papelería.",
    "manuals.tag.identity": "Identidad visual",
    "manuals.tag.system": "Sistema gráfico",
    "manuals.tag.guidelines": "Brand guidelines",
    "manuals.tag.applications": "Aplicaciones de marca",
    "manuals.tte.scope":
      "Hoy gestionamos la cuenta integral de TTE Group: piezas gráficas, rebranding, comunicación institucional, filmaciones y merchandising.",

    "accounts.eyebrow": "03 — Cuentas que manejamos",
    "accounts.bases.desc": "Calzados y sandalias mayoristas",
    "accounts.bases.stat": "1.909 seguidores",
    "accounts.fanlab.desc": "Hologramas y experiencias interactivas 3D",
    "accounts.fanlab.stat": "+6.200 seguidores (AR + CL)",
    "accounts.malvinas.desc": "Cuenta oficial de la Subsecretaría de Deporte",
    "accounts.malvinas.stat": "31,1 mil seguidores",
    "accounts.more.title": "Y seguimos sumando marcas",
    "accounts.more.desc": "Conversemos sobre tu proyecto",

    "results.eyebrow": "04 — Resultados",
    "results.case.eyebrow": "Caso de éxito · Fábrica de calzado mayorista",
    "results.case.subhead":
      "Cómo la inversión en publicidad y nuestro servicio se convirtieron en clientes nuevos y en casi un tercio de la facturación de una fábrica.",
    "results.title.line1": "Resultados que se pueden medir:",
    "results.title.line2": "30% de la facturación.",
    "results.feature.eyebrow": "Caso destacado — Bases Balc",
    "results.feature.label":
      "La facturación de la fábrica que llega hoy de clientes captados con pauta digital pasó del 2% al 30% en 14 meses de gestión (ago. 2025 → sep. 2026). Arrancó siendo casi nula y hoy es casi un tercio de la venta total.",
    "results.feature.chip1": "+61% seguidores en Facebook en el último año",
    "results.feature.chip2": "+67% seguidores en Instagram desde enero",
    "results.feature.chip3": "×6,6 en visualizaciones de Instagram",
    "results.feature.toggle.show": "Ver el caso completo",
    "results.feature.toggle.hide": "Ocultar el caso completo",
    "results.chart.title": "Los clientes de la pauta ya son el 30% de la venta",
    "results.chart.caption":
      "Facturación de clientes captados por la pauta sobre la venta total de la fábrica, mes a mes.",
    "results.chart.legend1": "Antes de escalar la pauta",
    "results.chart.legend2": "Con la pauta ya escalada",
    "results.group1.title": "231 clientes nuevos en 14 meses",
    "results.group1.stat1": "costo por cliente nuevo",
    "results.group1.stat2": "clientes nuevos en un solo mes",
    "results.group1.stat3": "de los nuevos ya volvió a comprar",
    "results.group2.title": "Cada peso invertido volvió multiplicado",
    "results.group2.stat1": "en ventas por cada $1 invertido en publicidad",
    "results.group2.stat2": "en ventas por cada $1 de inversión total, servicio incluido",
    "results.group2.stat3": "de lo facturado es lo que cuesta la pauta completa",
    "results.group2.note":
      "Abril a septiembre 2026. Si el margen de la fábrica supera el 6%, la pauta deja ganancia desde el primer peso.",
    "results.group3.title": "La venta creció aun con el resto del mercado en baja",
    "results.group3.stat1": "venta total de la fábrica, abril a septiembre contra el mismo período de 2025",
    "results.group3.stat2": "facturación de los clientes que llegaron por la pauta",
    "results.group3.stat3": "el resto de los clientes, sin contar la pauta",
    "results.group3.note":
      "El crecimiento del año vino de los clientes nuevos. Sin la pauta, la fábrica habría vendido menos que el año anterior.",

    "final.title.line1": "Creative",
    "final.title.line2": "Studio 360°",
    "final.contact.whatsapp": "WhatsApp",
    "final.sub": "Penta — Marketing, comunicación e innovación",

    "footer.text": "Marketing, comunicación e innovación",
  },
  en: {
    "meta.title": "Penta Studio — Marketing, Communication & Innovation",
    "meta.description":
      "Strategy, branding, content, paid media and experiences for brands that want to grow with purpose. Penta Studio.",

    "nav.by": "by Penta",
    "nav.work": "Work",
    "nav.capabilities": "Capabilities",
    "nav.accounts": "Accounts",
    "nav.cta": "Start a project",

    "hero.title.line1": "Creative &",
    "hero.title.line2": "Experiential Studio",
    "hero.subcopy": "One team for strategy, creative, content and production — no juggling ten different vendors.",
    "hero.scroll": "Scroll",

    "concept.eyebrow": "01 — Concept",
    "concept.badge": "Creative Studio 360°",
    "concept.statement.line1": "Everything creative,",
    "concept.statement.line2": "under one studio.",
    "concept.body":
      "Strategy, branding, audiovisual content, events and digital technology working as one system — so every brand has a clear direction across every touchpoint.",
    "concept.tag.creative": "Creative",
    "concept.tag.events": "Events",
    "concept.tag.digital": "Digital",
    "concept.tag.branding": "Branding",
    "concept.tag.marketing": "Marketing",

    "scrollexp.step0": "Marketing Strategy & Growth",
    "scrollexp.step1": "Branding & Creative Direction",
    "scrollexp.step2": "Design & Audiovisual Content",
    "scrollexp.step3": "Events & Activations",
    "scrollexp.step4": "Web & Digital Ecosystem",

    "gallery.eyebrow": "05 — Product in focus",
    "gallery.title.line1": "Product photography:",
    "gallery.title.line2": "Street.",
    "gallery.desc":
      "Product photography made to move — on the street, in paid media, in the feed. This is what a piece looks like when it doesn't stay in the catalog.",

    "showcase.eyebrow": "07 — Selected work",
    "showcase.placeholder": "PLACEHOLDER",
    "showcase.item1.title": "Anamorphic reel",
    "showcase.item1.desc": "Selected anamorphic pieces · Compilation",
    "showcase.item2.title": "TTE Group — Institutional",
    "showcase.item2.desc": "Corporate video · Industrial operations & logistics",
    "showcase.item3.title": "Flat-screen ad",
    "showcase.item3.desc": "Real-time CGI · Depth illusion",

    "stand.eyebrow": "08 — Bringing it to life",
    "stand.title": "From render to real-world experience.",
    "stand.desc":
      "We design and produce stands and brand spaces end to end: 3D concept, identity, lighting, audiovisual content and on-site build.",

    "motionFeature.eyebrow": "06 — Featured piece",
    "motionFeature.title": "Medical device · 3D motion",
    "motionFeature.desc":
      "Product render and animation built for institutional communication, focused on technical clarity and visual precision.",

    "capabilities.eyebrow": "09 — Capabilities",
    "capabilities.item1.title": "Marketing Strategy & Growth",
    "capabilities.item1.desc":
      "It's not just about communicating — it's about building a clear direction. We design strategies that connect each brand's business goals with campaigns, content and actions built to grow, position and deliver measurable results.",
    "capabilities.item2.title": "Branding & Creative Direction",
    "capabilities.item2.desc":
      "A brand is much more than a logo. We build visual identities with personality, judgment and coherence — able to tell a story, stand out in the market and hold up across every touchpoint.",
    "capabilities.item3.title": "Design & Audiovisual Content",
    "capabilities.item3.desc":
      "We create visual content built to capture attention, communicate clearly and strengthen each brand's presence across social media, campaigns, events and digital platforms.",
    "capabilities.item4.title": "Events & Activations",
    "capabilities.item4.desc":
      "We turn ideas into real experiences. We design, produce and support brand activations, launches and events that combine creativity, full-scale production and technology-driven solutions.",
    "capabilities.item5.title": "Web & Digital Ecosystem",
    "capabilities.item5.desc":
      "We design websites and digital platforms that don't just look good — they organize communication, showcase services, capture opportunities and strengthen each brand's online presence.",

    "nav.manuals": "Manuals",
    "manuals.eyebrow": "02 — Brand manuals",
    "manuals.tte.title": "Brand manual",
    "manuals.tte.badge": "Active account",
    "manuals.tte.desc":
      "A complete identity system for an energy and transformers company: logo, palette, typography, correct usage and communication pieces applied to public space, print and stationery.",
    "manuals.tag.identity": "Visual identity",
    "manuals.tag.system": "Graphic system",
    "manuals.tag.guidelines": "Brand guidelines",
    "manuals.tag.applications": "Brand applications",
    "manuals.tte.scope":
      "We currently manage TTE Group's full account: graphic pieces, rebranding, institutional communication, video production and merchandising.",

    "accounts.eyebrow": "03 — Accounts we manage",
    "accounts.bases.desc": "Wholesale footwear & sandals",
    "accounts.bases.stat": "1,909 followers",
    "accounts.fanlab.desc": "Holograms & interactive 3D experiences",
    "accounts.fanlab.stat": "+6,200 followers (AR + CL)",
    "accounts.malvinas.desc": "Official account of the Sports Undersecretariat",
    "accounts.malvinas.stat": "31.1K followers",
    "accounts.more.title": "And we keep adding brands",
    "accounts.more.desc": "Let's talk about your project",

    "results.eyebrow": "04 — Results",
    "results.case.eyebrow": "Success story · Wholesale footwear factory",
    "results.case.subhead":
      "How advertising spend and our service turned into new customers — and into nearly a third of a factory's total sales.",
    "results.title.line1": "Results you can measure:",
    "results.title.line2": "30% of revenue.",
    "results.feature.eyebrow": "Featured case — Bases Balc",
    "results.feature.label":
      "The share of the factory's total sales coming from customers brought in through paid digital campaigns went from 2% to 30% in 14 months of work (Aug 2025 → Sep 2026). It started at almost nothing and is now close to a third of total sales.",
    "results.feature.chip1": "+61% Facebook followers this year",
    "results.feature.chip2": "+67% Instagram followers since January",
    "results.feature.chip3": "×6.6 Instagram views",
    "results.feature.toggle.show": "See the full case",
    "results.feature.toggle.hide": "Hide the full case",
    "results.chart.title": "Paid-media customers are now 30% of sales",
    "results.chart.caption":
      "Revenue from customers brought in through paid media, as a share of the factory's total sales, month by month.",
    "results.chart.legend1": "Before scaling paid media",
    "results.chart.legend2": "After scaling paid media",
    "results.group1.title": "231 new customers in 14 months",
    "results.group1.stat1": "cost per new customer",
    "results.group1.stat2": "new customers in a single month",
    "results.group1.stat3": "of new customers already bought again",
    "results.group2.title": "Every peso invested came back multiplied",
    "results.group2.stat1": "in sales per $1 invested in advertising",
    "results.group2.stat2": "in sales per $1 of total investment, service included",
    "results.group2.stat3": "of revenue is what the full campaign costs",
    "results.group2.note":
      "April to September 2026. If the factory's margin is above 6%, paid media turns a profit from the first peso.",
    "results.group3.title": "Sales grew even as the rest of the market slowed",
    "results.group3.stat1": "total factory sales, April–September vs. the same period in 2025",
    "results.group3.stat2": "revenue from customers who came through paid media",
    "results.group3.stat3": "the rest of the customers, not counting paid media",
    "results.group3.note":
      "This year's growth came from new customers. Without paid media, the factory would have sold less than the year before.",

    "final.title.line1": "Creative",
    "final.title.line2": "Studio 360°",
    "final.contact.whatsapp": "WhatsApp",
    "final.sub": "Penta — Marketing, Communication & Innovation",

    "footer.text": "Marketing, communication & innovation",
  },
};

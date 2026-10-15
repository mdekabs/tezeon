import { FaCog, FaFilter, FaHome, FaIndustry, FaWater, FaWrench } from "react-icons/fa";

import type {
  CollageItem,
  Faq,
  Feature,
  GalleryItem,
  HeroSlide,
  NavLinkItem,
  PortfolioItem,
  Service,
  SocialLink,
  Stat,
  TeamMember,
  Testimonial,
  TopBarItem,
} from "@/types";

/* --------------------------------------------------------------------------
 * Company constants (transcribed from the legacy HTML head/meta blocks)
 * ------------------------------------------------------------------------ */

export const COMPANY = {
  name: "Tezeon Services Limited",
  shortName: "Tezeon",
  siteUrl: "https://tezeonservicesltd.com",
  logo: "https://res.cloudinary.com/dxd3nmbag/image/upload/v1755441476/waterlog_lnxqbb.png",
  phone: "+234 803 096 7886",
  phoneAlt: "+234 705 919 9474",
  tel: "+2348030967886",
  email: "info@tezeonservicesltd.com",
  street: "30 Bayo Shodikpo Avenue, Palmwill Estate",
  city: "Ajah",
  region: "Lagos",
  country: "NG",
  addressLine: "30 Bayo Shodikpo Avenue, Palmwill Estate, Ajah, Lagos NG",
  openingHours: "Mon - Fri, 8:00 - 9:00",
  whatsappUrl: "https://wa.link/nv8lmw",
  description:
    "Tezeon Services Limited delivers expert borehole drilling, water filtration, reservoir construction and plumbing across Nigeria. Trusted by Chevron, Landwey & more.",
  defaultTitle:
    "Tezeon Services Limited | Borehole Drilling & Water Engineering — Lagos, Nigeria",
} as const;

/** Legacy local asset that was served from `assets/` — now lives in `public/`. */
export const LOCAL_FILTRATION_TANKS = "/assets/filtration-tanks.png";
export const LOCAL_SITE_VIDEO = "/assets/site-video-1.mp4";

const IMG = "https://res.cloudinary.com/dxd3nmbag/image/upload";
const VID = "https://res.cloudinary.com/dxd3nmbag/video/upload";
/** Newer client uploads live on a second Cloudinary account. */
const CLIENT_IMG = "https://res.cloudinary.com/dodf7s2r2/image/upload";
const CLIENT_VID = "https://res.cloudinary.com/dodf7s2r2/video/upload";

/* --------------------------------------------------------------------------
 * Navigation & chrome
 * ------------------------------------------------------------------------ */

export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Project", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const TOP_BAR_ITEMS: readonly TopBarItem[] = [
  { icon: "calendar", title: "Opening Hour", text: COMPANY.openingHours },
  { icon: "call", title: "Call Us", text: COMPANY.phone },
  { icon: "send-mail", title: "Email Us", text: COMPANY.email },
];

/* --------------------------------------------------------------------------
 * Home sections
 * ------------------------------------------------------------------------ */

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    videoSrc: `${VID}/v1780763751/video_tezeons_jcytjj.mp4`,
    sub: "Clean water is our business",
    headingTop: "For your Offices",
    headingBottom: "and Sites",
    cta: { label: "Get A Free Quote", href: COMPANY.whatsappUrl, external: true },
  },
  {
    videoSrc: `${VID}/v1703577957/done_loop_fwxh3x.mp4`,
    poster: `${IMG}/v1703285075/drilling_cux1bb.jpg`,
    sub: "Reliable & drinkable",
    headingTop: "For your Homes",
    headingBottom: "and Communities",
    cta: { label: "Get A Free Quote", href: COMPANY.whatsappUrl, external: true },
  },
  {
    videoSrc: LOCAL_SITE_VIDEO,
    poster: `${IMG}/v1703283172/team_byizqw.jpg`,
    sub: "Trusted by industry leaders",
    headingTop: "Eco-Friendly Water",
    headingBottom: "Engineering",
    cta: { label: "Contact Us", href: "/contact", external: false },
  },
  {
    videoSrc: LOCAL_SITE_VIDEO,
    sub: "Advanced treatment systems",
    headingTop: "Pure Water,",
    headingBottom: "Delivered Right",
    cta: { label: "Our Services", href: "/services", external: false },
  },
];

export const HOME_VIDEO_SRC = `${VID}/v1703577957/water_testing_eqqo3a.mp4`;
export const ABOUT_PAGE_VIDEO_SRC = `${VID}/v1704281176/done_loop_fwxh3x.mp4`;

export const ABOUT_INTRO = {
  eyebrow: "Welcome to Tezeon Services limited",
  title: "Making water clean, safe, reliable & drinkable for the past 10 years",
  paragraphs: [
    "Welcome to Tezeon Services Limited – Your Gateway to Comprehensive Hydrogeological Excellence! At Tezeon, we take immense pride in being the trailblazers of hydrogeological excellence, committed to delivering unparalleled clean water services. With a dedication to quality, innovation, and environmental sustainability, we stand as a beacon of hope for communities seeking reliable access to pristine water sources.",
    "At the heart of Tezeon Services Limited is a mission to create a lasting impact by providing access to clean and safe water. We believe that water is not just a resource; it's a lifeline that connects communities, fosters growth, and sustains life. Our team is driven by the vision of a world where every individual enjoys the fundamental right to access clean water.",
  ],
  missionLead: "Our Mission:",
} as const;

export const FEATURES: readonly Feature[] = [
  {
    icon: "worker",
    title: "Expertise",
    description:
      "We have Water Engineers, Geologists, Technicians to meet our daily challenges.",
  },
  {
    icon: "building",
    title: "Quality Work",
    description:
      "Our work speaks for itself. we don't just work, we build a legacy to be remembered.",
  },
  {
    icon: "call",
    title: "24/7 Support",
    description: "Non-stop support and backup services for all our clients.",
  },
];

export const FACTS: readonly Stat[] = [
  { icon: "worker", value: 20, label: "Expert Workers" },
  { icon: "building", value: 126, label: "Happy Clients" },
  { icon: "address", value: 541, label: "Completed Projects" },
  { icon: "crane", value: 11, label: "Running Projects" },
];

export const SERVICES: readonly Service[] = [
  {
    title: "Water Filtration",
    description: "Water filtration system.",
    image: `${IMG}/v1703180023/water_installation_qiomfk.jpg`,
    alt: "Industrial water filtration system",
  },
  {
    title: "Reservoir",
    description: "Reservoir construction",
    image: `${IMG}/v1703179993/tank_rqjgdq.jpg`,
    alt: "Water reservoir under construction",
  },
  {
    title: "Exploration",
    description: "Water exploration.",
    image: `${IMG}/v1703179926/drilling_pvs4dm.jpg`,
    alt: "Borehole drilling and water exploration",
  },
  {
    title: "Home water system",
    description: "Installation of stansions",
    image: `${IMG}/v1703179979/Stansion_vjhu83.jpg`,
    alt: "Water stanchion installation",
  },
  {
    title: "Plumbing and piping",
    description: "Plumbing works.",
    image: `${IMG}/v1703179957/plumbing_eiwbiz.jpg`,
    alt: "Professional plumbing and piping works",
  },
  {
    title: "Water system",
    description: "Home water system.",
    image: `${IMG}/v1703179941/filtration_dz03pl.jpg`,
    alt: "Home water filtration system",
  },
];

/** Client-supplied footage of the current ongoing project (Cloudinary). */
const ONGOING_PROJECT_ASSET = "v1792072848/ongoing_track01_ekcifm";

export const SHOWCASE_VIDEO = {
  title: "Water Reticulation — Orange Island, Lagos",
  /* q_auto + 1280px width: ~6 MB instead of the 50 MB original upload. */
  src: `${CLIENT_VID}/q_auto,w_1280/${ONGOING_PROJECT_ASSET}.mp4`,
  /* Cloudinary renders a poster frame when the extension is .jpg. */
  poster: `${CLIENT_VID}/${ONGOING_PROJECT_ASSET}.jpg`,
  caption: "Watch This Space For Our Ongoing Project",
} as const;

const CORE_SOCIALS: readonly SocialLink[] = [
  { platform: "twitter", href: "#" },
  { platform: "facebook", href: "#" },
  { platform: "linkedin", href: "#" },
  { platform: "instagram", href: "#" },
];

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    name: "Chika Nnameka",
    role: "Water Engineer",
    image: `${IMG}/v1703283149/chika_zlu882.jpg`,
    alt: "Chika Nnameka, Water Engineer",
    socials: CORE_SOCIALS,
  },
  {
    name: "Beski",
    role: "Engineer",
    image: `${IMG}/v1703283140/Beski_gmfvme.jpg`,
    alt: "Beski, Engineer",
    socials: CORE_SOCIALS,
  },
  {
    name: "Our Team",
    role: "Water Engineering Specialists",
    image: `${IMG}/v1703283161/team_a_yy6jp5.jpg`,
    alt: "The Tezeon water engineering team",
  },
];

export const FAQS: readonly Faq[] = [
  {
    question: "Can you work anywhere?",
    answer:
      "Yes we do. we can work anywhere in the Globe, all that is required is to mobilization to the location and we would deliver faithfully.",
  },
  {
    question: "How long do you need to be notified for the job?",
    answer: "We can mobilize for the remote job with 72 hours.",
  },
  {
    question: "How is the quality of your water ensured?",
    answer:
      "We implement rigorous testing and purification processes at our state-of-the-art facilities. Our commitment to quality control includes regular testing for contaminants, ensuring that the water you receive meets or exceeds all relevant health and safety standards.",
  },
  {
    question: "Do you support any water-related community initiatives?",
    answer: "Yes.",
  },
  {
    question: "How can I benefit from a hydrogeological assessment for my property?",
    answer:
      "A hydrogeological assessment helps determine the quantity, quality, and sustainability of groundwater on your property. This information is crucial for making informed decisions about water supply, development, and environmental impact.",
  },
  {
    question: "What is the process involved in well drilling services?",
    answer:
      "Our well drilling process begins with a site assessment, followed by the drilling of the well, installation of appropriate casing, and testing. We ensure compliance with local regulations and standards to deliver reliable water supply solutions.",
  },
  {
    question: "Can your company assist with water contamination issues?",
    answer:
      "Absolutely. We provide comprehensive water quality analysis services to identify and address contamination issues. Our team employs state-of-the-art techniques to assess and remediate water quality problems effectively.",
  },
  {
    question: "How do you ensure sustainable water resource management?",
    answer:
      "Our company emphasizes sustainable water resource management practices, focusing on efficient use, conservation, and responsible extraction. We work closely with clients to develop strategies that balance water needs with long-term environmental sustainability.",
  },
  {
    question: "What industries do you serve with your water solutions?",
    answer:
      "Our expertise extends across various industries, including agriculture, mining, construction, municipal water supply, and environmental consulting. We tailor our services to meet the unique water challenges of each sector.",
  },
  {
    question: "How can I request a consultation or engage your services?",
    answer:
      "To schedule a consultation or inquire about our services, simply contact our team through our website, email, or phone. We'll be happy to discuss your specific needs and provide customized solutions.",
  },
];

export const COLLAGE_ITEMS: readonly CollageItem[] = [
  {
    image: `${IMG}/v1703179957/plumbing_eiwbiz.jpg`,
    alt: "Professional pipe installation",
    label: "Pipe Installation",
    icon: FaWrench,
    tall: true,
  },
  {
    image: `${IMG}/v1703180023/water_installation_qiomfk.jpg`,
    alt: "Industrial water filtration system",
    label: "Water Filtration",
    icon: FaFilter,
  },
  {
    image: `${IMG}/v1703179926/drilling_pvs4dm.jpg`,
    alt: "Borehole drilling operation",
    label: "Borehole Drilling",
    icon: FaCog,
  },
  {
    image: `${IMG}/v1703179993/tank_rqjgdq.jpg`,
    alt: "Water reservoir construction",
    label: "Reservoir Build",
    icon: FaWater,
  },
  {
    image: `${IMG}/v1703179941/filtration_dz03pl.jpg`,
    alt: "Home water system setup",
    label: "Home Water System",
    icon: FaHome,
  },
  {
    image: LOCAL_FILTRATION_TANKS,
    alt: "Industrial filtration tank installation",
    label: "Treatment Tanks",
    icon: FaIndustry,
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: "Orange Island",
    role: "Estate",
    quote: "They are trust worthy.",
    logo: `${IMG}/v1703180490/orange_k4kiyn.png`,
    logoAlt: "Orange Island logo",
  },
  {
    name: "Chalcedony School",
    role: "School",
    quote: "Did not regret giving them the job.",
    logo: `${IMG}/v1703180420/school_fxefxv.jpg`,
    logoAlt: "Chalcedony School logo",
  },
  {
    name: "Pinnacle Oil and Gas",
    role: "Oil Company",
    quote: "Absolutely enjoyed working with them.",
    logo: `${IMG}/v1703180329/pinnacle_d53hcb.jpg`,
    logoAlt: "Pinnacle Oil and Gas logo",
  },
  {
    name: "Landwey",
    role: "Real Estate Company",
    quote: "Alway maintain my piping installations.",
    logo: `${IMG}/v1703180214/landwey_x5r138.jpg`,
    logoAlt: "Landwey logo",
  },
  {
    name: "Chevron",
    role: "Oil and gas Company",
    quote: "They are our trusted partner.",
    logo: `${IMG}/v1703180129/chevron-logo_pakbcc.png`,
    logoAlt: "Chevron logo",
  },
];

/**
 * Precomputed 16px JPEG blur placeholders for the project cards, generated by
 * `scripts/generate-blur-data.mjs` (sharp). Keyed by project title; regenerate
 * that script's output if the Cloudinary assets are replaced.
 */
export const PORTFOLIO_BLUR: Record<string, string> = {
  "Home Water System":
    "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwT/xAAdEAACAQQDAAAAAAAAAAAAAAABAwACBBExISJB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABcRAQEBAQAAAAAAAAAAAAAAAAEAESH/2gAMAwEAAhEDEQA/AGXfAWlIB7SZ7DWM55MlRqMo7PsGA7t//9k=",
  "Reservoir Construction":
    "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAgX/xAAeEAACAgICAwAAAAAAAAAAAAABAwACESEFEhMxQv/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEf/aAAwDAQACEQMRAD8AqXaSe2dx05SiiKtOZGe9mK79xOXXwC/1JG5Jy//Z",
  "Filtration Tank Install":
    "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAWABADASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQCBQb/xAAdEAACAgIDAQAAAAAAAAAAAAABAgADBBESITET/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAASH/2gAMAwEAAhEDEQA/AHk+S3ctgGOravgMzFOYC2mJ5b6j2PcxyANwuGK/IoRGDKO5DGvsXI3vyEJKn//Z",
};

export const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    title: "Home Water System",
    description: "Estate home water system",
    image: `${IMG}/v1703179904/home_setup_l92b3l.jpg`,
    alt: "Estate home water system installation",
    status: "completed",
  },
  {
    title: "Water Reticulation",
    location: "Orange Island, Lagos",
    description: "Water reticulation network for the Orange Island estate in Lagos. Work is in progress.",
    status: "ongoing",
    video: SHOWCASE_VIDEO.src,
    poster: SHOWCASE_VIDEO.poster,
    photos: [
      {
        src: `${CLIENT_IMG}/v1792073771/IMG-20261012-WA0057_ms0q2v.jpg`,
        alt: "Water reticulation works at Orange Island, Lagos",
      },
      {
        src: `${CLIENT_IMG}/v1792073769/IMG-20261012-WA0058_t5g1uj.jpg`,
        alt: "Pipe network installation at Orange Island, Lagos",
      },
      {
        src: `${CLIENT_IMG}/v1792073768/IMG-20261012-WA0033_hxmml1.jpg`,
        alt: "Tezeon crew on the Orange Island reticulation site",
      },
    ],
  },
  {
    title: "Pipe Installation",
    description: "Plumbing and pipe installation",
    status: "coming-soon",
  },
  {
    title: "Reservoir Construction",
    description: "Reservoir and water tank construction",
    image: `${IMG}/v1703179993/tank_rqjgdq.jpg`,
    alt: "Reservoir and water tank construction",
    status: "completed",
  },
  {
    title: "Water Stanchion Setup",
    description: "Water stanchion setup",
    status: "coming-soon",
  },
  {
    title: "Filtration Tank Install",
    description: "Filtration tank installation",
    image: LOCAL_FILTRATION_TANKS,
    alt: "Industrial filtration tank installation",
    status: "completed",
  },
];

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    title: "Estate Water System",
    description: "Estate water system installation",
    categories: ["construction"],
    image: `${IMG}/v1703179904/home_setup_l92b3l.jpg`,
    alt: "Estate water system installation",
  },
  {
    title: "Borehole Drilling",
    description: "Borehole drilling and exploration",
    categories: ["drilling"],
    image: `${IMG}/v1703179926/drilling_pvs4dm.jpg`,
    alt: "Borehole drilling and exploration",
  },
  {
    title: "Pipe Installation",
    description: "Pipe installation and plumbing",
    categories: ["plumbing"],
    image: `${IMG}/v1703179957/plumbing_eiwbiz.jpg`,
    alt: "Pipe installation and plumbing work",
  },
  {
    title: "Reservoir Construction",
    description: "Reservoir and tank construction",
    categories: ["construction"],
    image: `${IMG}/v1703179993/tank_rqjgdq.jpg`,
    alt: "Reservoir and water tank construction",
  },
  {
    title: "Industrial Filtration",
    description: "Industrial water filtration",
    categories: ["filtration"],
    image: `${IMG}/v1703180023/water_installation_qiomfk.jpg`,
    alt: "Industrial water filtration system",
  },
  {
    title: "Water Stanchion Setup",
    description: "Water stanchion setup",
    categories: ["construction"],
    image: `${IMG}/v1703179979/Stansion_vjhu83.jpg`,
    alt: "Water stanchion setup for estate",
  },
  {
    title: "Water Testing",
    description: "Water quality testing on site",
    categories: ["video"],
    video: `${VID}/v1703577957/water_testing_eqqo3a.mp4`,
    poster: `${VID}/v1703577957/water_testing_eqqo3a.jpg`,
  },
  {
    title: "Project Completion",
    description: "Completed water system project",
    categories: ["video"],
    video: `${VID}/v1704281176/done_loop_fwxh3x.mp4`,
    poster: `${VID}/v1704281176/done_loop_fwxh3x.jpg`,
  },
  {
    title: "Treatment System Install",
    description: "Water treatment tank installation",
    categories: ["video"],
    video: LOCAL_SITE_VIDEO,
    poster: LOCAL_FILTRATION_TANKS,
  },
  {
    title: "Filtration Tank Install",
    description: "Filtration tank installation",
    categories: ["filtration"],
    image: LOCAL_FILTRATION_TANKS,
    alt: "Industrial filtration tank installation",
  },
  {
    title: "Cylinder Filtration Unit",
    description: "Cylinder filtration unit",
    categories: ["filtration"],
    image: `${IMG}/v1781027143/picure_loading_cylinder_ymdpre.jpg`,
    alt: "Cylinder filtration unit loading",
  },
  {
    title: "Site Works",
    description: "Water engineering site works",
    categories: ["construction"],
    image: `${IMG}/v1781027129/working_picture_g0iwy5.jpg`,
    alt: "Water engineering site works in progress",
  },
  {
    title: "Field Project",
    description: "Water engineering field project",
    categories: ["drilling"],
    image: `${IMG}/v1780764233/image_1_icoaik.jpg`,
    alt: "Water engineering field project",
  },
];

/* --------------------------------------------------------------------------
 * Footer content
 * ------------------------------------------------------------------------ */

export const FOOTER_SERVICE_AREAS: readonly NavLinkItem[] = [
  { label: "Water exploration and borehole installation", href: "/services" },
  { label: "Treatment plant management", href: "/services" },
  { label: "Home & Estate piping/plumbing", href: "/services" },
  { label: "Sewage management", href: "/services" },
  { label: "Factory setup & swimming pool design", href: "/services" },
];

export const FOOTER_PAGES: readonly NavLinkItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonial", href: "/#testimonial" },
];

export const FOOTER_MENU: readonly NavLinkItem[] = [
  { label: "Terms of use", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Help", href: "/contact" },
  { label: "FQAs", href: "/#faqs" },
];

export const FOOTER_SOCIALS: readonly SocialLink[] = [
  { platform: "twitter", href: "#" },
  { platform: "facebook", href: "#" },
  { platform: "youtube", href: "#" },
  { platform: "instagram", href: "#" },
  { platform: "linkedin", href: "#" },
];

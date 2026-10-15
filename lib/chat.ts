import { COMPANY, SERVICES, SHOWCASE_VIDEO, TEAM_MEMBERS } from "@/lib/data";
import type { ChatAdapter } from "@/types";

/** Opening message (legacy chatbot.js). */
export const CHAT_GREETING =
  "Hi! I'm Teza 💧 — Tezeon's water assistant. Ask me about boreholes, water treatment, plumbing systems, or how we can serve your project.";

/** One-tap questions offered under the conversation. */
export const CHAT_SUGGESTIONS = [
  "Get a free quote",
  "What services do you offer?",
  "Tell me about your ongoing project",
  "What are your opening hours?",
  "How do I contact you?",
] as const;

const FALLBACK =
  "Thanks for reaching out. For anything I can't answer here, our team is available on " +
  `${COMPANY.phone} or ${COMPANY.email} — or ask for a free quote on WhatsApp: ${COMPANY.whatsappUrl}`;

const SERVICE_LIST = SERVICES.map((service) => service.title.toLowerCase()).join(", ");

const ENGINEERS = TEAM_MEMBERS.filter((member) => member.socials)
  .map((member) => `${member.name} (${member.role})`)
  .join(", ");

/**
 * Ordered keyword rules for the built-in response engine. Every reply is
 * derived from verified company data in `lib/data.ts` — nothing is invented.
 * Patterns use word boundaries so e.g. "this" never matches the greeting.
 */
const RULES: readonly { pattern: RegExp; reply: string }[] = [
  {
    pattern: /\b(quote|price|pricing|cost|budget|how much)\b/i,
    reply: `You can get a free quote instantly on WhatsApp — ${COMPANY.whatsappUrl} — or by calling ${COMPANY.phone}. We respond during business hours: ${COMPANY.openingHours}.`,
  },
  {
    pattern: /\b(ongoing|current|orange island|reticulation)\b/i,
    reply: `Our current project is ${SHOWCASE_VIDEO.title}: a water reticulation network for the estate. You can watch footage and see site photos on the Projects page.`,
  },
  {
    pattern: /\b(services?|offer|filtration|drilling|borehole|plumb\w*|reservoir|sewage|stanchion|treatment)\b/i,
    reply: `Our services include ${SERVICE_LIST}, plus treatment-plant management, sewage management and factory/pool water design — delivered across Nigeria.`,
  },
  {
    pattern: /\b(projects?|portfolio|completed|gallery|past work)\b/i,
    reply:
      "Our portfolio covers estate water systems, reservoir construction, filtration tank installs and more. See completed, ongoing and upcoming work on the Projects page, or browse photos in the Gallery.",
  },
  {
    pattern: /\b(team|engineers?|staff|workers?)\b/i,
    reply: `Our engineering team includes ${ENGINEERS}, supported by 20 field experts — water engineers, geologists and technicians.`,
  },
  {
    pattern: /\b(hours?|open|opening|closing|time)\b/i,
    reply: "We're open Monday to Friday, 8:00 am – 9:00 pm. Message us on WhatsApp any time and we'll reply during those hours.",
  },
  {
    pattern: /\b(contact|email|phone|call|address|location|where|office)\b/i,
    reply: `Reach us at ${COMPANY.email} or ${COMPANY.phone}. Our office is at ${COMPANY.addressLine}.`,
  },
  {
    pattern: /\b(hi|hello|hey|good (morning|afternoon|evening))\b/i,
    reply: CHAT_GREETING,
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Default in-browser response engine. The `send` latency doubles as the
 * typing indicator's duration. To connect a real LLM or webhook, implement
 * `ChatAdapter` and pass it to `<Chatbot adapter={...} />` — the UI is unchanged.
 */
export const localChatAdapter: ChatAdapter = {
  async send(message: string): Promise<string> {
    await delay(650 + Math.random() * 550);
    const rule = RULES.find((candidate) => candidate.pattern.test(message));
    return rule ? rule.reply : FALLBACK;
  },
};

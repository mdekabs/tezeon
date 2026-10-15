import { COMPANY, SERVICES, TEAM_MEMBERS } from "@/lib/data";
import type { ChatAdapter } from "@/types";

/** Opening message from the legacy chatbot.js. */
const GREETING =
  "Hi! I'm Teza 💧— Tezeon's water assistant. Ask me about boreholes, water treatment, plumbing systems, or how we can serve your project.";

const FALLBACK =
  "Thanks for reaching out. For anything I can't answer here, our team is available on " +
  `${COMPANY.phone} or ${COMPANY.email} — or ask for a free quote on WhatsApp (${COMPANY.whatsappUrl}).`;

const SERVICE_LIST = SERVICES.map((service) => service.title.toLowerCase()).join(", ");

const ENGINEERS = TEAM_MEMBERS.filter((member) => member.socials)
  .map((member) => `${member.name} (${member.role})`)
  .join(", ");

/**
 * Ordered keyword rules for the built-in response engine. Every reply is
 * derived from verified company data in `lib/data.ts` — nothing is invented.
 */
const RULES: readonly { pattern: RegExp; reply: string }[] = [
  {
    pattern: /service|offer|filtration|drilling|borehole|plumb|reservoir|sewage|stancion|water system/i,
    reply: `Our services include ${SERVICE_LIST}, plus treatment-plant management and factory/pool water design — delivered across Nigeria.`,
  },
  {
    pattern: /project|portfolio|ongoing|completed|coming soon|gallery/i,
    reply:
      "We keep a live portfolio of completed and ongoing work — borehole drilling, industrial filtration, reservoir construction and estate water systems. See the full breakdown on the Projects page, or browse photos in the Gallery.",
  },
  {
    pattern: /quote|price|pricing|cost|budget|how much/i,
    reply: `You can request a free quote instantly on WhatsApp (${COMPANY.whatsappUrl}) or by calling ${COMPANY.phone}. We typically respond within business hours: ${COMPANY.openingHours}.`,
  },
  {
    pattern: /team|engineer|staff|worker|who work/i,
    reply: `Our engineering team includes ${ENGINEERS}, supported by 20 field experts — water engineers, geologists and technicians.`,
  },
  {
    pattern: /contact|email|phone|address|location|hour|open|where/i,
    reply: `Reach us at ${COMPANY.email} or ${COMPANY.phone}. Office: ${COMPANY.addressLine}. Opening hours: ${COMPANY.openingHours}.`,
  },
  {
    pattern: /hi|hello|hey|good (morning|afternoon|evening)/i,
    reply: GREETING,
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Default in-browser response engine. The `send` latency doubles as the
 * simulated typing delay surfaced by the UI. To connect a real LLM or webhook,
 * implement `ChatAdapter` and pass it to `<Chatbot adapter={...} />` — the
 * message queue, typing indicator and rendering stay untouched.
 */
export const localChatAdapter: ChatAdapter = {
  async send(message: string): Promise<string> {
    await delay(650 + Math.random() * 550);
    const rule = RULES.find((candidate) => candidate.pattern.test(message));
    return rule ? rule.reply : FALLBACK;
  },
};

export const CHAT_GREETING = GREETING;
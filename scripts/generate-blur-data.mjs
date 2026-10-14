// One-off generator: computes tiny JPEG blurDataURLs for the portfolio images.
// Kept out of the app bundle; run manually when project imagery changes:
//   node scripts/generate-blur-data.mjs
import { createReadStream } from "node:fs";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { buffer } from "node:stream/consumers";

const root = process.cwd();
const pnpmDir = join(root, "node_modules", ".pnpm");
const sharpEntry = readdirSync(pnpmDir).find((entry) => entry.startsWith("sharp@"));
if (!sharpEntry) {
  console.error("sharp not found in node_modules/.pnpm");
  process.exit(1);
}
const sharpLib = pathToFileURL(
  join(pnpmDir, sharpEntry, "node_modules", "sharp", "dist", "index.mjs"),
).href;
const sharp = (await import(sharpLib)).default;

const IMG = "https://res.cloudinary.com/dxd3nmbag/image/upload";
const targets = [
  ["Home Water System", `${IMG}/v1703179904/home_setup_l92b3l.jpg`],
  ["Borehole Drilling", `${IMG}/v1703179926/drilling_pvs4dm.jpg`],
  ["Pipe Installation", `${IMG}/v1703179957/plumbing_eiwbiz.jpg`],
  ["Reservoir Construction", `${IMG}/v1703179993/tank_rqjgdq.jpg`],
  ["Industrial Filtration", `${IMG}/v1703180023/water_installation_qiomfk.jpg`],
  ["Water Stanchion Setup", `${IMG}/v1703179979/Stansion_vjhu83.jpg`],
  ["Filtration Tank Install", "./public/assets/filtration-tanks.png"],
];

for (const [title, source] of targets) {
  try {
    const input = source.startsWith("http")
      ? await (await fetch(source)).arrayBuffer()
      : await buffer(createReadStream(join(root, source)));
    const base64 = await sharp(Buffer.from(input))
      .resize(16)
      .blur(1.5)
      .jpeg({ quality: 40 })
      .toBuffer()
      .then((buf) => `data:image/jpeg;base64,${buf.toString("base64")}`);
    console.log(`| ${JSON.stringify(title)} |`);
    console.log(base64);
  } catch (error) {
    console.error(`FAILED ${title}: ${error.message}`);
  }
}

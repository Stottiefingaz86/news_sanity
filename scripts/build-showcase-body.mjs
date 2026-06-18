import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = dirname(fileURLToPath(import.meta.url));
const parts = JSON.parse(readFileSync(join(dir, "seed-sanity-body.json"), "utf8"));
const body = Object.values(parts);

writeFileSync(join(dir, "showcase-body.json"), JSON.stringify(body, null, 2));
console.log(`Wrote ${body.length} blocks`);

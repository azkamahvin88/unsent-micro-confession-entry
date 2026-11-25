// Unsent: The Micro-Confession Sprint — make.fun entry (program/v1, Node 22+).
// Writes exactly two lines to /output/entry.txt: a "To:" line naming who the
// confession was meant for, and the unsent message itself, one line written
// exactly as it was typed, with no explanation after it. Deterministic, no
// network, no model calls. The entry is a fixed constant chosen by the author.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a childhood best friend, drifted apart. The bracelet half is
// still kept; every birthday the message is typed, then deleted before send —
// the most literal kind of unsent. "Press send" keeps the wording exactly as
// typed on a phone keyboard: a thumb hovering, then backspace.
const TO_LINE = "To: my childhood best friend";
const MESSAGE =
  "I still have your half of the friendship bracelet in my drawer, and every birthday I type 'happy birthday' and delete it before I press send.";

const ENTRY = `${TO_LINE}\n${MESSAGE}`;

// Guard: the brief demands exactly two parts — a To: line plus one message
// line, no explanation after it. Fail loudly rather than writing an
// invalid entry.
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`ENTRY must be exactly 2 lines; got ${lines.length}.`);
}
if (!lines[0].startsWith("To: ")) {
  throw new Error("First line must be a 'To: ...' line.");
}
if (lines[1].trim().length === 0) {
  throw new Error("Message line must not be empty.");
}
if ([...ENTRY].length > 400) {
  throw new Error(`ENTRY is ${[...ENTRY].length} characters; must be at most 400.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(`Wrote ${lines.length} lines (${[...ENTRY].length} characters) to ${outFile}`);

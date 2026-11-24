// Two-Sentence Horror — make.fun entry u-suroto-two-sentence-horror-acea9253
// Node 22, no dependencies. Writes one original two-sentence horror story
// (<= 400 characters) to /output/entry.txt in the grading sandbox,
// falling back to ./output/entry.txt when run locally.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const STORY =
  "My new house came with a mirror that shows the room exactly as it is, except the reflection is always three seconds behind me. " +
  "This morning my reflection was still asleep in bed when I walked past — and then it opened its eyes.";

function countSentences(text: string): number {
  // Count sentence-ending punctuation followed by a space or the end of text.
  const matches = text.match(/[.!?]+(?=\s|$)/g);
  return matches ? matches.length : 0;
}

function main(): void {
  if (!STORY.trim()) {
    throw new Error("Refusing to write a blank entry.");
  }
  if (STORY.length > 400) {
    throw new Error(`Refusing to write an over-limit entry (${STORY.length} characters).`);
  }
  if (countSentences(STORY) !== 2) {
    throw new Error(
      `Refusing to write an entry that is not exactly two sentences (found ${countSentences(STORY)}).`,
    );
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  let outPath = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, STORY, "utf8");
  } catch {
    // Fallback for local runs where /output is not writable.
    const localDir = join(dirname(fileURLToPath(import.meta.url)), "output");
    mkdirSync(localDir, { recursive: true });
    outPath = join(localDir, "entry.txt");
    writeFileSync(outPath, STORY, "utf8");
  }
  console.log(`Wrote ${STORY.length} characters to ${outPath}`);
}

main();

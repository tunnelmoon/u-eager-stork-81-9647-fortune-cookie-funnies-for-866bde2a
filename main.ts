import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You will find the bug in the line you swore you already checked. Twice.";

if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`line must be 1-120 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt read-back does not match the validated line");
}

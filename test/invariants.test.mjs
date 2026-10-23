import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, "../src/components");

/**
 * Recursively retrieves all .tsx files from a directory.
 */
function getAllTsxFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllTsxFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

const HEX_REGEX = /#([0-9a-fA-F]{3,8})\b/g;

console.log("🔍 Running Terra Dusk Invariant Verification: Zero Hardcoded Hex Codes...");
const tsxFiles = getAllTsxFiles(componentsDir);

let violations = 0;

for (const file of tsxFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Exclude comments if any
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
      return;
    }

    const matches = line.match(HEX_REGEX);
    if (matches) {
      console.error(
        `❌ Invariant Violation in ${path.relative(process.cwd(), file)}:${index + 1}`
      );
      console.error(`   Found hex code(s): ${matches.join(", ")}`);
      console.error(`   Line: ${line.trim()}`);
      violations += matches.length;
    }
  });
}

if (violations > 0) {
  console.error(`\n🚨 Failed: Found ${violations} hardcoded hex code(s) in src/components/!`);
  console.error("All colors must use Tailwind theme classes (e.g. text-terracotta-base, bg-dusk-abyss).");
  process.exit(1);
} else {
  console.log(`\n✅ Passed: All ${tsxFiles.length} component files adhere to zero hardcoded hex invariants.`);
  process.exit(0);
}

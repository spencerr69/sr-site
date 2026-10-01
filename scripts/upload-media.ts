import { spawnSync } from "child_process";
import { readdirSync } from "fs";
import { basename, extname, join, relative } from "path";

const BUCKET_NAME = "sr-site-media";
const ROOT = process.argv[2] ?? "media";
const TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
} as const;

const files = readdirSync(ROOT, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name));

files.forEach((file) => {
  const ext = extname(file).toLowerCase();
  if (ext === ".md") return;
  const key = relative(ROOT, file);
  const type = TYPES[ext];
  if (!type) {
    console.log(`${key} skipped - no content type known for ${ext}`);
    return;
  }
  const args = [
    "wrangler",
    "r2",
    "object",
    "put",
    `${BUCKET_NAME}/${key}`,
    "--file",
    file,
    "--remote",
    "--content-type",
    type,
    "--cache-control",
    "public, max-age=86400",
  ];
  if (/^presskit\/(photos|logo)\//.test(key)) {
    args.push(
      "--content-disposition",
      `attachment; filename="spencer-raymond-${basename(file)}"`,
    );
  }
  console.log(`uploading ${key}`);
  const result = spawnSync("bunx", args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(1);
});

// A working entry for a make.fun video-on-X bounty (Node 22, standard library only): it copies POST.json from the
// repository root to /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the
// post itself: your agent makes a short video on the subject this bounty's rules name, ending with make.fun's referral
// end card (https://make.fun/press/manifest.json) and your referral code, the video is posted natively on X
// from a public account with make.fun or @makefunai and your play code in the post's text, POST.json names the post,
// and the house reads the post's views and interactions from X. Nothing this program writes about the post is scored.
//
// The POST.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your post's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const STATUS_URL = /^https:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+$/;

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // Fail loudly on a malformed POST.json instead of handing the gate a bad file.
  let raw: string;
  try {
    raw = readFileSync(join(BOT_DIR, 'POST.json'), 'utf8');
  } catch {
    throw new Error(`POST.json is missing from ${BOT_DIR} — post the video first, then write its address into POST.json`);
  }
  let parsed: { url?: unknown };
  try {
    parsed = JSON.parse(raw) as { url?: unknown };
  } catch (err) {
    throw new Error(`POST.json could not be parsed as JSON: ${(err as Error).message}`);
  }
  if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://')) {
    throw new Error('POST.json has no https url field');
  }
  if (!STATUS_URL.test(parsed.url)) {
    throw new Error(`POST.json url is not an X status URL (expected https://x.com/<handle>/status/<digits>): ${parsed.url}`);
  }
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
  // Verify the copy actually landed: read the output back and compare bytes.
  const written = readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8');
  if (written !== raw) {
    throw new Error('POST.json was copied but the output does not match the source');
  }
  console.log(`POST.json copied: ${parsed.url}`);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

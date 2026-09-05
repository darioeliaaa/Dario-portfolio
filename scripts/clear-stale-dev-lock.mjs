/**
 * Next 16 writes `.next/dev/lock` with the PID of the running dev server. If
 * that process dies without cleaning up (crash, `kill -9`, laptop sleep), the
 * next `next dev` waits on the lock **forever and prints nothing** — it looks
 * exactly like an infinite compile.
 *
 * This runs as `predev` and removes the lock only when the PID it names is no
 * longer alive, so a genuinely running second dev server is never disturbed.
 */
import { existsSync, readFileSync, rmSync } from "node:fs";

const LOCK = ".next/dev/lock";

if (existsSync(LOCK)) {
  let pid;
  try {
    pid = JSON.parse(readFileSync(LOCK, "utf8")).pid;
  } catch {
    /* unreadable/corrupt lock — treat it as stale */
  }

  const alive = (() => {
    if (typeof pid !== "number") return false;
    try {
      // Signal 0 doesn't kill; it just probes whether the process exists.
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  })();

  if (!alive) {
    rmSync(LOCK, { force: true });
    console.log(`[predev] Rimosso lock stantio ${LOCK} (pid ${pid ?? "?"}).`);
  }
}

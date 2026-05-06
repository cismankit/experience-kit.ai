const base = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const routes = ["/", "/onboarding", "/find-my-kit", "/missions", "/support", "/platform"];

async function check(url) {
  const res = await fetch(url, { redirect: "manual" });
  return { url, ok: res.status < 500, status: res.status };
}

async function main() {
  const results = await Promise.all(routes.map((r) => check(`${base}${r}`)));
  const failures = results.filter((r) => !r.ok);

  for (const r of results) {
    console.log(`${r.status} ${r.url}`);
  }

  if (failures.length > 0) {
    console.error("Smoke journey failed on routes:");
    for (const f of failures) console.error(`- ${f.status} ${f.url}`);
    process.exit(1);
  }

  console.log("Smoke journey passed.");
}

main().catch((err) => {
  console.error("Smoke journey crashed:", err);
  process.exit(1);
});


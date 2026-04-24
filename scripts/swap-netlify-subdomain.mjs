import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const oldId = "37ccfdff-dd39-45fe-acaf-ecd80068c9ac";
const newId = "6ed50f8b-df29-429e-add8-1fc5151403e3";

const cfgPath = path.join(os.homedir(), "AppData", "Roaming", "netlify", "Config", "config.json");
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
const token = cfg.users?.[cfg.userId]?.auth?.token;
if (!token) throw new Error("Netlify token bulunamadı");

async function patch(id, body) {
  const res = await fetch(`https://api.netlify.com/api/v1/sites/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${id} -> ${res.status} ${text}`);
  return JSON.parse(text);
}

const archived = `antepfistigisaid-arsiv-${Date.now().toString().slice(-6)}`;
console.log("Renaming old site to", archived);
await patch(oldId, { name: archived });
console.log("Old site renamed");

console.log("Renaming new site to antepfistigisaid");
await patch(newId, { name: "antepfistigisaid" });
console.log("New site now uses antepfistigisaid");

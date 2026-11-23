// Společné funkce pro e-maily z functions/api/*.

export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const addresses = (env: Env) => ({
  to: env.CONTACT_TO_EMAIL || "nutrisniky@seznam.cz",
  sender: env.CONTACT_FROM_EMAIL || "Nutrisniky <onboarding@resend.dev>",
});

export async function sendEmail(env: Env, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 16px 6px 0;color:#7a5a43;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#33261b;font-size:15px;font-weight:600">${value}</td></tr>`;

export const shell = (inner: string, heading = "DÁRKOVÝ POUKAZ · NUTRISNIKY") => `<!doctype html><html lang="cs"><body style="margin:0;background:#f4eee6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#33261b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#faf6ef;border-radius:20px;overflow:hidden">
<tr><td style="padding:32px 32px 8px"><p style="margin:0;letter-spacing:3px;font-size:12px;font-weight:700;color:#7a5a43">${heading}</p></td></tr>
<tr><td style="padding:8px 32px 32px">${inner}</td></tr>
<tr><td style="padding:20px 32px;background:#e9ddd2;font-size:12px;color:#7a5a43;line-height:1.6">Nutrisniky · Mgr. Nicola Zounková · IČO 221 51 290 · Poliklinika Tišnov, nám. Míru 24, 666 01 Tišnov<br>722 671 187 · nutrisniky@seznam.cz · www.nutrisniky.cz</td></tr>
</table></td></tr></table></body></html>`;

export const now = () => new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague", dateStyle: "long", timeStyle: "medium" });

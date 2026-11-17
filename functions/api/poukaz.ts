// Cloudflare Pages Function: POST /api/poukaz
// 1) pošle Nikole e-mail s objednávkou poukazu (odpovědí se dostane rovnou k zákazníkovi)
// 2) pošle zákazníkovi poděkování a QR kód k platbě (hotový obrázek z public/poukazy/)
// Platbu Nikola zkontroluje na účtu a poukaz pošle ručně.
//
// Proměnné prostředí (Cloudflare Pages → Settings → Variables and Secrets):
//   RESEND_API_KEY      – API klíč z resend.com (jako Secret)
//   CONTACT_TO_EMAIL    – kam chodí objednávky (výchozí nutrisniky@seznam.cz)
//   CONTACT_FROM_EMAIL  – odesílatel na ověřené doméně v Resend, např. "Nutrisniky <poukazy@nutrisniky.cz>"

import { vouchers, formatCzk } from "../../src/data/vouchers";

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(env: Env, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 16px 6px 0;color:#7a5a43;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#33261b;font-size:15px;font-weight:600">${value}</td></tr>`;

const shell = (inner: string) => `<!doctype html><html lang="cs"><body style="margin:0;background:#f4eee6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#33261b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#faf6ef;border-radius:20px;overflow:hidden">
<tr><td style="padding:32px 32px 8px"><p style="margin:0;letter-spacing:3px;font-size:12px;font-weight:700;color:#7a5a43">DÁRKOVÝ POUKAZ · NUTRISNIKY</p></td></tr>
<tr><td style="padding:8px 32px 32px">${inner}</td></tr>
<tr><td style="padding:20px 32px;background:#e9ddd2;font-size:12px;color:#7a5a43;line-height:1.6">Nutrisniky · Mgr. Nicola Zounková · Poliklinika Tišnov, nám. Míru 24, 666 01 Tišnov<br>722 671 187 · nutrisniky@seznam.cz · www.nutrisniky.cz</td></tr>
</table></td></tr></table></body></html>`;

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Neplatný požadavek." }, 400);
  }

  // honeypot proti spamu
  if (str(body.company, 100)) return json({ ok: true });

  const voucher = vouchers.find((v) => v.id === body.voucherId);
  const name = str(body.name, 100);
  const email = str(body.email, 255);
  const phone = str(body.phone, 30);
  const recipient = str(body.recipient, 100);
  const from = str(body.from, 100);
  const note = str(body.note, 1000);

  if (!voucher) return json({ error: "Vyberte prosím poukaz." }, 400);
  if (!name) return json({ error: "Zadejte jméno." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Neplatný e-mail." }, 400);

  if (!env.RESEND_API_KEY) {
    console.error("Chybí RESEND_API_KEY");
    return json({ error: "Objednávku se teď nepodařilo odeslat. Napište mi prosím na nutrisniky@seznam.cz." }, 500);
  }

  const to = env.CONTACT_TO_EMAIL || "nutrisniky@seznam.cz";
  const sender = env.CONTACT_FROM_EMAIL || "Nutrisniky <onboarding@resend.dev>";
  const qrUrl = new URL(voucher.qr, request.url).toString();
  const voucherLabel = `${formatCzk(voucher.price)} — ${voucher.title}`;

  const voucherRows =
    row("Poukaz", esc(voucherLabel)) +
    (recipient ? row("Pro (na poukaz)", esc(recipient)) : "") +
    (from ? row("Od (na poukaz)", esc(from)) : "");

  const ownerHtml = shell(`
    <h1 style="margin:0 0 16px;font-size:24px">Nová objednávka poukazu</h1>
    <table role="presentation" cellpadding="0" cellspacing="0">${voucherRows}
      ${row("Objednává", esc(name))}
      ${row("E-mail", `<a href="mailto:${esc(email)}" style="color:#2a9d96">${esc(email)}</a>`)}
      ${phone ? row("Telefon", esc(phone)) : ""}
      ${note ? row("Požadavky", esc(note).replace(/\n/g, "<br>")) : ""}
    </table>
    <p style="margin:24px 0 0;font-size:14px;line-height:1.6">Zákazníkovi odešel QR kód k platbě ${formatCzk(voucher.price)}. Až platba dorazí na účet, stačí na tento e-mail odpovědět a poukaz přiložit.</p>`);

  const customerHtml = shell(`
    <h1 style="margin:0 0 12px;font-size:24px">Děkuji za objednávku!</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6">Dobrý den,<br>děkuji za objednávku dárkového poukazu. K platbě stačí naskenovat QR kód níže v bankovní aplikaci. Jakmile mi platba dorazí na účet, pošlu vám poukaz e-mailem.</p>
    <table role="presentation" cellpadding="0" cellspacing="0">${voucherRows}</table>
    <div style="margin:24px 0 8px;text-align:center"><img src="${qrUrl}" width="240" alt="QR kód k platbě ${formatCzk(voucher.price)}" style="max-width:240px;border-radius:16px;background:#fff;padding:8px"></div>
    <p style="margin:0;text-align:center;font-size:13px;color:#7a5a43">QR platba · ${formatCzk(voucher.price)}</p>
    <p style="margin:24px 0 0;font-size:14px;line-height:1.6">Máte dotaz? Stačí odpovědět na tento e-mail nebo zavolat na 722 671 187.<br><br>Nicola Zounková<br>Nutrisniky</p>`);

  try {
    await sendEmail(env, {
      from: sender,
      to: [to],
      reply_to: email,
      subject: `Objednávka poukazu ${formatCzk(voucher.price)} — ${name}`,
      html: ownerHtml,
    });
  } catch (err) {
    console.error(err);
    return json({ error: "Objednávku se nepodařilo odeslat. Zkuste to prosím znovu, nebo mi napište na nutrisniky@seznam.cz." }, 502);
  }

  // Objednávka už dorazila Nikole; když selže jen e-mail zákazníkovi, QR kód se ukáže aspoň na webu.
  let emailSent = true;
  try {
    await sendEmail(env, {
      from: sender,
      to: [email],
      reply_to: to,
      subject: "Děkuji za objednávku dárkového poukazu — Nutrisniky",
      html: customerHtml,
      attachments: [{ path: qrUrl, filename: `qr-platba-${voucher.price}-kc.png` }],
    });
  } catch (err) {
    console.error(err);
    emailSent = false;
  }

  return json({ ok: true, emailSent });
}

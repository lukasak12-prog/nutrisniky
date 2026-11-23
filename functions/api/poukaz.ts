// Cloudflare Pages Function: POST /api/poukaz
// 1) pošle Nikole e-mail s objednávkou poukazu (odpovědí se dostane rovnou k zákazníkovi)
// 2) pošle zákazníkovi poděkování a QR kód k platbě (hotový obrázek z public/platba/)
// Platbu Nikola zkontroluje na účtu a poukaz pošle ručně.
//
// Proměnné prostředí (Cloudflare Pages → Settings → Variables and Secrets):
//   RESEND_API_KEY      – API klíč z resend.com (jako Secret)
//   CONTACT_TO_EMAIL    – kam chodí objednávky (výchozí nutrisniky@seznam.cz)
//   CONTACT_FROM_EMAIL  – odesílatel na ověřené doméně v Resend, např. "Nutrisniky <poukazy@nutrisniky.cz>"

import { vouchers, formatCzk } from "../../src/data/vouchers";
import { plain, seller, terms, VOUCHER_VALIDITY, withdrawalForm, WITHDRAWAL_URL } from "../../src/data/legal";
import { addresses, esc, isEmail, json, row, sendEmail, shell, str, type Env } from "../../src/server/email";

const p = (text: string) => `<p style="margin:0 0 8px;font-size:12px;line-height:1.6">${esc(plain(text))}</p>`;

/** Celé podmínky v textu e-mailu: zákon chce smlouvu a podmínky v textové podobě, odkaz nestačí. */
const termsHtml = () => `
  <h2 style="margin:32px 0 8px;padding-top:24px;border-top:1px solid #d8c7b8;font-size:17px">Obchodní podmínky</h2>
  ${p(seller.map(([k, val]) => `${k}: ${val}`).join(" · "))}
  ${terms.map((t) => `<h3 style="margin:16px 0 6px;font-size:13px">${esc(t.title)}</h3>${t.body.flat().map(p).join("")}`).join("")}
  <h3 style="margin:16px 0 6px;font-size:13px">Vzorový formulář pro odstoupení od smlouvy</h3>
  ${withdrawalForm.map(p).join("")}`;

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
  if (!isEmail(email)) return json({ error: "Neplatný e-mail." }, 400);

  if (!env.RESEND_API_KEY) {
    console.error("Chybí RESEND_API_KEY");
    return json({ error: "Objednávku se teď nepodařilo odeslat. Napište mi prosím na nutrisniky@seznam.cz." }, 500);
  }

  const { to, sender } = addresses(env);
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
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6">Dobrý den,<br>potvrzuji přijetí objednávky dárkového poukazu. K platbě stačí naskenovat QR kód níže v bankovní aplikaci. Jakmile mi platba dorazí na účet, pošlu vám poukaz e-mailem.</p>
    <table role="presentation" cellpadding="0" cellspacing="0">${voucherRows}
      ${row("Celkem k úhradě", formatCzk(voucher.price))}
      ${row("Platnost poukazu", esc(`${plain(VOUCHER_VALIDITY)} od vystavení`))}
    </table>
    <div style="margin:24px 0 8px;text-align:center"><img src="${qrUrl}" width="240" alt="QR kód k platbě ${formatCzk(voucher.price)}" style="max-width:240px;border-radius:16px;background:#fff;padding:8px"></div>
    <p style="margin:0;text-align:center;font-size:13px;color:#7a5a43">QR platba · ${formatCzk(voucher.price)}</p>
    <p style="margin:24px 0 0;font-size:14px;line-height:1.6">Máte dotaz? Stačí odpovědět na tento e-mail nebo zavolat na 722 671 187. Od smlouvy můžete do 14 dnů odstoupit na <a href="${WITHDRAWAL_URL}" style="color:#2a9d96">nutrisniky.cz/odstoupeni-od-smlouvy</a>.<br><br>Nicola Zounková<br>Nutrisniky</p>
    ${termsHtml()}`);

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
      subject: "Potvrzení objednávky dárkového poukazu, Nutrisniky",
      html: customerHtml,
      attachments: [{ path: qrUrl, filename: `qr-platba-${voucher.price}-kc.png` }],
    });
  } catch (err) {
    console.error(err);
    emailSent = false;
  }

  return json({ ok: true, emailSent });
}

// Cloudflare Pages Function: POST /api/odstoupeni
// Odstoupení od smlouvy: pošle ho Nikole a zákazníkovi vrátí potvrzení s obsahem, datem a časem.

import { addresses, esc, isEmail, json, now, row, sendEmail, shell, str, type Env } from "../../src/server/email";

const FAIL = "Odstoupení se nepodařilo odeslat. Pošlete ho prosím na nutrisniky@seznam.cz.";

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Neplatný požadavek." }, 400);
  }

  const sentAt = now();
  if (str(body.company, 100)) return json({ ok: true, sentAt, emailSent: true });

  const name = str(body.name, 100);
  const email = str(body.email, 255);
  const order = str(body.order, 300);
  if (!name) return json({ error: "Zadejte jméno." }, 400);
  if (!isEmail(email)) return json({ error: "Neplatný e-mail." }, 400);
  if (!order) return json({ error: "Uveďte, o kterou objednávku jde." }, 400);
  if (!env.RESEND_API_KEY) {
    console.error("Chybí RESEND_API_KEY");
    return json({ error: FAIL }, 500);
  }

  const { to, sender } = addresses(env);
  const details = `<table role="presentation" cellpadding="0" cellspacing="0">
    ${row("Jméno", esc(name))}${row("E-mail", esc(email))}${row("Objednávka", esc(order))}${row("Odesláno", esc(sentAt))}</table>`;

  try {
    await sendEmail(env, {
      from: sender,
      to: [to],
      reply_to: email,
      subject: `Odstoupení od smlouvy: ${name}`,
      html: shell(
        `<h1 style="margin:0 0 16px;font-size:24px">Odstoupení od smlouvy</h1><p style="line-height:1.6">Zákazník odstupuje od smlouvy na dárkový poukaz.</p>${details}<p style="margin:24px 0 0;font-size:14px;line-height:1.6">Pokud je odstoupení včasné, peníze se vracejí do 14 dnů. Číslo účtu si případně vyžádejte odpovědí na tento e-mail.</p>`,
        "ODSTOUPENÍ OD SMLOUVY · NUTRISNIKY",
      ),
    });
  } catch (err) {
    console.error(err);
    return json({ error: FAIL }, 502);
  }

  let emailSent = true;
  try {
    await sendEmail(env, {
      from: sender,
      to: [email],
      reply_to: to,
      subject: "Potvrzení o přijetí odstoupení od smlouvy, Nutrisniky",
      html: shell(
        `<h1 style="margin:0 0 16px;font-size:24px">Odstoupení jsem přijala</h1><p style="line-height:1.6">Dobrý den,<br>potvrzuji přijetí tohoto prohlášení:</p><p style="line-height:1.6"><b>Odstupuji od smlouvy na dárkový poukaz.</b></p>${details}<p style="margin:24px 0 0;font-size:14px;line-height:1.6">Tento e-mail potvrzuje přijetí a obsah prohlášení, ne jeho posouzení. Ozvu se vám k vrácení peněz.<br><br>Nicola Zounková<br>Nutrisniky</p>`,
        "ODSTOUPENÍ OD SMLOUVY · NUTRISNIKY",
      ),
    });
  } catch (err) {
    console.error(err);
    emailSent = false;
  }

  return json({ ok: true, sentAt, emailSent });
}

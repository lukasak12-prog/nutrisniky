// Cloudflare Pages Function: POST /api/kontakt
// Zprávu z kontaktního formuláře pošle Nikole; odpověď na e-mail jde rovnou odesílateli.

import { addresses, esc, isEmail, json, row, sendEmail, shell, str, type Env } from "../../src/server/email";

const FAIL = "Nepodařilo se odeslat zprávu. Napište mi prosím na nutrisniky@seznam.cz.";

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Neplatný požadavek." }, 400);
  }

  // honeypot proti spamu
  if (str(body.company, 100)) return json({ ok: true });

  const name = str(body.name, 100);
  const email = str(body.email, 255);
  const phone = str(body.phone, 30);
  const message = str(body.message, 1000);
  if (!name) return json({ error: "Zadejte jméno" }, 400);
  if (!isEmail(email)) return json({ error: "Neplatný e-mail" }, 400);
  if (!env.RESEND_API_KEY) {
    console.error("Chybí RESEND_API_KEY");
    return json({ error: FAIL }, 500);
  }

  const { to, sender } = addresses(env);
  try {
    await sendEmail(env, {
      from: sender,
      to: [to],
      reply_to: email,
      subject: `Zpráva z webu: ${name.replace(/\s+/g, " ")}`,
      html: shell(
        `<h1 style="margin:0 0 16px;font-size:24px">Zpráva z webu</h1>
        <table role="presentation" cellpadding="0" cellspacing="0">
          ${row("Jméno", esc(name))}
          ${row("E-mail", `<a href="mailto:${esc(email)}" style="color:#2a9d96">${esc(email)}</a>`)}
          ${phone ? row("Telefon", esc(phone)) : ""}
        </table>
        ${message ? `<p style="margin:20px 0 0;font-size:15px;line-height:1.6">${esc(message).replace(/\n/g, "<br>")}</p>` : ""}
        <p style="margin:24px 0 0;font-size:13px;color:#7a5a43">Odpověď na tento e-mail půjde přímo odesílateli.</p>`,
        "KONTAKTNÍ FORMULÁŘ · NUTRISNIKY",
      ),
    });
  } catch (err) {
    console.error(err);
    return json({ error: FAIL }, 502);
  }

  return json({ ok: true });
}

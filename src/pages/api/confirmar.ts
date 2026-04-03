import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false; 

export const POST: APIRoute = async ({ request }) => {
  try {
    // const { nombre, alergia, asistencia } = await request.json();
    const body = await request.json();

    console.log('BODY:', body);

    const { name, allergy, attendance, token } = body;

    // ✅ Validación Turnstile
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: import.meta.env.TURNSTILE_SECRETKEY,
        response: token,
      }),
    });
    const result = await verify.json();
    if (!result.success) {
      return new Response(JSON.stringify({ ok: false, error: "Bot detected" }), { status: 400 });
    }

    if (!name || !attendance) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const transporter = nodemailer.createTransport({
        host: import.meta.env.EMAIL_HOST,
        port: Number(import.meta.env.EMAIL_PORT) || 587,
        secure: false,          
        auth: {
            user: import.meta.env.EMAIL_USER,
            pass: import.meta.env.EMAIL_PASS,
        },
    });

    // Test para email
    // transporter.verify((error, success) => {
    //     if (error) {
    //         console.log('SMTP ERROR:', error);
    //     } else {
    //         console.log('SMTP READY');
    //     }
    // });

    await transporter.sendMail({
      from: `"Web Boda" <${import.meta.env.EMAIL_USER}>`,
      to: import.meta.env.EMAIL_TO,
      subject: `✉️ Confirmación de asistencia – ${name}`,
      html: `
        <h2>Nueva confirmación de asistencia</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Alergias:</strong> ${allergy || 'Ninguna'}</p>
        <p><strong>Asistencia:</strong> ${attendance}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('ERROR NODEMAILER:', error); 
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
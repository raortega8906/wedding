import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false; 

export const POST: APIRoute = async ({ request }) => {
  try {
    const { nombre, alergia, asistencia } = await request.json();

    if (!nombre || !asistencia) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Configura el transporte de nodemailer con tus credenciales
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.wpcache.es',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: import.meta.env.EMAIL_USER,
    //     pass: import.meta.env.EMAIL_PASS,
    //   },
    // });

    const transporter = nodemailer.createTransport({
        host: 'smtp.ionos.es',  // 👈
        port: 587,              // 👈
        secure: false,          // 👈 false para puerto 587 (STARTTLS)
        auth: {
            user: import.meta.env.EMAIL_USER,
            pass: import.meta.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
      from: `"Web Boda" <${import.meta.env.EMAIL_USER}>`,
      to: import.meta.env.EMAIL_TO,
      subject: `✉️ Confirmación de asistencia – ${nombre}`,
      html: `
        <h2>Nueva confirmación de asistencia</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Alergias:</strong> ${alergia || 'Ninguna'}</p>
        <p><strong>Asistencia:</strong> ${asistencia}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('ERROR NODEMAILER:', error); // 👈 mira la terminal
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
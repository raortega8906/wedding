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
    
    const transporter = nodemailer.createTransport({
        host: import.meta.env.EMAIL_HOST,
        port: Number(import.meta.env.EMAIL_PORT) || 587,
        secure: false,          
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
    console.error('ERROR NODEMAILER:', error); 
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
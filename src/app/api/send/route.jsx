import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
  points: 1,
  duration: 60,
});

export async function POST(req) {
  const body = await req.json();
  const mensagem = body.message;
  const senha = body.senhaApi;
  const emailUsuario = body.emailUsuario;
  const senhaCorreta = process.env.SENHA_API;

  if (senha !== senhaCorreta) {
    console.warn('Senha incorreta');
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 403 });
  }

  if (!mensagem || !emailUsuario) {
    console.warn('Dados incompletos');
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  const ip =
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    '0.0.0.0';

  try {
    await limiter.consume(ip);
  } catch {
    console.warn('Rate limit IP: ', ip);
    return NextResponse.json(
      { error: 'Aguarde alguns instantes' },
      {
        status: 429,
      },
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.EMAIL_RECEBE,
    subject: `Pedido de ${emailUsuario}`,
    text: mensagem,
  };

  await transporter.sendMail(mailOptions);

  return NextResponse.json({ success: true });
}

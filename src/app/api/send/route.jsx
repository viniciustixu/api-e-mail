import nodemailer from 'nodemailer';

export async function POST(req, res) {
  const body = await req.json();
  const mensagem = body.message;
  const senha = body.senhaApi;
  const senhaCorreta = process.env.SENHA_API;

  if (senha !== senhaCorreta) {
    return new Response('Não autorizado', { status: 403 });
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
    to: 'vinicipkt6@gmail.com',
    subject: 'Test Email',
    text: mensagem,
  };

  await transporter.sendMail(mailOptions);

  return Response.json({ success: true });
}

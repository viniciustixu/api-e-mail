'use client';

export default function SendEmailPage() {
  const conteudo = 'bulhufas';

  async function sendEmail() {
    const res = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify({
        message: conteudo,
        senhaApi: '123asc',
      }),
    });
  }

  return (
    <div>
      <button onClick={sendEmail} className='border p-2 bg-sky-300'>
        Enviar email
      </button>
    </div>
  );
}

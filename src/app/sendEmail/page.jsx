'use client';
import { useState } from 'react';

export default function SendEmailPage() {
  const [loading, setLoading] = useState(false);

  async function sendEmail(msg, pass, email) {
    setLoading(true);
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: msg,
        senhaApi: pass,
        emailUsuario: email,
      }),
    });

    setLoading(false);

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('nEmail');
    const senha = formData.get('nSenha');
    const conteudo = formData.get('nContent');

    try {
      await sendEmail(conteudo, senha, email);

      e.target.nEmail.value = '';
      e.target.nSenha.value = '';
      e.target.nContent.value = '';
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='nEmail' placeholder='Digite seu E-mail' />
        <input type='password' name='nSenha' placeholder='Senha da api' />
        <input type='text' name='nContent' placeholder='Conteudo do email' />
        <button type='submit'>Enviar pedido</button>
      </form>
      <p>{loading ? 'enviando' : ''}</p>
    </div>
  );
}

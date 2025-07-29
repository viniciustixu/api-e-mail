'use client';
import { useState } from 'react';

export default function SendEmailPage() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

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
    } else {
      setAlert('E-mail enviado com sucesso!');
      setTimeout(() => {
        setAlert('');
      }, 5000);
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
    } catch (err) {
      setAlert(err.message);

      setTimeout(() => {
        setAlert('');
      }, 5000);
    }
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-[300px]'>
        <label className='input validator'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'>
              <rect width='20' height='16' x='2' y='4' rx='2'></rect>
              <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
            </g>
          </svg>
          <input
            type='email'
            placeholder='Digite seu E-mail'
            required
            name='nEmail'
          />
        </label>

        <label className='input validator'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'>
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'>
              <path d='M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z'></path>
              <circle cx='16.5' cy='7.5' r='.5' fill='currentColor'></circle>
            </g>
          </svg>
          <input
            type='password'
            name='nSenha'
            required
            placeholder='API password'
          />
        </label>

        <textarea
          className='textarea'
          name='nContent'
          placeholder='Conteúdo'
          required></textarea>

        {loading ? (
          <button
            className='btn btn-disabled'
            tabIndex='-1'
            role='button'
            aria-disabled='true'>
            <span className='loading loading-spinner loading-md'></span>
          </button>
        ) : (
          <button type='submit' className='btn'>
            Enviar
          </button>
        )}
      </form>

      <div className='mt-4'>
        {alert == 'E-mail enviado com sucesso!' && (
          <div role='alert' className='alert alert-success'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>E-mail enviado com sucesso!</span>
          </div>
        )}

        {alert == '' && <></>}

        {alert.length > 0 && alert !== 'E-mail enviado com sucesso!' && (
          <div role='alert' className='alert alert-error'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 shrink-0 stroke-current'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{alert}</span>
          </div>
        )}
      </div>
    </div>
  );
}

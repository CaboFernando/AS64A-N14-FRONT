import React from 'react';

function BoasVindas({ className }) {
  const agora = new Date();
  const horas = agora.getHours();

  let saudacao = '';
  if (horas < 12) {
    saudacao = 'Bom dia';
  } else if (horas < 18) {
    saudacao = 'Boa tarde';
  } else {
    saudacao = 'Boa noite';
  }

  const dataFormatada = agora.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={className} style={{ marginBottom: '2rem' }}>
      <h2>{saudacao}!</h2>
      <p>Hoje é {dataFormatada}.</p>
    </section>
  );
}

export default BoasVindas;

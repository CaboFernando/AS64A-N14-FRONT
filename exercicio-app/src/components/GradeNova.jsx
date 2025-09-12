import React from 'react';

const grade_nova = {
    'Desenvolvimento Sem Código': { ch: 30 },
    'Fundamentos de Programação': { ch: 120 },
    'Lógica e Introdução à Estatística': { ch: 60 },
    'Introdução aos Sistemas Operacionais': { ch: 30 },
    'Introdução a Análise e Desenvolvimento de Sistemas': { ch: 30 },
    'Comunicação Oral e Escrita': { ch: 60 },
    'Programação Orientada a Objetos': { ch: 120 },
    'Empreendedorismo': { ch: 30 },
    'Banco de Dados': { ch: 90 },
    'Inglês Instrumental': { ch: 30 },
    'Interação Homem Computador': { ch: 30 },
    'Programação Web Front-end': { ch: 60 },
    'Programação Web Back-end': { ch: 60 },
    'Estrutura de Dados': { ch: 90 },
    'Desenvolvimento Ágil': { ch: 60 },
    'Redes de Computadores': { ch: 60 },
    'Economia': { ch: 30 },
    'Estratégias de Inovação': { ch: 30 },
    'Programação Web Fullstack': { ch: 90 },
    'Arquitetura de Software': { ch: 90 },
    'Estratégias de Programação': { ch: 90 },
    'Teste de Software': { ch: 60, r: true, op: true },
    'Computação em Nuvem': { ch: 60, r: true, op: true },
    'Programação para Dispositivos Móveis': { ch: 60, r: true, op: true },
    'Inteligência Artificial': { ch: 60, r: true, op: true },
    'Aprendizado de Máquina': { ch: 60, r: true, op: true },
    'Aprendizagem Profunda': { ch: 60, r: true, op: true },
    'Processamento de Imagens': { ch: 60, r: true, op: true },
    'Mineração de Dados': { ch: 60, r: true, op: true },
    'Realidade Extendida': { ch: 60, r: true, op: true },
    'Engenharia de Requisitos': { ch: 60, r: true, op: true },
    'Engenharia Web e DevOps': { ch: 60, r: true, op: true },
    'Gerenciamento de Projeto de Software': { ch: 60, r: true, op: true },
    'Análise e Projeto Orientado a Objetos': { ch: 60, r: true, op: true },
    'Banco de Dados 2': { ch: 60, op: true },
    'Banco de Dados 3': { ch: 60, op: true },
    'Programação Distribuída': { ch: 60, op: true },
    'Segurança e Auditoria de Sistemas': { ch: 60, op: true },
    'Disciplina Certificadora Comum': { ch: 120, r: true },
    'Disciplina Certificadora Identitária': { ch: 120, r: true },
    'Disciplina Certificadora Específica': { ch: 300, r: true },
    'Estágio Curricular Obrigatório': { ch: 360, r: true },
};

function GradeNova({ className }) {
    return (
        <section className={className}>
            <h2>Grade Nova — Disciplinas</h2>
            <ul className="grade-lista">
                {Object.entries(grade_nova).map(([nome, dados], index) => (
                    <li
                        key={index}
                        className={`disciplina-item ${dados.r ? 'remoto' : ''}`}
                    >
                        <strong>{nome}</strong> — {dados.ch}h
                        {dados.r && <span className="badge remoto"> REMOTA </span>}
                        {dados.op && <span className="badge optativa"> OPTATIVA </span>}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default GradeNova;



import React from "react";
import "./About.css";

const About = () => (
  <div className="container">
    <div className="about-container">
      <h1>Sobre o DoctorBot</h1>
      <div className="texto">
        <h2>Bem-vindo(a)!</h2>
        <p>
          O <b>DoctorBot</b> é um assistente virtual criado para ajudar na
          avaliação do risco de diabetes, de forma simples, rápida e educativa.
          Nosso sistema utiliza inteligência artificial treinada com dados reais
          para fornecer uma análise baseada em informações clínicas.
        </p>
      </div>
      <div className="texto">
        <h2>Sobre o Dataset</h2>
        <p>
          Utilizamos um conjunto de dados do{" "}
          <b>
            National Institute of Diabetes and Digestive and Kidney Diseases
          </b>
          , focado em mulheres adultas de origem Pima. O objetivo é prever, de
          forma diagnóstica, se uma paciente possui diabetes, a partir de
          medições como idade, glicose, IMC e pressão arterial.
        </p>
      </div>
      <div className="texto">
        <h2>Como funciona?</h2>
        <ul>
          <li>
            Você preenche os dados do paciente (nome, idade, glicose, IMC e
            pressão).
          </li>
          <li>
            O DoctorBot analisa as informações e retorna uma avaliação
            personalizada.
          </li>
          <li>
            Seu histórico de consultas dos pacientes ficam salvo enquanto o
            navegador estiver aberto.
          </li>
        </ul>
      </div>
      <div className="texto">
        <h2>Colunas Utilizadas</h2>
        <ul>
          <li>
            <b>Idade</b>: Sua idade em anos.
          </li>
          <li>
            <b>Glicose</b>: Concentração de glicose no sangue.
          </li>
          <li>
            <b>IMC</b>: Índice de Massa Corporal.
          </li>
          <li>
            <b>Pressão</b>: Pressão arterial diastólica.
          </li>
        </ul>
        <p>
          Essas strinformações são essenciais para uma avaliação precisa do
          risco de diabetes.
        </p>
      </div>
    </div>
  </div>
);

export default About;

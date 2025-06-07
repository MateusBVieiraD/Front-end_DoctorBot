import React from "react";
import "./About.css";

const About = () => (
  <div className="about-container">
    <h1>Sobre o DoctorBot</h1>
    <section>
      <h2>Bem-vindo(a)!</h2>
      <p>
        O <b>DoctorBot</b> é um assistente virtual criado para ajudar na avaliação do risco de diabetes, de forma simples, rápida e educativa. Nosso sistema utiliza inteligência artificial treinada com dados reais para fornecer uma análise baseada em informações clínicas.
      </p>
    </section>
    <section>
      <h2>Sobre o Dataset</h2>
      <p>
        Utilizamos um conjunto de dados do <b>National Institute of Diabetes and Digestive and Kidney Diseases</b>, focado em mulheres adultas de origem Pima. O objetivo é prever, de forma diagnóstica, se uma paciente possui diabetes, a partir de medições como idade, glicose, IMC e pressão arterial.
      </p>
    </section>
    <section>
      <h2>Como funciona?</h2>
      <ul>
        <li>Você preenche seus dados (nome, idade, glicose, IMC e pressão).</li>
        <li>O DoctorBot analisa as informações e retorna uma avaliação personalizada.</li>
        <li>Seu histórico de consultas fica salvo enquanto o navegador estiver aberto.</li>
      </ul>
    </section>
    <section>
      <h2>Colunas Utilizadas</h2>
      <ul>
        <li><b>Idade</b>: Sua idade em anos.</li>
        <li><b>Glicose</b>: Concentração de glicose no sangue.</li>
        <li><b>IMC</b>: Índice de Massa Corporal.</li>
        <li><b>Pressão</b>: Pressão arterial diastólica.</li>
      </ul>
      <p>
        Essas informações são essenciais para uma avaliação precisa do risco de diabetes.
      </p>
    </section>
    <section>
      <h2>Agradecimentos</h2>
      <p>
        Smith, J.W., Everhart, J.E., Dickson, W.C., Knowler, W.C., & Johannes, R.S. (1988). Using the ADAP learning algorithm to forecast the onset of diabetes mellitus. In Proceedings of the Symposium on Computer Applications and Medical Care (pp. 261–265). IEEE Computer Society Press.
      </p>
    </section>
    <section>
      <h2>Inspiração</h2>
      <p>
        Nosso desafio é tornar a saúde mais acessível e a prevenção mais fácil. Use o DoctorBot para aprender, se cuidar e compartilhar conhecimento!
      </p>
    </section>
  </div>
);

export default About;

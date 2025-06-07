import { useState } from "react";
import "./ChatBot.css";

interface FormData {
  nome: string;
  idade: string;
  glicose: string;
  imc: string;
  pressao: string;
}

interface ResultadoIA{
    idade: string;
    glicose: string;
    imc: string;
    pressao: string;
    avalicao: string;
}

function ChatBot() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    idade: "",
    glicose: "",
    imc: "",
    pressao: "",
  });

  const [resultadoIA, setResultadoIA] = useState<ResultadoIA | null>(null);
  const [erros, setErros] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const novosErros: Partial<FormData> = {};

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(form.nome)) {
      novosErros.nome = "Nome deve conter apenas letras.";
    }

    if (!/^\d+$/.test(form.idade)) {
      novosErros.idade = "Idade deve ser um número inteiro.";
    }

    if (!/^\d+$/.test(form.glicose)) {
      novosErros.glicose = "glicose deve ser um número inteiro.";
    }

    if (!/^\d+(\.\d+)?$/.test(form.imc)) {
      novosErros.imc = "IMC deve ser um número decimal (ex: 23.5).";
    }

    if (!/^\d+$/.test(form.pressao)) {
      novosErros.pressao = "Pressão deve ser um número inteiro.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (validarCampos()) {
    console.warn("Erros de validação", erros);
    return;
  }

  try {
    const queryParams = new URLSearchParams({
      nome: form.nome,
      idade: form.idade,
      glicose: form.glicose,
      imc: form.imc,
      pressao: form.pressao,
    }).toString();

    const url = `https://7758-2804-14c-65c1-48de-00-1001.ngrok-free.app/avaliar?${queryParams}`;

    console.log("URL de requisição:", url);

    const response = await fetch(url, {
      method: "GET",
    });

    const textoResposta = await response.text();
    console.log("Resposta da API (texto):", textoResposta);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    try {
      const resultado: ResultadoIA = JSON.parse(textoResposta);
      setResultadoIA(resultado);
    } catch (jsonError) {
      console.error("Erro ao parsear JSON da resposta:", jsonError);
    }

  } catch (error) {
    console.error("Erro ao chamar a API:", error);
  }
};

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="formulario">
          <div className="input-label">
            <label>Nome do Paciente:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              pattern="[A-Za-zÀ-ÿ\s]+"
              inputMode="text"
              required
              onBeforeInput={(e) => {
                if (!/^[A-Za-zÀ-ÿ\s]$/.test(e.data ?? "")) {
                  e.preventDefault();
                }
              }}
            />
            {erros.nome && <span className="erro">{erros.nome}</span>}
          </div>

          <div className="input-label">
            <label>Idade:</label>
            <input
              type="text"
              name="idade"
              value={form.idade}
              onChange={handleChange}
              pattern="\d+"
              inputMode="numeric"
              required
              onBeforeInput={(e) => {
                if (!/^\d$/.test(e.data ?? "")) {
                  e.preventDefault();
                }
              }}
            />
            {erros.idade && <span className="erro">{erros.idade}</span>}
          </div>
          <div className="input-label">
            <label>Glicose:</label>
            <input
              type="text"
              name="glicose"
              value={form.glicose}
              onChange={handleChange}
              pattern="\d+"
              inputMode="numeric"
              required
              onBeforeInput={(e) => {
                if (!/^\d$/.test(e.data ?? "")) {
                  e.preventDefault();
                }
              }}
            />
            {erros.glicose && <span className="erro">{erros.glicose}</span>}
          </div>
          <div className="input-label">
            <label>IMC:</label>
            <input
              type="text"
              name="imc"
              value={form.imc}
              onChange={handleChange}
              pattern="\d+(\.\d+)?"
              inputMode="decimal"
              required
              onBeforeInput={(e) => {
                if (!/^[\d.]$/.test(e.data ?? "")) {
                  e.preventDefault();
                }
              }}
            />
            {erros.imc && <span className="erro">{erros.imc}</span>}
          </div>
          <div className="input-label">
            <label>Pressão Sanguinea:</label>
            <input
              type="text"
              name="pressao"
              value={form.pressao}
              onChange={handleChange}
              pattern="\d+"
              inputMode="numeric"
              required
              onBeforeInput={(e) => {
                if (!/^\d$/.test(e.data ?? "")) {
                  e.preventDefault();
                }
              }}
            />
            {erros.pressao && <span className="erro">{erros.pressao}</span>}
          </div>
        <div className="btn-form">
          <button type="submit">
            Enviar Informações<i className="fa-solid fa-clipboard"></i>
          </button>
        </div>
        </form>
        {resultadoIA && (
        <div className="resultado">
          <h2>Resultado da IA</h2>
          <p><strong>Paciente:</strong> {form.nome}</p>
          <p><strong>Idade:</strong> {resultadoIA.idade}</p>
          <p><strong>Glicose:</strong> {resultadoIA.glicose}</p>
          <p><strong>IMC:</strong> {resultadoIA.imc}</p>
          <p><strong>Pressão Sanguinea:</strong> {resultadoIA.pressao}</p>
          <p><strong>Avaliação:</strong> {resultadoIA.avalicao}</p>
        </div>
      )}

      </div>
    </>
  );
}

export default ChatBot;

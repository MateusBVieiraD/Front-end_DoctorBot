import { useState } from "react";
import "./ChatBot.css";

interface FormData {
  nome: string;
  idade: string;
  glicose: string;
  imc: string;
  pressao: string;
}

interface ResultadoIA {
  idade: string;
  glicose: string;
  imc: string;
  pressao: string;
  avalicao?: string;
  avaliacao?: string;
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
  const [erros] = useState<Partial<FormData>>({});
  const [, setHistorico] = useState<ResultadoIA[]>([]); // 🟩 ADIÇÃO
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        idade: form.idade,
        glicose: form.glicose,
        imc: form.imc,
        pressao: form.pressao,
      }).toString();


      const url = `https://e917-2804-14c-65c1-48de-00-1001.ngrok-free.app/avaliar?${queryParams}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      const textoResposta = await response.text();

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      try {
        const resultado: ResultadoIA = JSON.parse(textoResposta);
        setResultadoIA(resultado);
        setShowModal(true);
        // Salva o histórico em cookie (session cookie)
        let historicoAtual: any[] = [];
        const historicoCookie = document.cookie.split('; ').find(row => row.startsWith('historico='));
        if (historicoCookie) {
          try {
            historicoAtual = JSON.parse(decodeURIComponent(historicoCookie.split('=')[1]));
          } catch {}
        }
        const novoHistorico = [...historicoAtual, { ...resultado, nome: form.nome }].slice(-10);
        document.cookie = `historico=${encodeURIComponent(JSON.stringify(novoHistorico))}; path=/;`;
        setHistorico(novoHistorico);
      } catch (jsonError) {
        console.error("Erro ao parsear JSON da resposta:", jsonError);
      }

    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="formulario">
          <div className="input-label">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              pattern="[A-Za-zÀ-ÿ\s]+"
              title="Apenas letras"
              required
              inputMode="text"
              autoComplete="off"
              onKeyPress={e => {
                if (!/[A-Za-zÀ-ÿ\s]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {erros.nome && <span className="erro">{erros.nome}</span>}
          </div>
          <div className="input-label">
            <label>Idade:</label>
            <input
              type="number"
              name="idade"
              value={form.idade}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
            {erros.idade && <span className="erro">{erros.idade}</span>}
          </div>
          <div className="input-label">
            <label>Glicose:</label>
            <input
              type="number"
              name="glicose"
              value={form.glicose}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
            {erros.glicose && <span className="erro">{erros.glicose}</span>}
          </div>
          <div className="input-label">
            <label>IMC:</label>
            <input
              type="number"
              name="imc"
              value={form.imc}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
            {erros.imc && <span className="erro">{erros.imc}</span>}
          </div>
          <div className="input-label">
            <label>Pressão Diastólica:</label>
            <input
              type="number"
              name="pressao"
              value={form.pressao}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
            {erros.pressao && <span className="erro">{erros.pressao}</span>}
          </div>
          <div className="btn-form">
            <button type="submit">
              Enviar Informações<i className="fa-solid fa-clipboard"></i>
            </button>
          </div>
        </form>

        {resultadoIA && showModal && (
          <div className="modal-overlay">
            <div className="modal-resultado modal-resultado-animado">
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
              <div className="modal-ia-icon">
                <i className="fa-solid fa-robot"></i>
              </div>
              <h2 className="modal-title">Resultado da Avaliação</h2>
              <div className="modal-content">
                <div className="modal-row">
                  <span className="modal-label">Paciente:</span>
                  <span className="modal-value destaque">{form.nome}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Idade:</span>
                  <span className="modal-value">{resultadoIA.idade}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Glicose:</span>
                  <span className="modal-value">{resultadoIA.glicose}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">IMC:</span>
                  <span className="modal-value">{resultadoIA.imc}</span>
                </div>
                <div className="modal-row">
                  <span className="modal-label">Pressão:</span>
                  <span className="modal-value">{resultadoIA.pressao}</span>
                </div>
                <div className="modal-row modal-avaliacao-animada">
                  <span className="modal-label">Avaliação:</span>
                  <span className="modal-value">{(resultadoIA.avalicao || resultadoIA.avaliacao || '-').replace(/^\d+\.\s*/, '').replace(/^['"]|['"]$/g, '')}</span>
                </div>
              </div>
              <button className="modal-btn" onClick={() => setShowModal(false)}>Fechar</button>
            </div>
          </div>
        )}
        {loading && (
          <div className="modal-overlay">
            <div className="skeleton-modal">
              <div className="skeleton-ia">
                <div className="skeleton-ia-dot"></div>
                <div className="skeleton-ia-dot"></div>
                <div className="skeleton-ia-dot"></div>
                <div className="skeleton-ia-dot"></div>
              </div>
              <div className="skeleton-bar"></div>
              <div className="skeleton-bar short"></div>
              <p style={{marginTop: 24, color: 'var(--black)', fontWeight: 'bold'}}>A IA está analisando seus dados...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBot;

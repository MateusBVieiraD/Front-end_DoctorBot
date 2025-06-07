import './Historico.css'
import { useEffect, useState } from 'react'

export function Historico() {
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    // Busca o histórico do cookie
    const historicoCookie = document.cookie.split('; ').find(row => row.startsWith('historico='));
    if (historicoCookie) {
      try {
        setHistorico(JSON.parse(decodeURIComponent(historicoCookie.split('=')[1])));
      } catch {
        setHistorico([]);
      }
    } else {
      setHistorico([]);
    }
  }, []);

  return (
    <div className="container">
      <h2>Histórico de Pesquisas</h2>
      {historico.length === 0 ? (
        <p>Nenhuma pesquisa realizada ainda.</p>
      ) : (
        <ul style={{ width: '100%', padding: 0 }}>
          {historico.map((item, idx) => (
            <li key={idx} className="historico-item">
              <span className="historico-label">Nome:</span> <span className="historico-value">{item.nome || '-'}</span> |
              <span className="historico-label">Idade:</span> <span className="historico-value">{item.idade}</span> |
              <span className="historico-label">Glicose:</span> <span className="historico-value">{item.glicose}</span> |
              <span className="historico-label">IMC:</span> <span className="historico-value">{item.imc}</span> |
              <span className="historico-label">Pressão:</span> <span className="historico-value">{item.pressao}</span> |
              <span className="historico-label">Avaliação:</span> <span className="historico-avaliacao">{(item.avalicao || item.avaliacao || '-').replace(/^\d+\.\s*/, '')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
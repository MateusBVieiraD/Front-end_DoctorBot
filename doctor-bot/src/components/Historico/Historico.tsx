import './Historico.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Historico() {
  const navigate = useNavigate()

  const [historico, setHistorico] = useState<any[]>([]);
  const [emailModal, setEmailModal] = useState<{ open: boolean, idx: number | null }>({ open: false, idx: null });
  const [infoModal, setInfoModal] = useState<number | null>(null);
  const [emailStatus, setEmailStatus] = useState<{ loading: boolean, success: boolean | null, error: string | null }>({ loading: false, success: null, error: null });

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
    <div
      className="container"
      style={{
        height: '85vh', // Sempre começa com 80vh
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      <h2>Histórico de Pesquisas</h2>
      {historico.length === 0 ? (
        <p>Nenhuma pesquisa realizada ainda.</p>
      ) : (
        <ul style={{ width: '100%', padding: 0, overflowY: 'auto', flex: 1 }}>
          {historico.map((item, idx) => (
            <li key={idx} className="historico-item">
              <div className='infos'>
              <span className="historico-label">Nome:</span> <span className="historico-value">{item.nome || '-'}</span> |
              <span className="historico-label">Idade:</span> <span className="historico-value">{item.idade}</span> |
              <span className="historico-label">Glicose:</span> <span className="historico-value">{item.glicose}</span> |
              <span className="historico-label">IMC:</span> <span className="historico-value">{item.imc}</span> |
              <span className="historico-label">Pressão:</span> <span className="historico-value">{item.pressao}</span> |
              <span className="historico-label">Avaliação:</span> <span className="historico-avaliacao">{(item.avalicao || item.avaliacao || '-').replace(/^\d+\.\s*/, '')}</span>
              </div>
              <div className="botoes">
              <button
                className="enviar-email-btn"
                style={{ marginLeft: 12, padding: '5px 15px', borderRadius: 6, background: 'var(--red)', color: 'var(--black)', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 14 }}
                onClick={() => {
                  setEmailModal({
                    open: true,
                    idx
                  });
                }}
                title="Enviar análise melhorada para o médico"
              >
                Enviar análise melhorada
              </button>
              <button
                className="info-email-btn"
                style={{ marginLeft: 6, padding: '5px 10px', borderRadius: 6, background: 'var(--gray, #eee)', color: 'var(--black)', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 14 }}
                onClick={() => setInfoModal(idx)}
                title="Saiba mais sobre o envio de análise melhorada"
                type="button"
              >
                i
              </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="botao">
                <button onClick={() => navigate('/avaliar')}>Consultar DoctorBot</button>
            </div>

      {emailModal.open && emailModal.idx !== null && (
        <div className="modal-overlay">
          <div className="modal-resultado modal-resultado-animado" style={{maxWidth: 400}}>
            <button className="modal-close" onClick={() => setEmailModal({ open: false, idx: null })}>&times;</button>
            <h2 style={{marginBottom: 16}}>Enviar análise melhorada</h2>
            <form
              onSubmit={async e => {
                e.preventDefault();
                setEmailStatus({ loading: true, success: null, error: null });
                const email = (e.target as any).email_medico.value;
                const item = historico[emailModal.idx!];
                const body = {
                  nome: item.nome || '-',
                  idade: item.idade,
                  glicose: item.glicose,
                  imc: item.imc,
                  pressao: item.pressao,
                  avaliacao: (item.avalicao || item.avaliacao || '-').replace(/^\d+\.\s*/, ''),
                  email_medico: email
                };
                try {
                  const resp = await fetch('https://6ceb-2804-14c-65c1-48de-00-1001.ngrok-free.app/enviar-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                  });
                  if (resp.ok) {
                    setEmailStatus({ loading: false, success: true, error: null });
                  } else {
                    setEmailStatus({ loading: false, success: false, error: 'Erro ao enviar e-mail.' });
                  }
                } catch {
                  setEmailStatus({ loading: false, success: false, error: 'Erro ao enviar e-mail.' });
                }
              }}
            >
              <label style={{fontWeight: 'bold'}}>E-mail do médico:</label>
              <input name="email_medico" type="email" required style={{width: '100%', margin: '10px 0', padding: 8, borderRadius: 6, border: '1px solid #ccc'}} placeholder="exemplo@medico.com" disabled={emailStatus.loading} />
              <button type="submit" className="enviar-email-btn" style={{width: '100%', marginTop: 8}} disabled={emailStatus.loading}>Enviar</button>
            </form>
            {emailStatus.loading && (
              <div style={{marginTop: 24, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'
              }}>
                <div className="skeleton-ia" style={{justifyContent: 'center', marginBottom: 8}}>
                  <div className="skeleton-ia-dot"></div>
                  <div className="skeleton-ia-dot"></div>
                  <div className="skeleton-ia-dot"></div>
                  <div className="skeleton-ia-dot"></div>
                </div>
                <div className="skeleton-bar"></div>
                <div className="skeleton-bar short"></div>
                <p style={{marginTop: 12, color: 'var(--black)', fontWeight: 'bold', textAlign: 'center'}}>Enviando e-mail...</p>
              </div>
            )}
            {emailStatus.success && (
              <div style={{marginTop: 24, textAlign: 'center'}}>
                <p className='sucesso' style={{fontWeight: 'bold'}}>E-mail enviado com sucesso!</p>
                <button className="enviar-email-btn" style={{marginTop: 8}} onClick={() => { setEmailModal({ open: false, idx: null }); setEmailStatus({ loading: false, success: null, error: null }); }}>Fechar</button>
              </div>
            )}
            {emailStatus.success === false && (
              <div style={{marginTop: 24, textAlign: 'center'}}>
                <p style={{color: 'red', fontWeight: 'bold'}}>{emailStatus.error || 'Erro ao enviar e-mail.'}</p>
                <button className="enviar-email-btn" style={{marginTop: 8}} onClick={() => setEmailStatus({ loading: false, success: null, error: null })}>Tentar novamente</button>
              </div>
            )}
          </div>
        </div>
      )}

      {infoModal !== null && (
        <div className="modal-overlay">
          <div className="modal-resultado modal-resultado-animado" style={{maxWidth: 400}}>
            <button className="modal-close" onClick={() => setInfoModal(null)}>&times;</button>
            <h2 style={{marginBottom: 16}}>Sobre a análise melhorada</h2>
            <p style={{marginBottom: 16}}>
              Ao clicar em "Enviar análise melhorada", você poderá encaminhar para o seu e-mail uma análise clínica detalhada, incluindo os dados do paciente e uma explicação aprofundada do motivo da resposta da IA.
            </p>
            <button className="enviar-email-btn" onClick={() => setInfoModal(null)} style={{width: '100%'}}>Entendi</button>
          </div>
        </div>
      )}
    </div>
  );
}
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header(){
    const navigate = useNavigate();
    return(
        <>
            <header className='header'>
                <div className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}> 
                    <img src="src\\img\\pngtree-stethoscope-cartoon-medical-png-image_6663953.png" alt="Logo DoctorBot" />
                </div>
                <div className="nome">
                    <h2>DoctorBot</h2>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                    <button onClick={() => navigate('/historico')} style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--red)', color: 'var(--black)', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                        Histórico
                    </button>
                    <button onClick={() => navigate('/sobre')} style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--red)', color: 'var(--black)', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                        Sobre
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header
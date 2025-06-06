import './Inicio.css'

function Inicio(){
    return(
        <>
        <div className="container">
            <div className="imagem">
                <img src="src\img\pngtree-cartoon-character-hand-drawn-character-illustration-hospital-doctors-picture-image_3932332.png" alt="" />
            </div>
            <div className="descricao">
                <h3>O DoctorBot é um aplicativo inteligente que utiliza inteligência artificial para avaliar o risco de diabetes com base em dados clínicos simples como idade, nível de glicose, IMC e pressão arterial.
Com uma resposta rápida e objetiva, ele oferece um apoio inicial à triagem de pacientes, ajudando profissionais da saúde e usuários comuns a identificar possíveis sinais de alerta.</h3>
            </div>
            <div className="botao">
                <button>Consultar DoctorBot</button>
            </div>
        </div>
        </>
    )
}

export default Inicio
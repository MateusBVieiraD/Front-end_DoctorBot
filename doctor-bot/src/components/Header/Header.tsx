import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <div className="logo-nome">
          <div
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src="\img\pngtree-stethoscope-cartoon-medical-png-image_6663953.png"
              alt="Logo DoctorBot"
            />
          </div>
          <div className="nome">
            <h2>DoctorBot</h2>
          </div>
        </div>
        <div className="botao">
          <button onClick={() => navigate("/historico")}>Histórico</button>
          <button onClick={() => navigate("/sobre")}>Sobre</button>
          <button onClick={() => navigate("/graficos")}>Gráficos</button>
        </div>
      </header>
    </>
  );
}

export default Header;

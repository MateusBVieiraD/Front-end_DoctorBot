import "./Graficos.css";

function Graficos() {
  return (
    <>
      <div className="container">
        
        <h2>Gráficos de precisão da IA</h2>

        <div className="img">
          <label>Matriz de confusão da IA:</label>
          <img src="src\img\Figure_1.png" alt="" />
          <label>Comparação de classes reais e previstas:</label>
          <img src="src\img\Figure_2.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Graficos;

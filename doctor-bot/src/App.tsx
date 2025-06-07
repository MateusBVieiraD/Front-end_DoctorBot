import './App.css'
import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import ChatBot from './components/ChatBot/ChatBot'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Historico } from './components/Historico/Historico';
import About from './components/About/About';
import Graficos from './components/Graficos/Graficos'



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/avaliar' element={<ChatBot />} />
        <Route path='/historico' element={<Historico />} /> 
        <Route path='/sobre' element={<About />} />
        <Route path='/graficos' element={<Graficos />} />
      </Routes>
      <Footer />
    </Router>
  ) 
}

export default App

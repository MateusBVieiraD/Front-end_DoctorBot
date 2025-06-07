import './App.css'
import Header from './components/Header/Header'
import Inicio from './components/Inicio/Inicio'
import ChatBot from './components/ChatBot/ChatBot'
import Footer from './components/Footer/Footer'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {


  return (
    <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/avaliar' element={<ChatBot/>}/>

        </Routes>
      <Footer/>
    </Router>
  )
}

export default App

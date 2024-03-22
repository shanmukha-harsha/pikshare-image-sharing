import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
// import NavBar from './components/NavBar'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

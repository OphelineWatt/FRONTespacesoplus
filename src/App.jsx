import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import AppPage from './Pages/AppPage';
import Footer from './Components/Footer';


function App() {
  return (
<BrowserRouter>
  <NavBar/>
   <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/application" element={<AppPage/>} />
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App

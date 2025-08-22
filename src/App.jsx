import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar';

import HomePage from './Pages/HomePage';
import AppPage from './Pages/AppPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';


import Footer from './Components/Footer';


function App() {
  return (
<BrowserRouter>
  <NavBar/>
   <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/application" element={<AppPage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/register" element={<RegisterPage/>} />
    <Route path="/profile" element={<ProfilePage/>} />
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App

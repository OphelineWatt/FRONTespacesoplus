import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar';

import HomePage from './Pages/HomePage';
import AppPage from './Pages/AppPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import AdminPage from './Pages/AdminPage';


import Footer from './Components/Footer';
import { APIProvider } from '@vis.gl/react-google-maps';


function App() {
  return (
<BrowserRouter>
      <APIProvider
        apiKey={import.meta.env.VITE_MAPS_API_KEY}
        solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
        libraries={['places']}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/application" element={<AppPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage/>} />
        </Routes>
        <Footer />
      </APIProvider>
    </BrowserRouter>
  )
}

export default App

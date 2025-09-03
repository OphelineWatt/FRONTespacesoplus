import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar';
import 'react-toastify/dist/ReactToastify.css';


import HomePage from './Pages/HomePage';
import AppPage from './Pages/AppPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProfilePage from './Pages/ProfilePage';
import AdminPage from './Pages/AdminPage';
import ReviewPage from './Pages/ReviewPage';


import Footer from './Components/Footer';

import { APIProvider } from '@vis.gl/react-google-maps';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, Bounce } from 'react-toastify';
import ResetPasswordPage from './Pages/ResetPasswordPage';


function App() {
  return (
    <BrowserRouter>
      <APIProvider
        apiKey={import.meta.env.VITE_MAPS_API_KEY}
        solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        libraries={['places']}
      >
        <div className="page-container">
          <NavBar />
          <div className="content-wrap">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/application" element={<AppPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/review/:place_id" element={<ReviewPage />} />
              <Route path="/passewordReset/:resetToken" element={<ResetPasswordPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </APIProvider>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App

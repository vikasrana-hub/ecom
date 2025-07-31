import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import { Appbar } from './components/appbar';
import Admin from './pages/admin';
import { CheckoutForm } from './pages/checkout';
import Home from './pages/Home';
import LandingPage from './pages/Landing';
import Login from './pages/login';
import Productcard from './pages/Productcard';
import Productsupload from './pages/Productsupload';
import UserProfileCard from './pages/profile';
import Signup from './pages/signup.';
import { ThankYou } from './pages/thanks';

function AppWrapper() {
  const location = useLocation();

  // Routes where Appbar should be hidden
  const hideAppbarRoutes = ['/', '/user/login', '/user/signup', '/adminlogin', '/ProductUpload'];

  const shouldShowAppbar = !hideAppbarRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen">
        {shouldShowAppbar && <Appbar />}
        
        <div className="flex-1">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/adminlogin' element={<Admin />} />
            <Route path='/ProductUpload' element={<Productsupload />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/signup' element={<Signup />} />
            <Route path='/user/home' element={<Home />} />
            <Route path='/products/:id' element={<Productcard />} />
            <Route path='/user/profile' element={<UserProfileCard />} />
            <Route path='/user/cart' element={<CheckoutForm />} />
            <Route path='/user/thankyou' element={<ThankYou />} />
          </Routes>
        </div>

        
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

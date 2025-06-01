import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Appbar } from './components/appbar';
import { Footer } from './components/Footer';
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

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Appbar />
        
        {/* Main content that grows */}
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

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

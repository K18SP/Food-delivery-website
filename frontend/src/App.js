import logo from './logo.svg';
import './App.css';
import Navbar  from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import  PlaceOrder  from './pages/PlaceOrder/PlaceOrder';
import  Home  from './pages/Home/Home';
import  Cart  from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import AboutUs from './pages/AboutUs/AboutUs';
import MyOrders from './pages/MyOrders/MyOrders';
import Verify from './pages/verify/Verify';

function App() {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="App">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>    
  );
}

export default App;

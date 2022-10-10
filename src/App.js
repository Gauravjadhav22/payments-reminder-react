import React, { useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import AuthContext from './context/AuthContext';


//components
import Footer from "./components/Footer"
import Header from "./components/Header"
// payments creating and editing 
// payment should contain the following:
//1)how much sending mails in a week to send
//2)payment:email, Full name, payment link, NOte:, contact, msg to send
//5)landing page:should be available for authorized users should contain creating new payment , profile section
//3)All payments pending page
//4)All payments success page 
// ...
// user should see the login page page at the startup


//pages
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Payments from './pages/Payments';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import useAuth from './hooks/useAuth';

function App() {
  // const { auth } = useContext(AuthContext)
  // useEffect(() => {

  //   console.log(auth.username);
  const persist = localStorage.getItem("persist") || false;

  const {auth} = useAuth()

console.log(auth);

  // }, [])
  return (
    <div >

      <Header />

      <Routes>
        <Route path='/'>
          {persist ?
            <Route element={<PersistLogin />}>

              <Route element={<RequireAuth />}>
                <Route path='/' element={<Payments />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path='profile' element={<Profile />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route path='*' element={<NotFound />} />
              </Route>
            </Route>
            :

            (
              <>
                <Route path='/' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='*' element={<NotFound />} />

              </>)
          }
        </Route>
      </Routes>







      <Footer />
    </div>
  );
}

export default App;

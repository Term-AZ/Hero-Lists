import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'
import Landing from './pages/Landing';
import NavBar from './pages/reusables/NavBar/NavBar';
import Footer from './pages/reusables/Footer/Footer';
import Herolist from './pages/list_page/Herolist';
import Login from './pages/user_entry/login/Login';
import Register from './pages/user_entry/register/Register';
import {AuthProvider} from './context/AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </AuthProvider>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);














// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  // <BrowserRouter>
  //   <NavBar/>
  //   <AuthProvider>
  //   <Routes>
  //     <Route path="/" element={<Navigate to="/superheroLists/landing"/>}/>
  //     <Route  path="/superheroLists" element={<Dashboard/>}>
  //       <Route name="default" path="/superheroLists/landing" element={<Landing/>}></Route>
  //       <Route path="/superheroLists/login" element={<Login/>}/>
  //       <Route path="/superheroLists/register" element={<Register/>}/>
  //       <Route path="/superheroLists/list" element={<Herolist/>}/>
  //     </Route>
  //   </Routes>
  //   </AuthProvider>
  //   <Footer/>
  // </BrowserRouter>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
// )

function Dashboard(){
  return(
    <div>
      <Outlet/>
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

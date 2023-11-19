import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'
import Landing from './pages/Landing';
import NavBar from './pages/reusables/NavBar/NavBar';
import Footer from './pages/reusables/Footer/Footer';
import Herolist from './pages/list_page/Herolist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Navigate to="/superheroLists/landing"/>}/>
      <Route  path="/superheroLists" element={<Dashboard/>}>
        <Route name="default" path="/superheroLists/landing" element={<Landing/>}>
        </Route>
        <Route path="/superheroLists/list" element={<Herolist/>}/>
      </Route>
    </Routes>
    <Footer/>
  </BrowserRouter>

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)

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

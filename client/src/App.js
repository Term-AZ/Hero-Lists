import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'
import Landing from './pages/Landing';
import NavBar from './pages/reusables/NavBar/NavBar';
import Footer from './pages/reusables/Footer/Footer';
import Herolist from './pages/list_page/Herolist';
import HerolistFree from './pages/list_page/HerolistFree'
import Login from './pages/user_entry/login/Login';
import Register from './pages/user_entry/register/Register';
import AuthProvider from './context/AuthProvider'
import Layout from './pages/Layout';
import RequireAuth from './authentication/RequireAuth';
import Admin from './pages/admin/Admin';
import PersistLogin from './pages/user_entry/PersistLogin';

const ROLES = {
  'User': 'User',
  'Admin': 'Admin'
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/SuperheroList"/>}></Route>
        {/* Public Routes */}
      <Route path='/SuperheroList' element={<Landing/>}></Route>
      <Route path='/SuperheroList/login' element={<Login/>}></Route>
      <Route path='/SuperheroList/register' element={<Register/>}></Route>
      <Route path='/SuperheroList/list' element = {<HerolistFree/>}></Route>

      {/* Protected Routes */}
      <Route element={<PersistLogin/>}>
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path='/SuperheroList/SLIST' element={<Herolist />} />
        </Route>
         */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='/SuperheroList/Admin' element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

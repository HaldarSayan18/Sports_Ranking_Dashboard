// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/register_login/Registration';
import './components/styles/App.css';
import LogIn from './components/register_login/Login';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/DashBoard/Dashboard.jsx';
import Profile from './components/DashBoard/Profile.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/log' element={<LogIn/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  );
}

export default App;

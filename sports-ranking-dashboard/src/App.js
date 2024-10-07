// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/register_login/Registration';
import './components/styles/App.css';
import LogIn from './components/register_login/Login';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/log' element={<LogIn/>}/>
    </Routes>
    </>
  );
}

export default App;

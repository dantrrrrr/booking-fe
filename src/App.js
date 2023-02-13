import './App.scss';
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import FileWeb3Upload from './pages/upfile/FileWeb3Upload';
import Login from './pages/login/Login';
function App() {
  return (
   
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route  path='/hotels'element={<List/>} />
        <Route  path='/hotels/:hotelId'element={<Hotel/>} />
        <Route  path='/upload/file/ipfs-demo'element={<FileWeb3Upload/>} />
        <Route  path='/login' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;

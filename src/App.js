import './App.scss';
import {BrowserRouter as Router, Routes, Route}from 'react-router-dom'
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
function App() {
  return (
   
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route  path='/hotels'element={<Hotel/>} />
        <Route  path='' />
        <Route  path='' />
        <Route  path='' />
      </Routes>
    </Router>
  );
}

export default App;

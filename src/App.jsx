import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import About from './components/pages/About'
import { Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* <Link to='/'>Home</Link>
      <Link to='/about'>About</Link> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

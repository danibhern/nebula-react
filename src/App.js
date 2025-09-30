import logo from './logo.svg';
import './App.css';
import Home from './components/pages/Home';

function App() {
  return (
        <BrowserRouter>
      {/* <Link to='/'>Home</Link>
      <Link to='/about'>About</Link> */}
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

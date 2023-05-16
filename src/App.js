import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Main } from './components/main';
import {useNavigate,useLocation} from 'react-router-dom';
function App() {
  const location=useLocation();
  const navigate=useNavigate();
  return (
    <Main navigate={navigate} location={location}/>
  );
}

export default App;

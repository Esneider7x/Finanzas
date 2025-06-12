import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Error404 from './pages/404';


function App() {

  return (
    
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  
  )
}

export default App;
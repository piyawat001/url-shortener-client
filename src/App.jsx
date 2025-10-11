import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkForm from '../src/components/LinkForm/LinkForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LinkForm />} />


      </Routes>
    </Router>
  );
}

export default App;

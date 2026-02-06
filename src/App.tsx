import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AnimalsPage from './pages/AnimalsPage';
import DiagnosisPage from './pages/DiagnosisPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

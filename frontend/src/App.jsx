import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats/:shortCode" element={<StatsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
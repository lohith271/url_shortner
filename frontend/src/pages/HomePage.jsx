import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShortenForm from '../components/ShortenForm';
import ResultCard from '../components/ResultCard';

function HomePage() {
  const [result, setResult] = useState(null);
  const [lookupCode, setLookupCode] = useState('');
  const navigate = useNavigate();

  function handleLookup(e) {
    e.preventDefault();
    if (lookupCode.trim()) {
      navigate(`/stats/${lookupCode.trim()}`);
    }
  }

  return (
    <div className="page">
      <h1>Shortly</h1>
      <p className="subtitle">Paste a long URL, get a short one back.</p>
      <ShortenForm onSuccess={setResult} />
      <ResultCard result={result} />

      <p className="section-title" style={{ marginTop: 40 }}>
        Already have a short code? Check its stats
      </p>
      <form onSubmit={handleLookup}>
        <input
          type="text"
          value={lookupCode}
          onChange={(e) => setLookupCode(e.target.value)}
          placeholder="e.g. aZ3kP9x"
        />
        <button type="submit">View stats</button>
      </form>
    </div>
  );
}

export default HomePage;
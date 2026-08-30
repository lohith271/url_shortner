import { useState } from 'react';
import { Link } from 'react-router-dom';

function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  function handleCopy() {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="result-card">
      <span className="result-label">Your short link</span>
      <div className="result-link-row">
        <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
          {result.shortUrl}
        </a>
      </div>
      <div className="result-actions">
        <button className="btn-secondary" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <Link to={`/stats/${result.shortCode}`}>
          <button className="btn-secondary">View stats</button>
        </Link>
      </div>
    </div>
  );
}

export default ResultCard;
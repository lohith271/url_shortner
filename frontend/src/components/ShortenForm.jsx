import { useState } from 'react';
import { shortenUrl } from '../api/urlApi';

function ShortenForm({ onSuccess }) {
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await shortenUrl(longUrl);
      onSuccess(data);
      setLongUrl('');
    } catch (err) {
      const message = err.response?.data?.error || 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="https://example.com/very-long-url"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default ShortenForm;
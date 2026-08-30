import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStats } from '../api/urlApi';

function StatsPage() {
  const { shortCode } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError('');
      try {
        const data = await getStats(shortCode);
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Could not load stats');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [shortCode]);

  if (loading) return <p className="subtitle">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page">
      <h1>{shortCode}</h1>
      <p className="long-url">{stats.longUrl}</p>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="value">{stats.totalClicks}</div>
          <div className="label">Total clicks</div>
        </div>
        <div className="stat-box">
          <div className="value">{stats.clicksPerDay.length}</div>
          <div className="label">Active days</div>
        </div>
      </div>

      <p className="section-title">Clicks per day</p>
      {stats.clicksPerDay.length === 0 ? (
        <div className="empty-state">No clicks yet</div>
      ) : (
        stats.clicksPerDay.map((row) => (
          <div className="list-row" key={row.day}>
            <span>{row.day}</span>
            <span>{row.clicks}</span>
          </div>
        ))
      )}

      <p className="section-title">Top referrers</p>
      {stats.topReferrers.length === 0 ? (
        <div className="empty-state">No referrer data yet</div>
      ) : (
        stats.topReferrers.map((row) => (
          <div className="list-row" key={row.referrer}>
            <span>{row.referrer}</span>
            <span>{row.count}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default StatsPage;
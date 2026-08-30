import Url from '../models/url.js';
import Click from '../models/click.js';
import { nanoid } from 'nanoid';

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

// POST /api/shorten
export async function shortenUrl(req, res) {
  const { longUrl } = req.body;

  if (!longUrl || !isValidUrl(longUrl)) {
    return res.status(400).json({ error: 'Please provide a valid http/https URL' });
  }

  try {
    let shortCode;
    let inserted = false;
    let attempts = 0;

    while (!inserted && attempts < 5) {
      shortCode = nanoid(7);
      try {
        await Url.create({ longUrl, shortCode });
        inserted = true;
      } catch (err) {
        if (err.code === 11000) {
          attempts++; // duplicate key -> retry with a new code
        } else {
          throw err;
        }
      }
    }

    if (!inserted) {
      return res.status(500).json({ error: 'Could not generate a unique code, try again' });
    }

    const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
    return res.status(201).json({ shortCode, shortUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET /:shortCode
export async function redirectUrl(req, res) {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    Click.create({
      urlId: url._id,
      referrer: req.get('referrer') || null,
    }).catch(err => console.error('Failed to log click:', err));

    return res.redirect(302, url.longUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET /api/stats/:shortCode
export async function getStats(req, res) {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    const totalClicks = await Click.countDocuments({ urlId: url._id });

    const clicksPerDay = await Click.aggregate([
      { $match: { urlId: url._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$clickedAt' } },
          clicks: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
      { $project: { day: '$_id', clicks: 1, _id: 0 } },
    ]);

    const topReferrers = await Click.aggregate([
      { $match: { urlId: url._id } },
      {
        $group: {
          _id: { $ifNull: ['$referrer', 'direct'] },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { referrer: '$_id', count: 1, _id: 0 } },
    ]);

    return res.status(200).json({
      shortCode,
      longUrl: url.longUrl,
      createdAt: url.createdAt,
      totalClicks,
      clicksPerDay,
      topReferrers,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
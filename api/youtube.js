// Vercel Serverless Function
// GET /api/youtube?handle=@akupelikilinc&max=6
module.exports = async (req, res) => {
  try {
    const handle = req.query.handle || '@akupelikilinc';
    const max = Math.min(parseInt(req.query.max || '6', 10), 20);
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'YOUTUBE_API_KEY env değişkeni eksik' });
    }

    // 1) Kanal ID’sini al
    const channelResp = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`);
    if (!channelResp.ok) {
      const text = await channelResp.text();
      return res.status(channelResp.status).json({ error: 'Channel fetch failed', details: text });
    }
    const channelData = await channelResp.json();
    const channelId = channelData.items && channelData.items[0] && channelData.items[0].id;
    if (!channelId) {
      return res.status(404).json({ error: 'Kanal ID bulunamadı' });
    }

    // 2) Son videoları al
    const videosResp = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${max}`);
    if (!videosResp.ok) {
      const text = await videosResp.text();
      return res.status(videosResp.status).json({ error: 'Videos fetch failed', details: text });
    }
    const videosData = await videosResp.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json(videosData);
  } catch (err) {
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
};



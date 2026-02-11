export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EdwardMasonPortfolio/1.0)' }
    });

    if (!response.ok) throw new Error(`Failed to fetch ${url}`);

    const html = await response.text();

    // Helper to extract meta tags using Regex (avoids adding heavy dependencies like Cheerio)
    const getMeta = (prop) => {
      const match = html.match(new RegExp(`<meta (?:property|name)=["']${prop}["'] content=["'](.*?)["']`, 'i'));
      return match ? match[1] : null;
    };

    // Extract Data
    const title = getMeta('og:title') || getMeta('twitter:title') || 'Untitled Article';
    const image = getMeta('og:image') || getMeta('twitter:image');
    const description = getMeta('og:description') || getMeta('description');
    const siteName = getMeta('og:site_name') || 'London Now';
    
    // Attempt to find a date (OpenGraph or standard meta)
    const date = getMeta('article:published_time') || getMeta('date') || getMeta('pubdate');

    // Fix relative image URLs if necessary
    let fullImage = image;
    if (image && !image.startsWith('http')) {
      const urlObj = new URL(url);
      fullImage = `${urlObj.protocol}//${urlObj.host}${image}`;
    }

    res.status(200).json({
      url,
      title,
      image: fullImage,
      description,
      siteName,
      date: date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recent'
    });

  } catch (error) {
    console.error('Metadata Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}
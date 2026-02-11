export default async function handler(req, res) {
  // 1. Get the query from your frontend, or default to your name
  // Note: We use the exact search that was blocked
  const AUTHOR_NAME = "Mason, Edward";
  const query = `metadata.creators.person_or_org.name:"${AUTHOR_NAME}"`;
  
  // CHANGED: Increased size to 100 to fetch all papers instead of just 5
  const url = `https://works.hcommons.org/api/records?q=${encodeURIComponent(query)}&sort=newest&size=100`;

  try {
    // 2. Fetch data from Knowledge Commons (Server-to-Server)
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'EdwardMasonPortfolio/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`External API responded with ${response.status}`);
    }

    const data = await response.json();

    // 3. Send the data back to your frontend
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch papers" });
  }
}
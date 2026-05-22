async function run() {
  try {
    const res = await fetch('http://localhost:3000/en');
    const text = await res.text();
    console.log("HTML length:", text.length);
    // Find the news section
    const startIdx = text.indexOf('news-prev');
    if (startIdx !== -1) {
      console.log("Found news-prev!");
      console.log(text.substring(startIdx - 200, startIdx + 1000));
    } else {
      console.log("news-prev NOT found in HTML! Maybe it's client-side rendered?");
      // Let's print some sections of the HTML to see what's there
      const newsWordIdx = text.indexOf('news');
      if (newsWordIdx !== -1) {
        console.log("Found 'news' word at index", newsWordIdx);
        console.log(text.substring(newsWordIdx - 100, newsWordIdx + 500));
      }
    }
  } catch (err) {
    console.error("Error fetching homepage:", err);
  }
}

run();

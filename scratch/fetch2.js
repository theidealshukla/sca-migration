fetch('https://unsplash.com/photos/wJPq-H-Eh7k').then(r=>r.text()).then(html=>{
  const matches = html.match(/https:\/\/images\.unsplash\.com\/photo-[A-Za-z0-9\-]+/g);
  if(matches) {
    console.log([...new Set(matches)]);
  } else {
    console.log("No matches found.");
  }
});

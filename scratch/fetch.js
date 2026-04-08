fetch('https://unsplash.com/photos/wJPq-H-Eh7k').then(r=>r.text()).then(t=>console.log(t.match(/images\.unsplash\.com\/photo-[^"'\?]+/)?.[0]));

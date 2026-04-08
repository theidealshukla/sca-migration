import { getCldVideoUrl } from 'next-cloudinary';
import { config } from 'dotenv';
config({ path: '.env.local' });

console.log(getCldVideoUrl({ src: 'hero-video_uzkmjg' }));
console.log(getCldVideoUrl({ src: 'hero-video_uzkmjg', width: 1920, height: 1080, crop: 'fill', gravity: 'auto' }));
console.log(getCldVideoUrl({ src: 'hero-video_uzkmjg', width: 1080, height: 1920, crop: 'fill', gravity: 'auto' }));

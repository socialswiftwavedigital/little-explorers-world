import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join } from 'path';

const dir = './public/assets';
const files = readdirSync(dir).filter(f => /\.(jpg|jpeg)$/i.test(f));

for (const file of files) {
  const input = join(dir, file);
  const output = join(dir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));
  const isHero = file === 'hero.jpg';
  const maxW = isHero ? 1920 : 1200;
  await sharp(input)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: isHero ? 85 : 80 })
    .toFile(output);
  console.log(`✓ ${file} → ${output.split('\\').pop()}`);
}
console.log(`\nDone — ${files.length} images converted.`);

// Generates PNG app icons from public/icon.svg. Run with: npm run icons
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const svg = await readFile(join(pub, 'icon.svg'))

const targets = [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]

for (const [name, size] of targets) {
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(join(pub, name))
  console.log('wrote public/' + name)
}

// Generates the standalone QR codes used in the deck (currently only the
// trainer's LinkedIn profile on the trainer slide) into public/diagrams/qr/.
// Task slides carry no QR or link: the trainer picks the medium.
// Runs as predev/prebuild — see package.json.
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'diagrams', 'qr')

const STANDALONE_QRS = {
  linkedin: 'https://www.linkedin.com/in/adam-agilino/',
}

await mkdir(OUT_DIR, { recursive: true })
for (const [slug, url] of Object.entries(STANDALONE_QRS)) {
  await QRCode.toFile(join(OUT_DIR, `${slug}.svg`), url, {
    type: 'svg',
    margin: 1,
    color: { dark: '#18181b', light: '#fafafa' },
  })
}
console.log(`[generate-qr] wrote ${Object.keys(STANDALONE_QRS).length} QR code(s) to ${OUT_DIR}`)

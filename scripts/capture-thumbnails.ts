/**
 * Captures canvas screenshots for every visual route.
 * Requires a production build (`npm run build`) — uses `vite preview`.
 *
 * Usage: npm run capture-thumbnails
 */

import { spawn, type ChildProcess } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { visualizationRouteConfigs } from '../src/routes/route-config.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'public', 'thumbnails')
const port = 4173
const baseUrl = `http://127.0.0.1:${port}`

const previewParams = new URLSearchParams({
  seed: '42',
  density: '0.55',
  speed: '1',
})

const viewport = { width: 640, height: 360 }
const settleMs = 1800

function waitForServerReady(proc: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server did not start in time')), 60_000)
    const onData = (chunk: Buffer) => {
      const text = chunk.toString()
      if (text.includes('localhost') || text.includes('127.0.0.1')) {
        clearTimeout(timeout)
        proc.stdout?.off('data', onData)
        proc.stderr?.off('data', onData)
        resolve()
      }
    }
    proc.stdout?.on('data', onData)
    proc.stderr?.on('data', onData)
    proc.on('error', err => {
      clearTimeout(timeout)
      reject(err)
    })
    proc.on('exit', code => {
      if (code !== 0 && code !== null) {
        clearTimeout(timeout)
        reject(new Error(`Preview server exited with code ${code}`))
      }
    })
  })
}

function startPreview(): ChildProcess {
  return spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, BROWSER: 'none' },
  })
}

async function main() {
  await mkdir(outDir, { recursive: true })

  const preview = startPreview()
  try {
    await waitForServerReady(preview)
    await new Promise(r => setTimeout(r, 400))

    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport })

    let ok = 0
    let fail = 0

    for (const route of visualizationRouteConfigs) {
      const url = `${baseUrl}${route.path}?${previewParams}`
      const outPath = path.join(outDir, `${route.id}.jpg`)
      process.stdout.write(`  ${route.id} … `)

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
        const canvas = page.locator('canvas').first()
        await canvas.waitFor({ state: 'visible', timeout: 30_000 })
        await page.waitForTimeout(settleMs)
        await canvas.screenshot({ path: outPath, type: 'jpeg', quality: 85 })
        ok++
        process.stdout.write('ok\n')
      } catch (err) {
        fail++
        process.stdout.write(`failed (${err instanceof Error ? err.message : err})\n`)
      }
    }

    await browser.close()
    console.log(`\nDone: ${ok} captured, ${fail} failed → ${outDir}`)
    if (fail > 0) process.exitCode = 1
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

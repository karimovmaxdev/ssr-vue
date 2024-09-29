import fs from 'node:fs/promises'
import express from 'express'
import axios from 'axios'

const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

const ssrManifest = await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')

const app = express()

const { createServer } = await import('vite')
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  base
})
app.use(vite.middlewares)

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    template = await fs.readFile('./index.html', 'utf-8')
    template = await vite.transformIndexHtml(url, template)
    const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render

    // Извлекаем параметр query из URL
    const query = req.query.query || '';
    let results = [];
    if (query) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
          },
        });
        results = response.data;
      } catch (err) {
        console.error('Error fetching data from API:', err);
      }
    }

    const { html, state } = await render({url, ssrManifest, results, query})

    const fullHtml = template
    .replace(`<!--app-html-->`, html ?? '')
    .replace(`<!--pinia-state-->`, `<script>window.__PINIA_STATE__ = ${state}</script>`)

    res.status(200).set({ 'Content-Type': 'text/html' }).send(fullHtml)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

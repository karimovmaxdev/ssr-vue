import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { useSearchStore } from './store/store.ts' // Импорт стора

interface IRenderArgs {
  url: string,
  ssrManifest: any,
  results: any[],
  query: string,
}

export async function render(renderArgs: IRenderArgs) {
  const { app, pinia } = createApp()

  // Добавляем результаты поиска в Pinia
  const searchStore = useSearchStore(pinia)
  searchStore.results = renderArgs.results
  searchStore.query = renderArgs.query

  const html = await renderToString(app)

  const state = JSON.stringify(pinia.state.value)
  return { html, state }
}

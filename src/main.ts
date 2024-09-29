import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
interface IWindowWithStore extends Window {
  __PINIA_STATE__?: any
}

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.location.reload();
  });
}

export function createApp() {
  const pinia = createPinia()
  const app = createSSRApp(App)

  if(typeof window !== 'undefined') {
    const newWindow: IWindowWithStore = window as IWindowWithStore;
    if(newWindow.__PINIA_STATE__) {
      pinia.state.value = newWindow.__PINIA_STATE__;
    }
  }

  app.use(pinia);

  return { app, pinia }
}

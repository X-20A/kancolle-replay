import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

if (import.meta.env.DEV && location.pathname.startsWith('/debug')) {
    // 開発環境 かつ /debugならデバッグ画面へ
    import('@/debug/DebugApp.vue').then(({ default: DebugApp }) => {
        createApp(DebugApp).mount('#app')
    })
} else {
    createApp(App).mount('#app');
}
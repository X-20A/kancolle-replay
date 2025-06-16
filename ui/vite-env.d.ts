/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_DEV: boolean,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
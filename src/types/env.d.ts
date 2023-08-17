/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  // API & KEY
  readonly VITE_URL: string
  readonly VITE_PATH: string
  readonly VITE_GOOGLE_MAP_API_KEY: string

  // Web Config
  readonly VITE_TITLE: string
}

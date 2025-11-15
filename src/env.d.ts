/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  // add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

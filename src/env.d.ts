/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  readonly VITE_SITE_URL?: string
  readonly VITE_GSC_VERIFICATION?: string
  readonly VITE_GA4_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

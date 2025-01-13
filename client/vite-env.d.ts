/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_TIME_COUNT_DOWN_OTP: number
  // Thêm các biến khác nếu cần
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

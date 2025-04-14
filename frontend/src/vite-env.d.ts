/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL?: 'http://localhost:8080/api/v1';
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      NEBIUS_API_KEY: string
    }
  }
}

export {}


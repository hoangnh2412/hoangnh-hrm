import { configureJarvisHttp } from '@jarvis/core'

export const BASE_URL = import.meta.env.VITE_API_URL

export const MOCK_ACCOUNT = {
  email: 'admin@gmail.com',
  password: 'Admin@123',
  user: {
    id: 'user-001',
    email: 'admin@gmail.com',
    fullName: 'Admin',
    roles: ['admin'],
  },
} as const

export function isMockAccountCredentials(payload: {
  email: string
  password: string
}) {
  return (
    payload.email.trim().toLowerCase() === MOCK_ACCOUNT.email.toLowerCase() &&
    payload.password === MOCK_ACCOUNT.password
  )
}

export async function mockLogin(payload: {
  email: string
  password: string
}) {
  await new Promise((resolve) => setTimeout(resolve, 250))

  if (!isMockAccountCredentials(payload)) {
    throw new Error('Email hoặc mật khẩu không đúng')
  }

  return {
    user: { ...MOCK_ACCOUNT.user },
    tokens: { accessToken: 'mock-hrm-token' },
  }
}

export function configureHrmHttp() {
  configureJarvisHttp({
    baseURL: BASE_URL,
  })
}

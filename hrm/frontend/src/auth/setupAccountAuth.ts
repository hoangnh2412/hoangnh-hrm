import { accountHttp } from '@jarvis/core'
import { getAccessToken } from './accessToken'

let configured = false

export function setupHrmAccountAuth() {
  if (configured) return
  configured = true

  accountHttp.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

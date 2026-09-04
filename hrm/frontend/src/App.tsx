import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ACCOUNT_ROUTES,
  AdminLayout,
  DashboardPage,
  LoginPage,
} from '@jarvis/core'
import {
  clearAccessToken,
  isAuthenticated,
  setAccessToken,
} from './auth'
import { RequireAuth } from './auth/RequireAuth'
import { mockLogin } from './constants'

function HrmAdminLayout() {
  const navigate = useNavigate()

  return (
    <AdminLayout
      onLogout={async () => {
        clearAccessToken()
        navigate(ACCOUNT_ROUTES.login, { replace: true })
        return false
      }}
    />
  )
}

function GuestLoginPage() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (
    <LoginPage
      callback={{
        onSubmit: async (payload) => {
          const result = await mockLogin(payload)
          setAccessToken(result.tokens.accessToken)
          return result
        },
      }}
    />
  )
}

export default function App() {
  return (
    <Routes>
      <Route path={ACCOUNT_ROUTES.login} element={<GuestLoginPage />} />
      <Route
        element={
          <RequireAuth>
            <HrmAdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage title="HRM" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

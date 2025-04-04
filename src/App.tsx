import { Navigate, Route, Routes } from 'react-router-dom'

import { Home } from './presentation/pages/Home'
import { Login } from './presentation/pages/Login'
import { ProjectPage } from './presentation/pages/Project'

import { useUser } from './hooks/useUser'
import { NotFound } from './presentation/components/NotFound'
import { Register } from './presentation/pages/Register'
import { Profile } from './presentation/pages/Profile'

type ProtectedRouteProps = {
  authenticationPath: string
  outlet: JSX.Element
}

export const App = () => {
  const { isAuth } = useUser()

  function ProtectedRoute({ authenticationPath, outlet }: ProtectedRouteProps) {
    if (isAuth()) {
      return outlet
    } else {
      return <Navigate to={{ pathname: authenticationPath }} />
    }
  }

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/project/:id'
        element={
          <ProtectedRoute
            authenticationPath='/login'
            outlet={<ProjectPage />}
          />
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute
            authenticationPath='/login'
            outlet={<Profile />}
          />
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute authenticationPath='/login' outlet={<Home />} />
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ProjectPage } from './presentation/pages/Project';
import { Login } from './presentation/pages/Login';
import { Home } from './presentation/pages/Home';

import { useUser } from './hooks/useUser';
import { NotFound } from './presentation/components/NotFound';

type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};


export const App = () => {
  const { isAuth } = useUser();

  function ProtectedRoute({ authenticationPath, outlet }: ProtectedRouteProps) {
    if (isAuth()) {
      return outlet;
    } else {
      return <Navigate to={{ pathname: authenticationPath }} />;
    }
  };

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/project/:id' element={<ProtectedRoute authenticationPath='/login' outlet={<ProjectPage />} />} />
      <Route path='/' element={<ProtectedRoute authenticationPath='/login' outlet={<Home />} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

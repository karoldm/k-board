import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Project } from './pages/Project';
import { Login } from './pages/Login';
import { Home } from './pages/Home';

import { useUser } from './hooks/useUser';

type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};


export const App: React.FC = () => {
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
      <Route path='/project/:id' element={<ProtectedRoute authenticationPath='/login' outlet={<Project />} />} />
      <Route path='/' element={<ProtectedRoute authenticationPath='/login' outlet={<Home />} />} />
    </Routes>
  );
}

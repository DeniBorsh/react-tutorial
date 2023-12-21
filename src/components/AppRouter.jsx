import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext)
  if (isLoading)
    return <div></div>
  return (
    isAuth 
    ? <Routes>
        {privateRoutes.map(r =>
          <Route key={r.path} path={r.path} element={<r.component/>} exact={r.exact}/>
        )}
        <Route key="*" path="*" element={<Navigate to="/posts" replace />}/>
      </Routes>
    : <Routes>
        {publicRoutes.map(r =>
          <Route key={r.path} path={r.path} element={<r.component/>} exact={r.exact}/>
        )}
        <Route key="*" path="*" element={<Navigate to="/login" replace />}/>
      </Routes>
  );
};

export default AppRouter;
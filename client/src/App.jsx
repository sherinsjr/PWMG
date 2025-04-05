import { Route, Routes } from 'react-router-dom';

import routes from './routes';
import AuthProvider from './contexts/authContext';
import UserContextProvider from './contexts/userContext';

const renderRoute = (route) => (
  <Route key={route.path} path={route.path} element={route.element}>
    {route.children && route.children.map(renderRoute)}
  </Route>
);
function App() {
  return (
    <AuthProvider>
      <UserContextProvider>
        <Routes>{routes.map(renderRoute)}</Routes>
      </UserContextProvider>
    </AuthProvider>
  );
}

export default App;

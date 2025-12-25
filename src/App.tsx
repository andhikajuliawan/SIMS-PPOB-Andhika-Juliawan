import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Home from './pages/Home/Home.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import Account from './pages/Account/Account.tsx';

function App() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { path: '/', element: <Home /> },
            { path: '/account', element: <Account /> },
          ],
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [{ path: '/login', element: <Login /> }],
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;

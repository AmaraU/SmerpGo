import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Store } from './pages/Store';
import { Home } from './pages/Home';
import { StoreList } from './pages/StoreList';
import { Page404 } from './pages/Page404';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { Overview } from './pages/Dashboard/Overview';
import { UserMgt } from './pages/Dashboard/UserMgt';
import { ActivityLog } from './pages/Dashboard/ActivityLog';
import { UserAnalytics } from './pages/Dashboard/UserAnalytics';
import { Notifications } from './pages/Dashboard/Notifications';
import { DeleteAccount } from './pages/DeleteAccount';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const router = createBrowserRouter(
    [
      { path: '/', element: <Home /> },
      { path: '/:storeId', element: <Store /> },
      { path: '/merchant/:storeId', element: <Store /> },
      { path: '/merchant//:storeId', element: <Store /> },
      { path: '/stores', element: <StoreList /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '*', element: <Page404 /> },
      { path: '/delete', element: <DeleteAccount /> },
      { path: '/signin', element: <Signin /> },
      {
        path: '/dashboard', element: <Dashboard />, children: [
          {
            path: '/dashboard', element: <Overview />
          },
          {
            path: 'usermgt', element: <UserMgt />
          },
          {
            path: 'activitylog', element: <ActivityLog />
          },
          {
            path: 'useranalytics', element: <UserAnalytics />
          },
          {
            path: 'notifications', element: <Notifications />
          },
        ]
      }
    ]
  );

  return (
    <ChakraProvider>
        <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

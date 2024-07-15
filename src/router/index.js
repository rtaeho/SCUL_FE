import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';

const Main = lazy(() => import('../page/main'));
const Auth = lazy(() => import('../page/auth'));
const Loading = () => <>로딩중입니다.</>;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: 'main',
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';

const Main = lazy(() => import('../page/main'));
const Auth = lazy(() => import('../page/auth'));
const Community = lazy(() => import('../page/community'));
const Club = lazy(() => import('../page/club'));
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
      {
        path: 'community',
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
          </Suspense>
        ),
      },
      {
        path: 'club',
        element: (
          <Suspense fallback={<Loading />}>
            <Club />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

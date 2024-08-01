import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';

const Main = lazy(() => import('../page/main'));
const Auth = lazy(() => import('../page/auth'));
const Community = lazy(() => import('../page/community'));
const Initial = lazy(() => import('../page/initial'));
const Club = lazy(() => import('../page/club'));
const Policy = lazy(() => import('../page/policy'));
const CreatePost = lazy(() => import('../page/createPost'));
const ClubPost = lazy(() => import('../page/clubPost'));

const Loading = () => <>로딩중입니다.</>;

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
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
        path: 'home',
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: 'main/:sport',
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: 'community/:board/:sport',
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
          </Suspense>
        ),
      },
      {
        path: 'createPost/:sport',
        element: (
          <Suspense fallback={<Loading />}>
            <CreatePost />
          </Suspense>
        ),
      },
      {
        path: 'club/:sport',
        element: (
          <Suspense fallback={<Loading />}>
            <Club />
          </Suspense>
        ),
      },
      {
        path: 'clubPost/:sport',
        element: (
          <Suspense fallback={<Loading />}>
            <ClubPost />
          </Suspense>
        ),
      },
      {
        path: 'policy',
        element: (
          <Suspense fallback={<Loading />}>
            <Policy />
          </Suspense>
        ),
      },

      {
        path: 'auth',
        element: (
          <Suspense fallback={<Loading />}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: 'initial',
        element: (
          <Suspense fallback={<Loading />}>
            <Initial />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

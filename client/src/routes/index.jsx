import { Flex } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { Navigate } from 'react-router-dom';
import { AuthLayout, DesktopLayout } from '../views/layouts';
import { Suspense } from 'react';
import {
  Dashboard,
  Entries,
  Login,
  Meals,
  Planner,
  Settings,
  SignUp,
  WorkoutLibrary,
} from '../pages';
import { RequireAuth } from '../contexts/authContext';
import WorkoutDetailsPage from '../pages/workoutlibrary/workoutDetailsPage';
import CreateWorkout from '../pages/workoutlibrary/createWorkout';
import UpdateWorkout from '../pages/workoutlibrary/updateWorkout';
import PageNotFound from '../pages/page-not-found';

const routes = [
  {
    path: '/',
    element: <AuthLayout />,
    index: true,
    layout: true,
    children: [
      { path: '', element: <Navigate to='user/dashboard' /> },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Flex>loading.....</Flex>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<Flex>loading.....</Flex>}>
            <SignUp />
          </Suspense>
        ),
      },
      { path: '*', element: <PageNotFound /> },
    ],
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <DesktopLayout />
      </RequireAuth>
    ),
    index: true,
    layout: true,
    children: [
      { path: '', element: <Navigate to='user/dashboard' /> },
      { path: 'user/dashboard', element: <Dashboard /> },
      { path: 'user/planner', element: <Planner /> },
      { path: 'user/planner/entries', element: <Entries /> },
      { path: 'user/planner/meals', element: <Meals /> },
      { path: 'user/workoutlibrary', element: <WorkoutLibrary /> },
      { path: 'user/workoutlibrary/workout', element: <WorkoutDetailsPage /> },
      {
        path: 'user/workoutlibrary/workout/create',
        element: <CreateWorkout />,
      },
      {
        path: 'user/workoutlibrary/workout/update/:workoutId',
        element: <UpdateWorkout />,
      },
    ],
  },
];

export const sidebarRoutes = [
  {
    routeName: 'Dashboard',
    element: Dashboard,
    path: '/user/dashboard',
    protected: false,
    icon: <RxDashboard />,
  },
  {
    routeName: 'Settings',
    element: Settings,
    path: '/user/settings',
    protected: false,
    icon: <FiSettings />,
  },
];

export default routes;

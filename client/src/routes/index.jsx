import { Flex } from '@chakra-ui/react';
import { FiSettings, FiUsers } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { TbReportAnalytics } from 'react-icons/tb';
import { CiCalendarDate } from "react-icons/ci";
import { Navigate } from 'react-router-dom';
import { AuthLayout, DesktopLayout } from '../views/layouts';
import { Suspense } from 'react';
import {
  ClientList,
  CreateClient,
  CreateReport,
  CreateUser,
  CreateWorkoutPlanner,
  Dashboard,
  Entries,
  Login,
  Meals,
  Planner,
  Report,
  Settings,
  SignUp,
  UpdateClientDetails,
  UserList,
  WorkoutLibrary,
  WorkoutPlansPage,
  WorkoutPlanViewPage,
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
      { path: 'user/users', element: <UserList /> },
      { path: 'user/users/create', element: <CreateUser /> },
      { path: 'user/clients', element: <ClientList /> },
      { path: 'user/clients/create', element: <CreateClient /> },
      {
        path: 'user/clients/update/:clientId',
        element: <UpdateClientDetails />,
      },
      { path: 'user/report', element: <Report /> },
      { path: 'user/report/create', element: <CreateReport /> },
      { path: 'user/settings', element: <Settings /> },
      { path: 'user/workout-plan', element: <WorkoutPlansPage /> },
      { path: 'user/workout-plan/create', element: <CreateWorkoutPlanner /> },
      { path: 'user/workout-plan/view/:id', element: <WorkoutPlanViewPage /> },
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
    routeName: 'Users',
    element: UserList,
    path: '/user/users',
    protected: false,
    icon: <FiUsers />,
  },
  {
    routeName: 'Clients',
    element: ClientList,
    path: '/user/clients',
    protected: false,
    icon: <FiUsers />,
  },
  {
    routeName: 'Report',
    element: Report,
    path: '/user/report',
    protected: false,
    icon: <TbReportAnalytics />,
  },
  {
    routeName: 'Plan',
    element: WorkoutPlansPage,
    path: '/user/workout-plan',
    protected: false,
    icon: <CiCalendarDate />,
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

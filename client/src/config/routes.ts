import IRoute from '../interfaces/route';
import CreateEvent from '../pages/createEvent';
import HomePage from '../pages/homePage';
import signUpPage from '../pages/signUpPage';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true
    },
    {
        path: '/createEvent',
        name: 'Create event Page',
        component: CreateEvent,
        exact: true
    },
    {
        path: '/signUpPage',
        name: 'Sign up page Page',
        component: signUpPage,
        exact: true
    }
    // {
    //     path: '/about/:number',
    //     name: 'About Page',
    //     component: AboutPage,
    //     exact: true
    // },
]

export default routes;
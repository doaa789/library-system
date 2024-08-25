import HomePage from '../components/HomePage.vue';
import CartPage from '../components/CartPage.vue';
import CheckoutPage from '../components/CheckoutPage.vue';
import BorrowingHistoryPage from '../components/BorrowingHistoryPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/cart', component: CartPage },
  { path: '/checkout', component: CheckoutPage },
  { path: '/history', component: BorrowingHistoryPage },
];

export default routes;







//import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

//const routes = [
 // {
 //   path: '/',
  //  name: 'home',
  //  component: HomeView
  //},
  //{
   // path: '/about',
   // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //}
//]

//const router = createRouter({
 // history: createWebHistory(process.env.BASE_URL),
 // routes
//})

//export default router

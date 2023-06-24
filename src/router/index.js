import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../Layout/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/front/Home/HomeView.vue')
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/front/Login/LoginView.vue')
        },
        {
          path: 'city/:cityName',
          name: 'City',
          component: () => import('../views/front/City/CityView.vue')
        },
        {
          path: 'city/:cityName/products/:category?',
          name: 'Products',
          component: () => import('../views/front/Products/ProductsView.vue')
        },
        {
          path: 'product/:productId',
          name: 'Product',
          component: () => import('../views/front/Product/ProductView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../Layout/Dashboard.vue'),
      children: [
        {
          path: 'home',
          name: 'AdminHome',
          component: () => import('../views/admin/Home/AdminHome.vue')
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('../views/admin/Product/AdminProducts.vue')
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;

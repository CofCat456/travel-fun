import { createRouter, createWebHashHistory } from 'vue-router';
import { useCartStore } from '@/stores';

const { VITE_TITLE } = import.meta.env;

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Front',
      component: () => import('../layout/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/front/Home/HomeView.vue'),
          meta: {
            title: VITE_TITLE,
          },
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/front/Login/LoginView.vue'),
          meta: {
            title: '後台登入 - Travel Fun',
          },
        },
        {
          path: 'country/:countryName',
          name: 'Country',
          component: () => import('../views/front/Country/CountryView.vue'),
          meta: {
            title: '台灣自由行 - Travel Fun',
          },
        },
        {
          path: 'city/:cityName',
          name: 'City',
          component: () => import('../views/front/City/CityView.vue'),
          meta: {
            title: '全台熱門景點 - Travel Fun',
          },
        },
        {
          path: 'city/:cityName/products/:category?',
          name: 'CityProducts',
          component: () => import('../views/front/Products/ProductsView.vue'),
          props: route => ({ sort: route.query.sort, mode: 'city' }),
          meta: {
            title: '全台熱門景點 - Travel Fun',
          },
        },
        {
          path: 'country/:countryName/products/:category?',
          name: 'CountryProducts',
          component: () => import('../views/front/Products/ProductsView.vue'),
          props: route => ({ sort: route.query.sort, mode: 'country' }),
          meta: {
            title: '台灣自由行 - Travel Fun',
          },
        },
        {
          path: 'product/:productId',
          name: 'Product',
          component: () => import('../views/front/Product/ProductView.vue'),
          meta: {
            title: '旅遊行程 - Travel Fun',
          },
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/front/Cart/CartView.vue'),
          meta: {
            title: '購物車 - Travel Fun',
          },
          async beforeEnter(_to, _from) {
            const cartStore = useCartStore();
            await cartStore.getCarts();
          },
        },
      ],
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('../layout/Dashboard.vue'),
      children: [
        {
          path: 'home',
          name: 'AdminHome',
          component: () => import('../views/admin/Home/AdminHomeView.vue'),
          meta: {
            title: 'Dashboard',
            requiresAuth: true,
          },
        },
        {
          path: 'list',
          meta: {
            title: '列表頁面',
            requiresAuth: true,
          },
          children: [
            {
              path: 'products',
              name: 'AdminProducts',
              component: () => import('../views/admin/Product/AdminProducts.vue'),
              meta: {
                title: '產品列表',
                requiresAuth: true,
              },
            },
            {
              path: 'shopCarts',
              name: 'AdminShopCarts',
              component: () => import('../views/admin/ShopCart/AdminShopCarts.vue'),
              meta: {
                title: '購物車列表',
                requiresAuth: true,
              },
            },
          ],
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;

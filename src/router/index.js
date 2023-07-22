import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layout/FrontLayout.vue'),
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
          path: 'country/:countryName',
          name: 'Country',
          component: () => import('../views/front/Country/CountryView.vue')
        },
        {
          path: 'city/:cityName',
          name: 'City',
          component: () => import('../views/front/City/CityView.vue')
        },
        {
          path: 'city/:cityName/products/:category?',
          name: 'CityProducts',
          component: () => import('../views/front/Products/ProductsView.vue'),
          props: (route) => ({ sort: route.query.sort, mode: 'city' })
        },
        {
          path: 'country/:countryName/products/:category?',
          name: 'CountryProducts',
          component: () => import('../views/front/Products/ProductsView.vue'),
          props: (route) => ({ sort: route.query.sort, mode: 'country' })
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
      component: () => import('../layout/Dashboard.vue'),
      children: [
        {
          path: 'home',
          name: 'AdminHome',
          component: () => import('../views/admin/Home/AdminHomeView.vue'),
          meta: {
            title: 'Dashboard'
          }
        },
        {
          path: 'list',
          meta: {
            title: '列表頁面'
          },
          children: [
            {
              path: 'products',
              name: 'AdminProducts',
              component: () => import('../views/admin/Product/AdminProducts.vue'),
              meta: {
                title: '產品列表'
              }
            }
          ]
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;

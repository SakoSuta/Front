import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue')
      },
      {
        path: 'tab5',
        component: () => import('@/views/Tab5Page.vue')
      },
    ],
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifie si la route nécessite une authentification
    if (!isAuthenticated) {
      // Redirige vers la page de login si l'utilisateur n'est pas authentifié
      if (to.path !== '/tabs/tab4') {
        next('/tabs/tab4');
      } else {
        next(); // Évite la redirection infinie
      }
    } else {
      next(); // Poursuit la navigation si l'utilisateur est authentifié
    }
  } else {
    next(); // Poursuit la navigation pour les routes qui ne nécessitent pas d'authentification
  }
});


export default router

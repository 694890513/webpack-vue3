import { RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHashHistory } from 'vue-router';

const dynamicRoutes: RouteDatas = [
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        }
      }
    ]
  }
]

export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/demo',
		name: 'demo',
		component: () => import('@/views/demo/index.vue'),
		meta: {
			title: 'demo',
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
  {
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('@/views/errorPage/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			isHide: true,
		},
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...dynamicRoutes, ...staticRoutes],
});


// 路由加载前
router.beforeEach(async (to, from, next) => {
	NProgress.configure({ showSpinner: false });
  next()
	// if (to.meta.title) NProgress.start();
	// const token = Session.get('token');
	// if ((to.path === '/login' || to.path === '/')) {
	// 	next();
	// 	NProgress.done();
	// } else {
	// 	if (!token && (to.path !== '/' && to.path !== '/login')) {
	// 		next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
	// 		Session.clear();
	// 		NProgress.done();
	// 	} else if (token && to.path === '/login') {
	// 		next('/home');
	// 		NProgress.done();
	// 	} else {
  //     next()
	// 	}
	// }
});

// 路由加载后
router.afterEach(() => {
	NProgress.done();
});

// 导出路由
export default router;
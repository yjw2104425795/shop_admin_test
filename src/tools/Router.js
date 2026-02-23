import {createRouter,createWebHistory} from 'vue-router'
import Store from '../tools/Storage'


const routes = [
    { 
		path: '/login', component:()=>import('../components/Login/Login.vue'), name: "login" ,
	},
    { 
		path: '/home', component:()=>import('../components/Home/Home.vue'), name: "home" ,
		children:[{
			path:'order/:type', // 0是普通订单，1是秒杀订单
			component:()=>import('../components/Order/Order.vue'),
			name:'Order'
		},
		{
			path:'goods/:type',
			component:()=>import('../components/Goods/Goods.vue'),
			name:'Goods'
		},
		{
			path:'addgoods/:type',
			component:()=>import('../components/Goods/AddGoods.vue'),
			name:'AddGoods'
		},
		{
			path:'category',
			component:()=>import('../components/Goods/GoodsCategory.vue'),
			name:'GoodsCategory'
		},
		{
			path:'ownerlist',
			component:()=>import('../components/Manager/ManagerList.vue'),
			name:'ManagerList'
		},
		{
			path:'ownerreq',
			component:()=>import('../components/Manager/ManagerReqList.vue'),
			name:'ManagerReqList'
		},
		{
			path:'ownerorder',
			component:()=>import('../components/Manager/ManagerOrder.vue'),
			name:'ManagerOrder'
		},
		{
			path:'tradeinfo',
			component:()=>import('../components/Financial/TradeInfo.vue'),
			name:"TradeInfo"
		},
		{
			path:'tradelist',
			component:()=>import('../components/Financial/TradeList.vue'),
			name:'TradeList'
		},
		{
			path:'data',
			component:()=>import('../components/Financial/DataCom.vue'),
			name:'DataCom'
		}],
		redirect:'/home/order/0'
	}
]

// 创建路由实例
const Router = createRouter({
    history: createWebHistory(),
	routes
});

// 路由守卫，当未登录时，非登录页面的任何页面都不允许跳转
Router.beforeEach((to, from, next) => {
  const userStore = Store();
  let isLogin = userStore.isLogin;
  if (isLogin || to.name === "login") {
    next();
  } else {
    next({ name: "login" });
  }
});

export default Router;
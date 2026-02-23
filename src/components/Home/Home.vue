<script setup>
	import { useRouter } from 'vue-router';
	import Storage from '../../tools/Storage.js'
	const router = useRouter()
	const store = Storage()
	function selectItem(path){
		router.push(path)
	}
	function logout(){
		store.clearUserInfo();
		router.push({name:'login'})
	}
</script>

<template>
	<el-container id="container">
		<el-aside width="250px">
			<el-container id="top">
				<img src="/xd.jpg" style="width:25px;height:25px;margin:auto;margin-right:0;" />
				<div style="margin:auto;margin-left:10px;color:#ffffff;font-size:17px">
					电商管理平台
				</div>
			</el-container>
			<el-menu :default-active="$route.path" style="height:100%"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b" @select="selectItem">
				<el-sub-menu index="1">
					<template #title>
						<el-icon><List/></el-icon>
						<span>订单管理</span>
					</template>
					<el-menu-item index="/home/order/0">普通订单</el-menu-item>
					<el-menu-item index="/home/order/1">秒杀订单</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="2">
					<template #title>
						<el-icon><Shop/></el-icon>
						<span>商品管理</span>
					</template>
					<el-menu-item index="/home/goods/0">普通商品</el-menu-item>
					<el-menu-item index="/home/goods/1">秒杀商品</el-menu-item>
					<el-menu-item index="/home/goods/2">今日推荐</el-menu-item>
					<el-menu-item index="/home/category">商品分类</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="3">
					<template #title>
						<el-icon><Avatar/></el-icon>
						<span>店长管理</span>
					</template>
					<el-menu-item index="/home/ownerlist">店长列表</el-menu-item>
					<el-menu-item index="/home/ownerreq">店长申请审批列表</el-menu-item>
					<el-menu-item index="/home/ownerorder">店长订单</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="4">
					<template #title>
						<el-icon><Ticket/></el-icon>
						<span>财务管理</span>
					</template>
					<el-menu-item index="/home/tradeinfo">交易明细</el-menu-item>
					<el-menu-item index="/home/tradelist">账务对账单</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="5">
					<template #title>
						<el-icon><Tools/></el-icon>
						<span>基础管理</span>
					</template>
					<el-menu-item index="/home/data">数据统计</el-menu-item>
				</el-sub-menu>
			</el-menu>
		</el-aside>
		<el-main style="padding:0">
			<el-header style="margin:0;padding:0;" height="80px">
				<el-container style="background-color:blanchedalmond;margin:0;padding:0;height: 80px">
					<div style="margin:auto;margin-left:100px">
						<h1>欢迎您登录后台管理系统，管理员</h1>
					</div>
					<div style="margin:auto;margin-right:50px">
						<el-button type="primary" @click="logout">注销</el-button>
					</div>
				</el-container>
			</el-header>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  position: absolute;
}

#top {
  background-color: #545c64;
  margin-right: 1px;
  text-align: center;
  height: 60px;
}
</style>
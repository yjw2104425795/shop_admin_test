<script setup>
	import { ref } from 'vue';
	import BaseSetting from './GoodsBaseSetting.vue'
	import PriceSetting from './GoodsPriceSetting.vue'
	import DetailSetting from './GoodsDetailSetting.vue'
	const activeTab = ref([1])
	function handleClick(idx){
		
	}
</script>

<template>
	<div class="content-container" direction="vertical">
	  <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
	    <el-tab-pane label="基础设置" name="1">
	      <BaseSetting></BaseSetting>
	    </el-tab-pane>
	    <el-tab-pane label="价格库存" name="2">
	      <PriceSetting></PriceSetting>
	    </el-tab-pane>
	    <el-tab-pane label="商品详情" name="3">
	      <DetailSetting></DetailSetting>
	    </el-tab-pane>
	  </el-tabs>
	</div>
</template>

<style scoped>
	
</style>
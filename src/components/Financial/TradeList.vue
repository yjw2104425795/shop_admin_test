<script setup>
	import Mock from "../../tools/Mock.js"
	import { ElMessage } from "element-plus";
	import { ref,onMounted } from "vue";
	const tradeList = ref([])
	onMounted(() => {
	    tradeList.value = Mock.getTradeList()
	})
	
	function handleClick() {
	    tradeList.value = Mock.getTradeList()
	}
</script>

<template>
	<div class="content-container" direction="vertical">
	    <div>
	        <el-tabs type="card" @tab-click="handleClick">
	            <el-tab-pane label="日汇总"></el-tab-pane>
	            <el-tab-pane label="月汇总"></el-tab-pane>
	        </el-tabs>
	    </div>
	    <div>
	        <el-table
	        :data="tradeList"
	        tooltip-effect="dark"
	        style="width: 100%">
	            <el-table-column
	            label="日期"
	            width="300"
	            prop="time">
	            </el-table-column>
	            <el-table-column
	            label="收入"
	            width="300"
	            prop="income">
	            </el-table-column>
	            <el-table-column
	            label="支出"
	            width="300"
	            prop="expend">
	            </el-table-column>
	            <el-table-column
	            label="备注"
	            width="300"
	            prop="info">
	            </el-table-column>
	        </el-table>
	    </div>
	</div>
</template>

<style scoped>
	
</style>
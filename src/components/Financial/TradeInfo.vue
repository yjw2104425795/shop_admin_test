<script setup>
	import Mock from '../../tools/Mock';
	import Tools from '../../tools/Tools.js'
	import { ElMessage } from 'element-plus';
	import { ref,onMounted } from 'vue';
	const queryParams = ref({
		proName:"",
		userName:"",
		phone:"",
		type:"",
		id:"",
		payTime:""
	})
	const tradeList = ref([])
	onMounted(()=>{
		tradeList.value = Mock.getTradeInfo();
	})
	function search() {
	    ElMessage({
	        type:'success',
	        message:'请求参数：' + JSON.stringify(queryParams.value)
	    });
	    tradeList.value = Mock.getTradeInfo();
	}
	function clear() {
	    queryParams.value = {
	        proName:"",
	        userName:"",
	        phone:"",
	        type:"",
	        id:"",
	        payTime:""
	    };
	    tradeList.value = Mock.getTradeInfo();
	}
	function exportData() {
	    Tools.exportJson('交易明细.json', JSON.stringify(tradeList.value));
	}
</script>

<template>
	<div class="content-container" direction="vertical">
	    <div>
	        <el-container class="content-row">
	            <div class="input-tip">
	                商品名称:
	            </div>
	            <div class="input-field">
	                <el-input v-model="queryParams.proName"></el-input>
	            </div>
	            <div class="input-tip">
	                用户名称:
	            </div>
	            <div class="input-field">
	                <el-input v-model="queryParams.userName"></el-input>
	            </div>
	            <div class="input-tip">
	                手机号码:
	            </div>
	            <div class="input-field">
	                <el-input v-model="queryParams.phone"></el-input>
	            </div>                
	        </el-container>
	        <el-container class="content-row">
	            <div class="input-tip">
	                订单类型:
	            </div>
	            <div class="input-field">
	                <el-input v-model="queryParams.type"></el-input>
	            </div>
	            <div class="input-tip">
	                平台单号:
	            </div>
	            <div class="input-field">
	                <el-input v-model="queryParams.id"></el-input>
	            </div>
	            <div class="input-tip">
	                支付时间:
	            </div>
	            <div class="input-field">
	                <el-date-picker
	                type="daterange"
	                range-separator="至"
	                start-placeholder="开始日期"
	                end-placeholder="结束日期"
	                v-model="queryParams.payTime">
	                </el-date-picker>
	            </div>             
	        </el-container>
	        <el-container class="content-row">
	            <el-button type="primary" @click="search">搜索</el-button>
	            <el-button type="primary" @click="clear">清空搜索条件</el-button>
	            <el-button type="primary" @click="exportData">导出</el-button>
	        </el-container>
	    </div>
	    <div>
	        <el-table
	        :data="tradeList"
	        tooltip-effect="dark"
	        style="width: 100%">
	            <el-table-column
	            label="名称"
	            width="400"
	            prop="name">
	            </el-table-column>
	            <el-table-column
	            label="单号"
	            width="150"
	            prop="id">
	            </el-table-column>
	            <el-table-column
	            label="用户"
	            width="100"
	            prop="user">
	            </el-table-column>
	            <el-table-column
	            label="支付方式"
	            width="100"
	            prop="payType">
	            </el-table-column>
	            <el-table-column
	            label="时间"
	            width="300"
	            prop="time">
	            </el-table-column>
	        </el-table>
	    </div>
	</div>
</template>

<style scoped>
	
</style>
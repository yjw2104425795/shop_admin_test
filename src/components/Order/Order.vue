<script setup>
	import Mock from '../../tools/Mock';
	import Tools from '../../tools/Tools';
	import { ref,onMounted } from 'vue';
	import {useRoute,onBeforeRouteUpdate} from 'vue-router'
	import { ElMessage } from 'element-plus';
	//路由对象
	const route = useRoute();
	//订单列表数据
	const orderList = ref([]);
	//筛选订单参数
	const queryParam = ref({
		goods:'',
		consignee:'',
		phone:'',
		name:'',
		payTime:'',
		sendTime:''
	})
	//当前选中的订单对象
	const multipleSelection = ref([])
	//组件加载时获取数据
	onMounted(()=>{
		orderList.value = Mock.getOrder(route.params.type)
	})
	//路由更新时刷新数据
	onBeforeRouteUpdate((to)=>{
		orderList.value = Mock.getOrder(to.params.type)
	})
	//模拟请求数据
	function requestData(){
		ElMessage({
			type:'success',
			message:'筛选请求数据:'+JSON.stringify(queryParam.value)
		})
		orderList.value = Mock.getOrder(route.params.type)
	}
	//切换tab刷新数据
	function handleClick(tab){
		ElMessage({
			type:'success',
			message:'切换tab刷新数据:'+tab.props.label
		})
		orderList.value = Mock.getOrder(route.params.type)
	}
	//清空筛选项
	function clear(){
		queryParam.value = {
			goods:'',
			consignee:'',
			phone:'',
			name:'',
			payTime:'',
			sendTime:''
		}
		orderList.value = Mock.getOrder(route.params.type)
	}
	//导出订单
	function exportData(){
		Tools.exportJson('订单.json', JSON.stringify(orderList.value))
	}
	// 导出选中的发货单
	function exportDispatchGoods(){
		Tools.exportJson('发货单.json', JSON.stringify(multipleSelection.value))
	}
	//处理多选
	function handleSelectionChange(val){
		multipleSelection.value = val
	}
	//进行发货
	function dispatchGoods(){
		ElMessage({
			type:"success",
			message:'发货商品:'+JSON.stringify(multipleSelection.value)
		})
	}
	//删除订单
	function deleteItem(index){
		orderList.value.splice(index,1)
	}
	//联系用户
	function callUser(item){
		ElMessage({
			type:'success',
			message:'联系客户:'+item.phone
		})
	}
</script> 

<template>
	<div class="content-container" direction='vertical'>
		<!-- Input -->
		<div>
			<el-container class="content-row">
				<div class="input-tip">
					商品名词：
				</div>
				<div class="input-field">
					<el-input v-model="queryParam.goods"></el-input>
				</div>
				<div class="input-tip">
					收货人：
				</div>
				<div class="input-field">
					<el-input v-model="queryParam.consignee"></el-input>
				</div>
				<div class="input-tip">
					支付时间：
				</div>
				<div class="input-field">
					<el-date-picker 
					type="daterange" 
					range-separator="至" 
					start-placeholder="开始时间" 
					end-placeholder="结束时间" 
					v-model="queryParam.payTime"></el-date-picker>
				</div>
			</el-container>
			<el-container class="content-row">
				<div class="input-tip">
					用户名称：
				</div>
				<div class="input-field">
					<el-input v-model="queryParam.name"></el-input>
				</div>
				<div class="input-tip">
					手机号：
				</div>
				<div class="input-field">
					<el-input v-model="queryParam.phone"></el-input>
				</div>
				<div class="input-tip">
					发货时间：
				</div>
				<div class="input-field">
					<el-date-picker
					  type="daterange"
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期"
					  v-model="queryParam.sendTime"></el-date-picker>
				</div>
			</el-container>
		</div>
		<div class="content-row">
			<el-container>
				<el-button type="primary" @click="requestData">筛选</el-button>
				<el-button type="danger" @click="clear">清空筛选</el-button>
				<el-button type="primary" @click="exportData">导出</el-button>
				<el-button type="primary" @click="dispatchGoods">批量发货</el-button>
				<el-button type="primary" @click="exportDispatchGoods">下载批量发货</el-button>
			</el-container>
		</div>
		<div>
			<el-tabs type="card" @tab-click="handleClick">
			  <el-tab-pane label="全部"></el-tab-pane>
			  <el-tab-pane label="未支付"></el-tab-pane>
			  <el-tab-pane label="已支付"></el-tab-pane>
			  <el-tab-pane label="待发货"></el-tab-pane>
			  <el-tab-pane label="已发货"></el-tab-pane>
			  <el-tab-pane label="支付超时"></el-tab-pane>
			</el-tabs>
			<el-table ref="multipleTable" :data="orderList" tooltip-effect="dark"
			style="width: 100%;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="商品" width="100" prop="name"></el-table-column>
				<el-table-column label="总价/数量" width="100" prop="price"></el-table-column>
				<el-table-column label="买家信息" width="100" prop="buyer"></el-table-column>
				<el-table-column label="交易时间" width="200" prop="time"></el-table-column>
				<el-table-column label="分销信息" width="100">
				    <template #default="scope">
				      <el-tag>{{ scope.row.role ? '经理' : '分销员' }}</el-tag>
				    </template>
				</el-table-column>
				<el-table-column label="状态" width="100">
				    <template #default="scope">
				      <el-tag :type="scope.row.state ? 'success' : 'danger'">
				        {{ scope.row.state ? '已完成' : '未完成' }}
				      </el-tag>
				    </template>
				</el-table-column>
				<el-table-column label="操作" width="200">
				    <template #default="scope">
				      <el-button size="small" type="danger" @click="deleteItem(scope.$index)">删除</el-button>
				      <el-button size="small" type="primary" @click="callUser(scope.row)">联系客户</el-button>
				    </template>
				</el-table-column>
				<el-table-column label="支付方式" width="100">
				    <template #default="scope">
				      <el-tag size="default">{{ scope.row.payType ? '微信' : '支付宝' }}</el-tag>
				    </template>
				</el-table-column>
				<el-table-column label="来源" width="200" prop="source"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<style scoped>
	
</style>
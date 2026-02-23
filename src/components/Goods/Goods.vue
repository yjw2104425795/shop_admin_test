<script setup>
	import Mock from '../../tools/Mock';
	import { ref,computed,onMounted } from 'vue';
	import { useRoute,useRouter,onBeforeRouteUpdate } from 'vue-router';
	import { ElMessage } from 'element-plus';
	const route = useRoute()
	const router = useRouter()
	const goodsData = ref([])
	const categorys = ref([
		'全部',
		'男装',
		'女装'
	])
	const queryParams = ref([{
		name:'',
		id:'',
		category:'',
		sellMode:'',
		expMode:''
	}])
	const sellModeString = computed({
		get(){
			if(queryParams.value.sellMode === 2){
				return "全部"
			}
			return queryParams.value.sellMode === 0 ? "是":'否'
		},
		set(val){
			queryParams.value.sellMode = val
		}
	})
	const expModeString = computed({
		get(){
			if(queryParams.value.expMode === 2){
				return "全部"
			}
			return queryParams.value.expMode === 0 ? "是":"否"
		}
	})
	// 组件挂载时获取数据
	onMounted(()=>{
		goodsData.value = Mock.getGoods(route.params.type)
	})
	// 路由更新时刷新数据
	onBeforeRouteUpdate((to)=>{
		goodsData.value = Mock.getGoods(to.params.type)
	})
	function requestData(){
		ElMessage({
			message: '筛选请求参数: ' + JSON.stringify(queryParams.value),
			type:'success'
		})
		goodsData.value = Mock.getGoods(route.params.type)
	}
	function operate(item){
		item.state = !item.state
	}
	function clear(){
		queryParams.value={
			name: "",
			id: "",
			category: "",
			sellMode: 2,
			expMode: 2,
		}
		goodsData.value = Mock.getGoods(route.params.type)
	}
	function addGood(){
		router.push({name:'AddGoods',params:{type:route.params.type}})
	}
</script>

<template>
	<div class="content-container" direction="vertical">
	  <!-- input -->
	  <div>
	    <el-container class="content-row">
	      <div class="input-tip">商品名称:</div>
	      <div class="input-field">
	        <el-input v-model="queryParams.name"></el-input>
	      </div>
	      <div class="input-tip">商品编号:</div>
	      <div class="input-field">
	        <el-input v-model="queryParams.id"></el-input>
	      </div>
	      <div class="input-tip">商品分类:</div>
	      <div class="input-field">
	        <el-select style="width:150px;" v-model="queryParams.category" placeholder="请选择分类">
	          <el-option v-for="item in categorys" :key="item" :label="item" :value="item"></el-option>
	        </el-select>
	      </div>
	    </el-container>
	    <el-container class="content-row">
	      <div class="input-tip">是否上架:</div>
	      <div class="input-field">
	        <el-select v-model="sellModeString" style="width: 150px;">
	          <el-option key="0" label="否" value="0"></el-option>
	          <el-option key="1" label="是" value="1"></el-option>
	          <el-option key="2" label="全部" value="2"></el-option>
	        </el-select>
	      </div>
	      <div class="input-tip">是否过期:</div>
	      <div class="input-field">
	        <el-select v-model="expModeString" style="width:150px;">
	          <el-option key="0" label="否" value="0"></el-option>
	          <el-option key="1" label="是" value="1"></el-option>
	          <el-option key="2" label="全部" value="2"></el-option>
	        </el-select>
	      </div>
	    </el-container>
	  </div>
	  <!-- button -->
	  <div class="content-row">
	    <el-container>
	      <el-button type="primary" @click="requestData">检索</el-button>
	      <el-button type="primary" @click="clear">显示全部</el-button>
	      <el-button type="success" @click="addGood">新增商品</el-button>
	    </el-container>
	  </div>
	  <!-- list -->
	  <div>
	    <el-table :data="goodsData" tooltip-effect="dark" style="width:100%">
	      <el-table-column label="商品" width="100">
	        <template #default="scope">
	          <div style="text-align:center">
	            <el-image :src="scope.row.img" style="width: 60px; height: 100px"></el-image>
	          </div>
	          <div style="text-align:center">{{ scope.row.name }}</div>
	        </template>
	      </el-table-column>
	      <el-table-column label="价格" width="100" prop="price"></el-table-column>
	      <el-table-column label="销量" width="100" prop="sellCount"></el-table-column>
	      <el-table-column label="库存" width="100" prop="count"></el-table-column>
	      <el-table-column label="退款数量" width="100" prop="back"></el-table-column>
	      <el-table-column label="退款金额" width="100" prop="backPrice"></el-table-column>
	      <el-table-column label="操作" width="100" prop="name">
	        <template #default="scope">
	          <el-button @click="operate(scope.row)" :type="scope.row.state ? 'danger' : 'success'">
	            {{ scope.row.state ? '下架' : '上架' }}
	          </el-button>
	        </template>
	      </el-table-column>
	      <el-table-column label="管理员" width="100" prop="owner"></el-table-column>
	      <el-table-column label="更新时间" width="200" prop="time"></el-table-column>
	    </el-table>
	  </div>
	</div>
</template>

<style scoped>
	
</style>
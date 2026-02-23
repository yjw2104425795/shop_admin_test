<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { ElMessage } from 'element-plus';
	import GoodsEdit from './GoodsEdit.vue'
	const router = useRouter()
	const content = ref('')
	function contentChange(c){
		content.value = c;
	}
	function cancel(){
		router.go(-1)
	}
	function submit(){
		ElMessage({
		    type:'success',
		    message:'设置详情HTML：' + content.value
		})
	}
</script>

<template>
	<div style="margin-bottom:20px">
	    <goods-edit @contentChange="contentChange"></goods-edit>
	</div>
	<el-container class="content-row">
	    <el-button type="success" plain @click="submit">提交</el-button>
	    <div style="margin-left:40px"></div>
	    <el-button type="warning" plain @click="cancel">取消</el-button>
	</el-container>
</template>

<style scoped>
	
</style>
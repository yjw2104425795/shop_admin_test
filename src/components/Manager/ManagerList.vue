<script setup>
	import Mock from '../../tools/Mock';
	import {ref,onMounted} from 'vue';
	import { ElMessage } from 'element-plus';
	const queryParams = ref({phone: "", name: "", state: ""})
	const managerList = ref([])
	onMounted(()=>{
		managerList.value = Mock.getManagerList();
	})
	function search(){
		ElMessage({
			type:'success',
			message:'请求参数:' + JSON.stringify(queryParams.value)
		})
		managerList.value = Mock.getManagerList()
	}
	function clear(){
		queryParams.value = {phone: "", name: "", state: ""};
		managerList.value = Mock.getManagerList();
	}
</script>

<template>
	<div class="content-container" direction="vertical">
        <div>
            <el-container class="content-row">
                <div class="input-tip">店长手机:</div>
                <div class="input-field">
                    <el-input v-model="queryParams.phone"></el-input>
                </div>
                <div class="input-tip">店长昵称:</div>
                <div class="input-field">
                    <el-input v-model="queryParams.name"></el-input>
                </div>
                <div class="input-tip">店长状态:</div>
                <div class="input-field">
                    <el-select style="width:150px" v-model="queryParams.state" placeholder="请选择">
                        <el-option key="1" label="后台开通" value="1"></el-option>
                        <el-option key="2" label="站外申请" value="2"></el-option>
                    </el-select>
                </div>
            </el-container>
            <el-container class="content-row">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clear">清空搜索条件</el-button>
            </el-container>
        </div>
        <div>
            <el-table :data="managerList" tooltip-effect="dark" style="width: 100%">
                <el-table-column label="分销人信息" width="200" prop="people"></el-table-column>
                <el-table-column label="微信信息" width="150" prop="weixin"></el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.state ? 'success' : 'primary'">
                            {{ scope.row.state ? '激活' : '审核中' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="收入总额" width="100" prop="income"></el-table-column>
                <el-table-column label="退款" width="100" prop="back"></el-table-column>
                <el-table-column label="来源" width="100">
                    <template #default="scope">
                        <el-tag type="primary">{{ scope.row.source }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="客户数" width="100" prop="customer"></el-table-column>
                <el-table-column label="更新时间" width="200" prop="time"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style scoped>
	.content-container {
    padding: 20px;
}

	.content-row {
    margin-bottom: 20px;
}

	.input-tip {
    margin-right: 10px;
}

	.input-field {
    margin-right: 20px;
}
</style>
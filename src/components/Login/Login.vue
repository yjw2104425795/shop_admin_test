<!-- src/components/login/Login.vue -->
<script setup>
import Storage from "../../tools/Storage";
import { ElMessage } from 'element-plus';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = Storage();
const router = useRouter();

const name = ref("");
const password = ref("");

const disabled = computed(() => {
  return name.value.length == 0 || password.value.length == 0;
});

function login() {
  store.registUserInfo(name.value, password.value);
  ElMessage({
    message: '登录成功',
    type: 'success',
    duration: 3000,
  });
  setTimeout(() => {
    router.push({ name: "home" });
  }, 3000);
}
</script>

<template>
  <div id="container">
    <div id="title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="input">
      <el-input v-model="name" prefix-icon="user" placeholder="请输入用户名"></el-input>
    </div>
    <div class="input">
      <el-input v-model="password" prefix-icon="lock" placeholder="请输入密码" auto-complete="new-password" show-password></el-input>
    </div>
    <div class="input">
      <el-button @click="login" style="width:500px" type="primary" :disabled="disabled">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
#container {
  background: #595959;
  background-image: url("/public/login_bg.jpg");
  height: 100vh;
  width: 100vw;
  position: absolute;
}
#title {
  text-align: center;
  color: azure;
  margin-top: 200px;
}
.input {
  margin: 20px auto;
  width: 500px;
}
</style>
// src/tools/Storage.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const Store = defineStore("UserStore", () => {
  // 全局存储用户名和密码
  const userName = ref("");
  const userPassword = ref("");

  // 进行是否登录的判断
  const isLogin = computed(() => {
    return userName.value.length > 0;
  });

  // 清除缓存的用户信息，登出使用
  const clearUserInfo = () => {
    userName.value = "";
    userPassword.value = "";
  };

  // 注册用户信息，登录使用
  const registUserInfo = (name, password) => {
    userName.value = name;
    userPassword.value = password;
  };

  return { userName, userPassword, isLogin, clearUserInfo, registUserInfo };
});

export default Store;
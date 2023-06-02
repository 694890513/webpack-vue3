<!--
 * @Author: Seven
 * @Date: 2023-05-26 14:54:03
 * @LastEditTime: 2023-05-29 17:16:09
 * @LastEditors: Seven
 * @Description: 
-->
<template>
  <div>
    <div class="login_box">
      <el-input v-model="data.username" placeholder="userName" />
      <el-input v-model="data.username" placeholder="password" />
    </div>
   <el-button class="login_btn">登录</el-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';

const data = reactive({
  username: '',
  password: '',
})

</script>
<style lang="scss" scoped>
  .login_box {
    @apply w-[400px] h-[80px] m-auto;
  }
  .login_btn {
    @apply w-[400px] h-[40px] m-auto;
  }
</style>
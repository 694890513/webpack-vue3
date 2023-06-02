<template>
  <div class="demo_container">
    <h1 class="text-center">测试页面，展示公共组件的用法</h1>
    <el-input placeholder="请输入token" v-model="data.token" />
    <el-input placeholder="请输入refreshToken" v-model="data.refreshToken" />
    <el-button type="primary"  class="btn" @click="changeToken">设置token</el-button>
    <br/>
    <h2>测试国际化切换</h2>
    <div>
      <el-button type="primary" class="btn" @click="changeLang('zh')">中文</el-button>
    <el-button type="primary"  class="btn" @click="changeLang('en')">英文</el-button>
    </div>

    <div>输出测试：{{ $t("message.login.title") }}</div>

    <h2>测试图片组件</h2>
    <Image :src="url" class="w-[100px] h-[80px]" />

    <h2>测试message组件</h2>
    <el-button :plain="true" @click="open2">success</el-button>
    <el-button :plain="true" @click="open3">warning</el-button>
    <el-button :plain="true" @click="open1">message</el-button>
    <el-button :plain="true" @click="open4">error</el-button>
    <!-- <svg-icon icon-class="menu-icon" class="menu-icon" /> -->
  </div>
</template>
<script lang="ts" setup>
import { i18n } from "@/i18n";
// import router from "@/router";
import { useUserInfoStore } from "@/stores/userInfo";
import { Local } from "@/utils/storage";
import { reactive } from "vue";
import Image from "@/components/common/Image.vue";
import { ElMessage } from "element-plus";


const data = reactive({
  token: "",
  refreshToken: "",
});

const changeToken = () => {
  useUserInfoStore().setToken(data.token);
  Local.set("token", data.token);
  useUserInfoStore().setTokenHeader('Bearer ')
  useUserInfoStore().setRefreshToken(data.refreshToken);
  // router.push("/");
};

const changeLang = (lang: string) => {
  i18n.global.locale.value = lang;
  Local.set("locale", lang);
  // $i18n.locale = 'en'
};

const open1 = () => {
  ElMessage.success('this is a message.')
}
const open2 = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const open3 = () => {
  ElMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  })
}
const open4 = () => {
  ElMessage.error('Oops, this is a error message.')
}

const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
<style lang="scss" scoped>
.demo_container {
  @apply flex flex-col  justify-center;
}
.btn {
  @apply w-[100px] inline-block;
}
</style>

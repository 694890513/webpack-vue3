<!--
 * @Author: Seven
 * @Date: 2023-05-26 14:41:43
 * @LastEditTime: 2023-06-02 14:07:07
 * @LastEditors: Seven
 * @Description: 
-->
<template>
  <div>
    home11
    {{ $t("message.login.title") }}
  </div>
</template>
<script setup lang="ts">
import { getHome } from "@/api/common";
import { useUserInfoStore } from "@/stores/userInfo";
import { useRequest } from "alova";
import { onMounted } from "vue";

const { data  } = useRequest(() => getHome());
console.log( data);

const userInfoStore = useUserInfoStore();


onMounted(() => {
  userInfoStore.getApiUserInfo()
})
// onSuccess(() => {
//   invalidateCache(getHome(params));
// });
</script>
<style lang=""></style>

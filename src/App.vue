<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <RouterView />
  </el-config-provider>
</template>

<script lang="ts" name="App" setup>
import { RouterView } from "vue-router";
import { useCommonStore } from "@/stores/common";

const commonStore = useCommonStore();
const { size, zIndex } = commonStore.getElConfig;
</script>

<style lang="scss" scoped></style>
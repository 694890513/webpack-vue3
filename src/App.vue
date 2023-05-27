<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="getGlobalI18n">
    <RouterView />
  </el-config-provider>
</template>

<script lang="ts" name="App" setup>
import { RouterView, useRoute } from "vue-router";
import { useCommonStore } from "@/stores/common";
import { useI18n } from 'vue-i18n';
import { computed, watch } from "vue";
import { useTitle } from "./utils/utils";
// import mittBus from '@/utils/mitt';

// 定义变量内容
const { messages, locale } = useI18n();
const commonStore = useCommonStore();
const { size, zIndex } = commonStore.getElConfig;
const route = useRoute();

// 获取全局 i18n
const getGlobalI18n = computed(() => {
	return messages.value[locale.value];
});


// 监听路由的变化，设置网站标题
watch(
	() => route.path,
	() => {
		useTitle();
	},
	{
		deep: true,
	}
);

</script>

<style lang="scss" scoped></style>
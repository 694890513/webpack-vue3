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
import { getConfig } from '@/api/common'
import { useRequest } from "alova";
import { Local } from "./utils/storage";
import { i18n } from '@/i18n';

// import mittBus from '@/utils/mitt';

// 定义变量内容
const {  locale } = useI18n();
const commonStore = useCommonStore();
const { size, zIndex } = commonStore.getElConfig;
const route = useRoute();

const { onSuccess } = useRequest(() => getConfig());

onSuccess((res) => {
	i18n.global.locale.value = getGlobalI18n.value
	Local.set('locale', getGlobalI18n.value)
})

// 获取全局 i18n
const getGlobalI18n = computed(() => {
	let lang = Local.get('locale')
	return lang ? lang : locale.value;
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
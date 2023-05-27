<!--
 * @Author: Seven
 * @Date: 2023-05-26 14:43:18
 * @LastEditTime: 2023-05-27 11:10:08
 * @LastEditors: Seven
 * @Description: 
-->
<template>
  <el-container class="layout-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <router-view v-slot="{ Component }">
          <transition :name="setTransitionName" mode="out-in">
            <keep-alive :include="getKeepAliveNames">
              <component :is="Component" :key="state.refreshRouterViewKey"/>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts" setup name="layout">
import { computed, nextTick, onBeforeMount, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useCommonStore } from '@/stores/common'
import { useKeepALiveNames } from '@/stores/keepAliveNames';
import { storeToRefs } from 'pinia';
import mittBus from '@/utils/mitt';
import { useRoute } from 'vue-router';
import { ParentViewState } from '@/types';

const route = useRoute();
const { getElConfig } = useCommonStore();
const storesKeepAliveNames = useKeepALiveNames();
const state = reactive<ParentViewState>({
	refreshRouterViewKey: '', // 非 iframe tagsview 右键菜单刷新时
	keepAliveNameList: [],
});

const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames);
// 设置主界面切换动画
const setTransitionName = computed(() => {
	return getElConfig
});

// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
	return  cachedViews.value
});

// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
	state.keepAliveNameList = keepAliveNames.value;
	mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
		state.keepAliveNameList = keepAliveNames.value.filter((name: string) => route.name !== name);
		state.refreshRouterViewKey = '';
		nextTick(() => {
			state.refreshRouterViewKey = fullPath;
			state.keepAliveNameList = keepAliveNames.value;
		});
	});
});
// 页面加载时
onMounted(() => {
});
// 页面卸载时
onUnmounted(() => {
	mittBus.off('onTagsViewRefreshRouterView', () => {});
});
// 监听路由变化，防止 tagsView 多标签时，切换动画消失
// https://toscode.gitee.com/lyt-top/vue-next-admin/pulls/38/files
watch(
	() => route.fullPath,
	() => {
		state.refreshRouterViewKey = decodeURI(route.fullPath);
	},
	{
		immediate: true,
	}
);

</script>
<style lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
}
</style>

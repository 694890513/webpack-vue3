<!--
 * @Author: Seven
 * @Date: 2023-06-03 11:33:07
 * @LastEditTime: 2023-06-05 11:46:08
 * @LastEditors: Seven
 * @Description: 测试下拉加载
-->
<template>
  <div>
    <el-table :data="data" style="width: 100%" height="500" id="table_box" v-loading="loading">
      <el-table-column prop="messageID" label="messageID" />
      <el-table-column prop="stateName" label="stateName" />
      <el-table-column prop="title" label="title" />
      <el-table-column prop="messages" label="messages" />
      <el-table-column prop="addTime" label="addTime" />
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="pageSize"
      layout="total, size, prev, pager, next, jumper"
      :total="total"
    />
    <div>
      <el-button type="primary" @click="refresh">刷新</el-button>
      <el-button type="primary" @click="reload">重置</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getMessageList } from '@/api/home';
import { useWatcher } from 'alova';

const { loading, data, page, pageSize, refresh, reload, total } = useWatcher(
  (page, pageSize) => getMessageList( {pageNo: page, pageSize}),[]
)

</script>
<style lang="scss"></style>

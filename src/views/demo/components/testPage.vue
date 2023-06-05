<!--
 * @Author: Seven
 * @Date: 2023-06-03 11:33:07
 * @LastEditTime: 2023-06-05 11:33:50
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
import {usePagination} from '@alova/scene-vue'
import { getMessageList } from '@/api/home';

const { loading, data, page, pageSize, refresh, reload, total } = usePagination(
  (page, pageSize) => getMessageList( {pageNo: page, pageSize} ),
  {
    initialData: [], // 请求前的初始数据，
    debounce: 300,
    append: true, // 是否启用追加模式，在下拉加载时需设置为true，默认为false
    data: r => r.list, // 指定如何获取列表数据，res为响应数据，默认获取res.data
    total: r => r.totalCount, // 指定如何获取列表项总数值，res为响应数据，默认获取res.total
    // preloadPreviousPage: true, // 是否预加载上一页数据，默认为true
    // preloadNextPage: true, // 是否预加载下一页数据，默认为true
    // initialPage: 1, // 初始页码，默认为1
    // initialPageSize: 10, // 初始每页数据条数，默认为10
    // immediate: true // 是否立即发出请求，默认为true
  }
)



// const handleSizeChange = (value: number) => {
//   pageSize.value = value
// }

// const handleCurrentChange = (value: number) => {
//   page.value = value
// }




</script>
<style lang="scss"></style>

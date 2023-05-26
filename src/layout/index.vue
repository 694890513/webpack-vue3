<!--
 * @Author: Seven
 * @Date: 2023-05-26 14:43:18
 * @LastEditTime: 2023-05-26 16:06:03
 * @LastEditors: Seven
 * @Description: 
-->
<template>
  <el-container class="layout-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts" setup name="layout"></script>
<style lang="scss">
.layout-container {
  width: 100%;
  height: 100%;
}
</style>

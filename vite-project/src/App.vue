<template>
  <div class="bj">
    <router-view></router-view>
    
  </div>
</template>
  
  <script setup lang="ts">
import { reqLogin } from "@/api/user";
import { onMounted } from "vue";
onMounted(() => {
  reqLogin({ username: "test1", password: "1234" }).then((response) => {
    console.log("登录", response.data);
  });
});
</script>
  
  
  <style>
 *{
  font-family: Cursive ;
  font-size: large;
  
 }
 
  .tm{
  opacity: 0.8;
  
}
.el-select__placeholder.is-transparent {
    color: #595d66;
    -webkit-user-select: none;
    -moz-user-select: none;
    /* user-select: none; */
}
.el-button--primary {
    --el-button-text-color: var(--el-color-white);
    --el-button-bg-color: #e96101;
    --el-button-border-color: #fffdfd;
    --el-button-outline-color: #050f1a;
    --el-button-active-color: #e96101;
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-link-text-color: #e96101;
    --el-button-hover-bg-color: #e96101;
    --el-button-hover-border-color: #e96101;
    --el-button-active-bg-color: #07131f;
    --el-button-active-border-color: #031425;
    --el-button-disabled-text-color: var(--el-color-white);
    --el-button-disabled-bg-color: #01060c;
    --el-button-disabled-border-color: #02080f;
}
.el-button--primary.is-link, .el-button--primary.is-plain, .el-button--primary.is-text {
    --el-button-text-color: #000000;
    --el-button-bg-color: var(--el-color-primary-light-9);
    --el-button-border-color: #041a30;
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-bg-color: #000204;
    --el-button-hover-border-color: #f4f6f9;
    --el-button-active-text-color: var(--el-color-white);}
.cell
      {
      color: rgb(0, 0, 0);
    }
    .el-table {
    --el-table-border-color: var(--el-border-color-lighter);
    --el-table-border: 1px solid var(--el-table-border-color);
    --el-table-text-color: none;
    --el-table-header-text-color: none;
    --el-table-row-hover-bg-color: var(--el-fill-color-light);
    --el-table-current-row-bg-color: none;
    --el-table-header-bg-color: none;
    --el-table-fixed-box-shadow: none;
    --el-table-bg-color: rgba(62, 60, 60, 0.7);
    --el-table-tr-bg-color: rgba(99, 99, 99, 0.7);
    --el-table-expanded-cell-bg-color: rgba(99, 99, 99, 0.7);
    --el-table-fixed-left-column: none;
    --el-table-fixed-right-column: none --el-table-index: none;
    background-color: var(--el-table-bg-color);
    box-sizing: border-box;
    color: var(--el-table-text-color);
    font-size: 14px;
    height: -moz-fit-content;
    height: fit-content;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
}
.el-form-item__label {
   
    color: #eaeaea;}
</style>
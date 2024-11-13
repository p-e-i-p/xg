<template>
  <div>
  <app-header class="header"/>
  <app-navbar class="navbar" />
  <app-main class="main" />
 
</div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader/index.vue"
import AppNavbar from "@/components/AppNavbar/index.vue"
import AppMain from "@/components/AppMain/index.vue"



</script >

<style scoped>
/* 头部区域 */
.header {
  position: absolute;
  line-height: 50px;
  padding: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color:#292929 ;

  border-bottom:1px,solid,#e96101;
  
  
}
/* 左侧导航栏 */
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color:#292929 ;

  

 
}
/* 右侧主区域 */
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  overflow-y: auto;
  /* background: url("../../assets/nn.webp");
  background-size:cover; */
}

</style>
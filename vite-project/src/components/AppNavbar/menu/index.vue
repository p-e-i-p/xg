<template>
  <div>
    <template v-for="item in menuList" :key="item.index" class="container">
      <!-- 一级菜单 -->
      <el-menu-item v-if="!item.children" :index="item.index">
        <template #title>
          <el-icon>
            <Icon :type="item.icon"></Icon>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
      <!-- 包含多级菜单 -->
      <el-sub-menu v-if="item.children" :index="item.index" style="background-color: none;">
        <template #title>
          <el-icon>
            <Icon :type="item.icon"></Icon>
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <!-- 递归处理多级菜单 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
  components: { Icon },
  name: "Menu",
  props: ["menuList"],
};
</script>

<style>
.navbar > ul div {
  background: #2f2f2f;
  
}



</style>
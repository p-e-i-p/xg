<template>
  <i class="iconfont" :class="fontClass"></i>
</template>

<script>
const classMap = {
  sy: "icon-a-Group850",
  yh: "icon-xiunv",
  js: "icon-weibiaoti--",
  xy: "icon-a-Group852",
  xx: "icon-a-Group844",
  zy: "icon-pengke-xian",
  bj :"icon-jiangshizichan",
  xs: "icon-kulou",
};
export default {
props:{
  type:{
    type:String,
    requied:true
  }
}
,
computed:{
  fontClass(){
    return classMap[this.type]
  }
}
}
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4631070_9qqzgcomvzn.css";

.iconfont {
  font-size: 25px; /* 您可以根据需要调整字体大小 */
}

</style>


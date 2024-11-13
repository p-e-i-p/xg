<template>
  <div>
    <h1 class="home_title" style="text-align: center">
      <el-button :icon="ArrowLeft" @click="getPreYearData">上一年</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>{{ year }}</span>
      <span>年学员数量</span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button @click="getNextYearData">
        下一年&nbsp;&nbsp;
        <el-icon>
          <ArrowRight />
        </el-icon>
      </el-button>
    </h1>
    <div id="myChart" style="height: 400px"></div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { reqStudentForYear } from '@/api/student'
import { ElMessage } from 'element-plus'
const year = ref(new Date().getFullYear())
const getPreYearData = () => {
  year.value--
  drawChart()
}
const getNextYearData = () => {
  year.value++
  drawChart()
}
const drawChart = () => {
  reqStudentForYear(year.value).then((response) => {
    const resp = response
    if (resp.status == '0') {
      // 基于准备好的dom，初始化echarts实例
      var chartDom = document.getElementById('myChart')
      var myChart = echarts.init(chartDom)
      // var option;
      // 数据
      let dataArr = []
      if (resp.data && resp.data.length) {
        resp.data.forEach((item) => {
          dataArr[parseInt(item._id) - 1] = item.count
        })
      } else {
        ElMessage({
          type: 'warning',
          message: '当前年份无数据',
        })
      }

      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
          ],
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: dataArr,
          },
        ],
      })
    }
  })
}
onMounted(() => {
  drawChart()
})
</script>

<style scoped></style>

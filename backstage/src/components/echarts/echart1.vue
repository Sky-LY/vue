<template>
    <div style="height: 100%">
      <div id="main1" :style="{width:'100%',height:'100%'}"></div>
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    var echarts = require('echarts/lib/echarts');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    import {httpUrl} from "../../api/api"
    export default{
      data(){
          return {
            myChart:'',
            option:{
              title: {
                text: '2017年月访问量',
                x:'center'
              },
              color: '#009688',
              tooltip: {},
              xAxis: {
                data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
              },
              yAxis: {
                type: 'value',
                name: '万',
              },
              series: [{
                name: '访问量（万）',
                type: 'bar',
                data: []
              }]
            }
          }
      },
      created(){
      },
      methods: {
        drawBarChart() {
          /*ECharts图表*/
          this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById('main1'));
            this.myChart.setOption(this.option)
          })
          this.$http.get(httpUrl.test1)
            .then(rev => {
              this.option.series[0].data = rev.data.visit;
              this.myChart.setOption(this.option);
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      mounted() {
        //调用drawBarChart()
        this.drawBarChart();
      }
    }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  /*宽高*/
  @R1: 100rem;
  /*字体大小*/
  @R2: 0.01rem;
  /*边距*/
  @R3: 0.01rem;
  @white: #fff;
</style>


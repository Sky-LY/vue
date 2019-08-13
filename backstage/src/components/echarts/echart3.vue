<template>
    <div style="height: 100%">
      <div id="main3" :style="{width:'100%',height:'100%'}"></div>
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
            option:{
              title : {
                text: 'Tougo网站用户访问来源',
                subtext: '纯属虚构',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:[],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
          }
      },
      mounted() {
        this.drawPieChart();
      },
      methods: {
        drawPieChart() {
          /*ECharts图表*/
          this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById('main3'));
            this.myChart.setOption(this.option)
          })
          this.$http.get(httpUrl.test1)
            .then(rev => {
              this.option.series[0].data = rev.data.visit2;
              this.myChart.setOption(this.option);
            })
            .catch(err => {
              console.log(err)
            })
        }
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


<template>
  <div style="height: 100%">
    <div id="main4" :style="{width:'100%',height:'100%'}"></div>
  </div>
</template>
<script>
  var echarts = require('echarts');
  import {httpUrl} from "../../api/api"
  export default{
    data(){
      return {
        option:{
          title: {
            text: '网站在线人数',
            x:'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: '模拟数据',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              data: this.a
            },
            {
              name: '模拟数据',
              type: 'line',
              showSymbol: false,
              hoverAnimation: false,
              data: this.b
            }
          ]
        },
        a:[],
        now:+new Date(2017,10,1),
        oneDay: 24 * 3600 * 1000,
        b:Math.random() * 1000
      }
    },
    created(){

    },
    mounted() {
      this.drawPieChart()
    },
    created () {
      for (var i = 0; i < 1000; i++) {
        this.a.push(this.randomData());
      }
      setInterval(()=> {
        var h = this.a
        for (var i = 0; i < 5; i++) {
          h.shift();
          h.push(this.randomData());
        }
        this.option.series[0].data = h
        this.myChart.setOption(this.option);
      }, 1000)
    },
    methods: {
      drawPieChart() {
        this.$nextTick(() => {
          this.myChart = echarts.init(document.getElementById('main4'));
          this.myChart.setOption(this.option)
        })
      },
      randomData() {
        this.now = new Date(+this.now + this.oneDay);
        this.b = this.b + Math.random() * 21 - 10;
        return {
          name: this.now.toString(),
          value: [
            [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
            Math.round(this.b)
          ]
        }
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


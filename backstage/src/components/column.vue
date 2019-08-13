<template>
  <div class="container">
    <header class="header">
      <slot name="header"></slot>
      <ul class="set-ul" v-show="index > 1">
        <li v-for="item in index" :key="item" @mouseenter="setActiveItem(item)" :style="{background:[itemIndex === item-1?'#999':'#e2e2e2']}"></li>
      </ul>
    </header>
    <main class="main">
      <template>
        <el-carousel indicator-position="none" :interval="10000" :height="height" :autoplay="false" ref="carousel1" arrow="never" @change="change">
          <el-carousel-item v-for="item in index" :key="item">
            <slot :name="'content'+item"></slot>
          </el-carousel-item>
        </el-carousel>
      </template>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
  export default{
      data(){
          return{
              itemIndex:0,
          }
      },
      props: ["index","height"],
      methods:{
        setActiveItem(index){
          this.$refs.carousel1.setActiveItem(index-1)
        },
        change(value){
            this.itemIndex = value;
          }
      }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .display_flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .display_flex > * {
    display: block;
  }
  .justify-content_flex-justify {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .align-items_center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .container{
    padding: 20px;
    background: #fff;
    .header{
      .display_flex;
      .justify-content_flex-justify;
      .align-items_center;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f6f6f6;
      color: #333;
      border-radius: 2px 2px 0 0;
      font-size: 14px;
    }
    .set-ul{
      .display_flex;
      .align-items_center;
      li{
        list-style: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #e2e2e2;
        margin: 0 3px;
        cursor:pointer;
      }
    }
  }
</style>

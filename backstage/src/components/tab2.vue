<template>
    <div class="tab2" :data-name="url" :data-title="title" @click="addNav">
      <p class="tab2-title">{{title}}</p>
      <p class="tab2-data">{{data}}</p>
    </div>
</template>

<script>
    export default{
      data(){
          return {}
      },
      props:["title","data","url"],
      methods:{
        //    添加页面标签数组
        addNav () {
          var lablePage = {index:this.url, title: this.title};
          this.$store.commit('addNav',lablePage)
          this.$router.push('/'+this.url);
        },
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
  .tab2{
    padding: 20px;
    background: #F8F8F8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    .tab2-title{
      font-size: 13px;
      color:#999;
      margin-bottom: 10px;
    }
    .tab2-data{
      font-size: 26px;
      color: #009688;
      font-weight: bold;
    }
  }
</style>

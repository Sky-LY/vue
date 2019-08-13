<template>
    <div class="box" :data-name="url" :data-title="title" @click="addNav">
      <div class="wrap f1">
        <div :class="[icon,{icon}]"></div>
      </div>
      <div class="wrap f2">
        <span>{{title}}</span>
      </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
      props:["title","icon","url"],
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
  .display_flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .display_flex > * {
    display: block;
  }
  /*伸缩流方向*/
  .flex-direction_column {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .justify-content_flex-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .align-items_center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .box{
    .display_flex;
    .flex-direction_column;
    .justify-content_flex-center;
    color: #666;
    text-decoration: none;
    cursor: pointer;
    .wrap{
      width: 100%;
      .display_flex;
      .justify-content_flex-center;
      .align-items_center;
      min-width: 80px;

    }
    .f1{
      background: #F8F8F8;
      padding: 15px 0;
      .icon{
        font-size: 36px;
      }
    }
    .f1:hover{
      background: #f2f2f2;
      color: #333;
    }
    .f2{
      padding: 5px 0;
      span{
        font-size: 14px;
        color: #666;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>

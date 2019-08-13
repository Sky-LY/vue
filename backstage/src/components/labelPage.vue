<template>
    <div class="box">
      <div class="sel"></div>
      <router-link :to=index class="content">
          <slot></slot>
      </router-link>
      <el-button class="l-icon" icon="el-icon-close" circle @click="close"></el-button>
    </div>
</template>

<script>
    export default{
      data(){
          return {
          }
      },
      props: ["index","sub"],
      computed:{
        navLable (){
          return this.$store.state.navLable
        }
      },
      methods: {
        close () {
          this.$store.commit('delNav',this.sub);
          if(this.navLable.length > 0){
            if(this.sub > 0){
              var goUrl = this.navLable[this.sub-1].index;
              this.$router.push('/'+goUrl)
            }else {
              var firstUrl = this.navLable[this.sub].index;
              this.$router.push('/'+firstUrl)
            }
          }else {
            this.$router.push('/')
          }
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
  .display_flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .align-items_center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .justify-content_flex-justify {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .flex_1 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .box{
    position: relative;
    font-size: 14px;
    width: 100%;
    height: 100%;
    padding:0 5px;
    border-right: 1px solid #f6f6f6;
    .display_flex;
    .align-items_center;
    .justify-content_flex-justify;
    .content{
      .flex_1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      color: #333;
      text-decoration: none;
    }
    .l-icon{
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: none;
    }
    .l-icon:hover >{
      color: #fff;
      background-color: #FF5722;
    }
    .el-button.is-circle{
      padding:0;
    }
  }
  .sel{
    position: absolute;
    top:0;
    left: 0;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background: #000;
    transition:width .3s;
    -moz-transition:width .3s ease-in-out; /* Firefox 4 */
    -webkit-transition:width .3s ease-in-out; /* Safari and Chrome */
    -o-transition:width .3s ease-in-out; /* Opera */
  }
</style>

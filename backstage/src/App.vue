<template>
  <div id="app">
    <el-container class="appBox">
      <el-header class="header" :height="headerHeight">
        <p class="one" :style="{width:[isCollapse?'64px':'200px']}"></p>
        <div class="top-wrap">
          <div class="top-f1">
            <div class="top-left">
              <el-tooltip class="item" effect="dark" :content="isCollapse?$t('pageTip.open'):$t('pageTip.shrink')">
                <el-button @click="openType" :class="[Aicon,isCollapse?'icon-open':'icon-close']"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('pageTip.reception')">
                <el-button :class="[Aicon]" class="a-earth">
                    <span class="icon-earth">
                      <span class="path3"></span>
                    </span>
                </el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="$t('pageTip.refresh')">
                <el-button :class="[Aicon]" icon="el-icon-refresh" @click="reload"></el-button>
              </el-tooltip>
              <div class="search-box">
                <el-autocomplete v-model="state1" :fetch-suggestions="querySearchAsync" :placeholder="$t('pageTip.search')" @select="handleSelect" style="width:300px">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-autocomplete>
              </div>
            </div>
            <div class="top-right">
              <div>
                <el-badge :value="newsValue" :max="99" class="item">
                  <el-button :class="[Aicon]" icon="el-icon-bell"></el-button>
                </el-badge>
              </div>
              <div>
               <el-dropdown>
                <span class="el-dropdown-link">
                  管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item>{{$t('pageTip.basicInformation')}}</el-dropdown-item>
                   <el-dropdown-item>{{$t('pageTip.changePassword')}}</el-dropdown-item>
                   <el-dropdown-item>{{$t('pageTip.SignOut')}}</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
             </div>
              <div>
                <el-tooltip class="item" effect="dark" :content="$t('pageTip.language')">
                  <el-button :class="[Aicon]" icon="el-icon-d-caret" @click="changeLangEvent"></el-button>
                </el-tooltip>
              </div>
              <div class="edition">
                <el-button :class="[Aicon]" icon="el-icon-more edition-size" @click="about"></el-button>
              </div>
            </div>
          </div>
          <div class="top-f2">
            <div class="f2-left">
              <el-button class="a-icon" icon="el-icon-d-arrow-left" @click="swiperPrev"></el-button>
              <router-link to="/"><el-button class="index-icon" :class="[Aicon,{_active: navIndex === '/'}]" icon="el-icon-menu"></el-button></router-link>
            </div>
            <div class="f2-content">
              <div class="swiper-container" id="swiper1" ref="mySwiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(value, key) in navLable" :key="key">
                      <label-page :class="navIndex === '/'+value.index ? '_active' : '_hover'" :index=value.index :sub="key" >{{value.title}}</label-page>
                   </div>
                </div>
              </div>
            </div>
            <div class="f2-right">
              <el-button class="a-icon" icon="el-icon-d-arrow-right" @click="swiperNext"></el-button>
              <el-dropdown @command="closeLable">
                <span class="el-dropdown-link">
                  <el-button :class="[Aicon]" icon="el-icon-arrow-down"></el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="current">{{$t('pageTip.CloseCurrentPage')}}</el-dropdown-item>
                  <el-dropdown-item command="other">{{$t('pageTip.CloseOtherPage')}}</el-dropdown-item>
                  <el-dropdown-item command="all">{{$t('pageTip.CloseAllPage')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-container class="container" :style="{height:contatinerHeight}">
        <el-aside class="aside" width="auto" :style="{marginTop:reversedMessage}">
          <el-header class="a-logo" :height="headerHeight">Tougo</el-header>
          <el-menu default-active="/" class="el-menu-vertical-demo" :collapse="isCollapse" router background-color="#20222A" text-color="#BDBDC0" active-text-color="#fff">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">{{$t('nav .home')}}</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{$t('nav .first')}}</span>
              </template>
              <el-menu-item-group>
                <span slot="title">{{$t('nav.Group0101')}}</span>
                <el-menu-item index="one" :dataTitle="$t('nav.Option010101')" @click="addNav($event)">{{$t('nav.Option010101')}}</el-menu-item>
                <el-menu-item index="two" :dataTitle="$t('nav.Option010102')" @click="addNav($event)">{{$t('nav.Option010102')}}</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">{{$t('nav.Group0102')}}</span>
                <el-menu-item index="1-3" :dataTitle="$t('nav.Option010201')" @click="addNav($event)">{{$t('nav.Option010201')}}</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">{{$t('nav.Option010202')}}</span>
                <el-menu-item index="1-4-1" :dataTitle="$t('nav.Option01020201')" @click="addNav($event)">{{$t('nav.Option01020201')}}</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-date"></i>
              <span slot="title">{{$t('nav .second')}}</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">{{$t('nav .third')}}</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-upload"></i>
                <span slot="title">{{$t('nav .fourth')}}</span>
              </template>
              <el-menu-item-group>
                <span slot="title">{{$t('nav.Group0401')}}</span>
                <el-menu-item index="one1" :dataTitle="$t('nav.Option040101')" @click="addNav($event)">{{$t('nav.Option040101')}}</el-menu-item>
                <el-menu-item index="two1" :dataTitle="$t('nav.Option040102')" @click="addNav($event)">{{$t('nav.Option040102')}}</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">{{$t('nav.Group0402')}}</span>
                <el-menu-item index="1-31" :dataTitle="$t('nav.Option040201')" @click="addNav($event)">{{$t('nav.Option040201')}}</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">{{$t('nav.Option040202')}}</span>
                <el-menu-item index="1-4-11" :dataTitle="$t('nav.Option04020201')" @click="addNav($event)">{{$t('nav.Option04020201')}}</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">{{$t('nav .five')}}</span>
              </template>
              <el-menu-item-group>
                <span slot="title">{{$t('nav.Group0501')}}</span>
                <el-menu-item index="one5" :dataTitle="$t('nav.Option050101')" @click="addNav($event)">{{$t('nav.Option050101')}}</el-menu-item>
                <el-menu-item index="two5" :dataTitle="$t('nav.Option050102')" @click="addNav($event)">{{$t('nav.Option050102')}}</el-menu-item>
                <el-menu-item index="one6" :dataTitle="$t('nav.Option050101')" @click="addNav($event)">{{$t('nav.Option050101')}}</el-menu-item>
                <el-menu-item index="two7" :dataTitle="$t('nav.Option050102')" @click="addNav($event)">{{$t('nav.Option050102')}}</el-menu-item>
                <el-menu-item index="one8" :dataTitle="$t('nav.Option050101')" @click="addNav($event)">{{$t('nav.Option050101')}}</el-menu-item>
                <el-menu-item index="two9" :dataTitle="$t('nav.Option050102')" @click="addNav($event)">{{$t('nav.Option050102')}}</el-menu-item>
                <el-menu-item index="two10" :dataTitle="$t('nav.Option050102')" @click="addNav($event)">{{$t('nav.Option050102')}}</el-menu-item>
                <el-menu-item index="one11" :dataTitle="$t('nav.Option050101')" @click="addNav($event)">{{$t('nav.Option050101')}}</el-menu-item>
                <el-menu-item index="two12" :dataTitle="$t('nav.Option050102')" @click="addNav($event)">{{$t('nav.Option050102')}}</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">{{$t('nav.Group0502')}}</span>
                <el-menu-item index="3-31" :dataTitle="$t('nav.Option050201')" @click="addNav($event)">{{$t('nav.Option050201')}}</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">{{$t('nav.Option050202')}}</span>
                <el-menu-item index="3-4-11" :dataTitle="$t('nav.Option05020201')" @click="addNav($event)">{{$t('nav.Option05020201')}}</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="background: #f2f2f2">
          <el-main>
            <keep-alive>
              <router-view v-if="isRouterAlive"/>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <div>
      <my-mask v-show="pop" @close="closePop($event)"></my-mask>
      <div :class="[rightPop,{Popback: pop} ]">
        <about-edition></about-edition>
      </div>
    </div>
  </div>
</template>

<script>
  import ElContainer from "../node_modules/element-ui/packages/container/src/main";
  import ElIcon from "../node_modules/element-ui/packages/icon/src/icon";
  import { mapState } from 'vuex';
  import labelPage from "./components/labelPage"
  import myMask from "./components/myMask"
  import aboutEdition from "./components/aboutEdition"
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'App',
  components: {
    ElIcon,
    ElContainer,
    labelPage,
    myMask,
    aboutEdition
  },
  data() {
    return {
      isRouterAlive: true,
      hHeight: "100",//头部高度
      isCollapse: false,//侧边导航栏收缩
      Aicon:"a-icon",//头部按钮样式
      restaurants: [],//搜索
      state1: '',//搜索
      timeout:  null,//搜索
      newsValue: 200,//消息数
      fullHeight: document.documentElement.clientHeight,//获取屏幕高度
      navIndex: "/",
      pop: false,
      rightPop:'right-pop'
    };
  },
  provide(){
      return{
          reload: this.reload
      }
  },
  created(){

  },
  computed: mapState({
//    给el-header标签赋高度
    headerHeight:function () {
      return this.hHeight+"px";
    },
    reversedMessage: function () {
      return "-"+this.hHeight+"px";
    },
    contatinerHeight:function () {
      var h = this.fullHeight - this.hHeight;
      return h+'px'
    },
    navLable (){
      return this.$store.state.navLable
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  }),
  watch:{
//      监听路由变化
    $route(to,from){
      this.navIndex = to.path;
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true))
    },
//      搜索
    openType() {
     this.isCollapse = ! this.isCollapse
    },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" }
      ];
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
//    添加页面标签数组
    addNav (event) {
        var lablePage = {index:event.index, title: event.$attrs.dataTitle};
        this.$store.commit('addNav',lablePage)
    },
//    关闭按钮组
    closeLable(command){
      switch(command)
      {
        case "current":
          for(var i = 0; i < this.navLable.length; i++){
              if(this.navIndex === "/"+this.navLable[i].index){
                this.$store.commit('delNav',i);
                if(this.navLable.length > 0){
                  if(i > 0){
                    var goUrl = this.navLable[i-1].index;
                    this.$router.push('/'+goUrl)
                  }else {
                    var firstUrl = this.navLable[i].index;
                    this.$router.push('/'+firstUrl)
                  }
                }else {
                  this.$router.push('/')
                }
              }
          }
          break;
        case "other":
          for(var i = 0; i < this.navLable.length; i++){
              if(this.navIndex !== "/"){
                if(this.navIndex === "/"+this.navLable[i].index){
                  this.$store.commit('closeOther',this.navLable[i]);
                }
              }else {
                this.$store.commit('closeAll');
              }
          }
          break;
        case "all":
          this.$store.commit('closeAll');
          this.$router.push('/');
          break;
      }
    },
//    切换语言
    changeLangEvent() {
        this.$confirm(this.$t('pop.hint'), this.$t('pop.tips'), {
        confirmButtonText: this.$t('pop.sure'),
        cancelButtonText: this.$t('pop.cancel'),
        type: 'warning'
      }).then(() => {
        if ( this.$i18n.locale === 'zh-CN' ) {
          this.$i18n.locale = 'en-US';//关键语句
          this.$store.state.lang = 'en'
        }else {
          this.$i18n.locale = 'zh-CN';//关键语句
          this.$store.state.lang = 'cn'
        }
      }).catch(() => {
        console.log('catch');
        this.$message({
          type: 'info',
          message: this.$t('pop.message')
        });
      });
    },
//    关于弹窗
    about(){
      this.pop = true;
    },
//    关闭弹窗
    closePop(event){
      this.pop = event
    },
//    上一页
    swiperPrev(){
      var a = this.navLable.length;
      var i = this.$store.state.swiperBase;
      if(a > 12){
        i -= 6;
        console.log('上一页1：'+i+'和'+a);
        this.swiper.slideTo(i, 1000, false)
      }else {
        console.log('上一页2：'+i+'和'+a);
        this.swiper.slideTo(0, 1000, false)
      }
    },
//    下一页
    swiperNext(){
      var a = this.navLable.length;
      var i = this.$store.state.swiperBase;
      i ++;
      console.log(i)
//      if(a > 12){
//        var j = 0;
//        if(j < a/6){
//          i += 6;
//          j++;
//          console.log('下一页1：'+i+'和'+a+'和'+j);
//          this.swiper.slideTo(i, 1000, false)
//        }
//      }else {
//        console.log('下一页2：'+i+'和'+a);
//        this.swiper.slideTo(a, 1000, false)
//      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    var mySwiper = new Swiper('#swiper1', {
      direction : 'horizontal',
      setWrapperSize :true,
      preventLinksPropagation : true,
      resistance : true,
      slidesPerView: 12,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true//修改swiper的父元素时，自动初始化swiper
    })
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "assets/common/styles/icon.css";
  @color: #333;
  @header-bg:#fff;
  @header-boder: #eee;
  @header-height: 100px;
  @aside-bg:#20222A;
  @main-color: #fff;
  @menu-hover-bg: #009688;
  /*---- flex兼容性写法 start----*/
  .display_flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  }
  .display_flex > * {
    display: block;
  }
  .display_inline-flex {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: -webkit-inline-flex;
    display: inline-flex;
  }
  .display_inline-flex > * {
    display: block;
  }
  /*伸缩流方向*/
  .flex-direction_column {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .flex_wrap {
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  /*主轴对齐*/
  .justify-content_flex-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .justify-content_flex-end {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }
  .justify-content_flex-justify {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  /*侧轴对齐*/
  .align-items_flex-start {
    -webkit-box-align: start;
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
  }
  .align-items_flex-end {
    -webkit-box-align: end;
    -ms-flex-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
  }
  .align-items_center {
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .align-items_baseline {
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    -webkit-align-items: baseline;
    align-items: baseline;
  }
  /*伸缩性*/
  .flex_auto {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    -webkit-flex: auto;
    flex: auto;
  }
  .flex_1 {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  /*显示顺序*/
  .order_2 {
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 2;
    -webkit-order: 2;
    order: 2;
  }
  .order_3 {
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 3;
    -webkit-order: 3;
    order: 3;
  }
  /*---- end flex兼容性写法 ----*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.appBox{
  .display_flex;
  .flex-direction_column;
}
.header{
  background: @header-bg;
  color:@color;
  border-bottom: 1px solid @header-boder;
  .display_flex;
  .align-items_center;
  overflow: hidden;
}
.top-left{
  .display_flex;
  .align-items_center;
}
.container{
  .aside{
    background-color:  @aside-bg;
    .el-menu{
      background-color:  @aside-bg;
      color: @main-color;
      border-right:0;
    }
  }
  .el-submenu__title{
    color:  @main-color;
    i{
      color:  @main-color;
    }
  }
  .el-menu-item{
    color: @main-color;
  }
  .el-submenu__title:hover,.el-menu-item:hover{
    color:  @main-color !important;
    background: @menu-hover-bg !important;
  }

}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .one{
    display: inline-block;
    width: 200px;
    transition:width 0.3s;
  }
  .a-icon{
    display: inline-block;
    width: 35px;
    height: 35px;
    padding: 5px;
    border: none;
    font-size: 22px;
    color: #333;
    overflow: hidden;
  }
  .a-icon:hover{
      background-color: #f6f6f6 !important;
  }
  .a-earth{
    font-size: 18px;
  }
  .el-button:focus, .el-button:hover {
    border-color: rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
  }
  .el-menu-item.is-active {
    background-color:#16181D !important;
  }
  .a-logo{
    color: @main-color;
    .display_flex;
    .justify-content_flex-center;
    .align-items_center;
    border-bottom: 1px solid #000;
  }
  .el-menu--collapse {
    width: 83px;
  }
  .el-button:focus, .el-button:hover{
    color:#333;
  }
  .top-wrap{
    .flex_1;
    .display_flex;
    .flex-direction_column;
    height: 100%;
    overflow: hidden;
  }
  .top-f1{
    .flex_1;
    .display_flex;
    .align-items_center;
    .justify-content_flex-justify;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
  .search-box{
    margin-left: 10px;
    font-size: 22px;
    color:#333;
  }
  .el-input__inner{
    border: none;
  }
  .el-input-group__append, .el-input-group__prepend{
    color: #333;
    background-color: rgba(0,0,0,0) !important;
    border:none;
  }
  .top-right{
    .display_flex;
    .align-items_center;
    div{
      margin:0 5px;
    }
  }
  .top-f2{
    .display_flex;
    .align-items_center;
    .justify-content_flex-justify;
    overflow: hidden;
    height: 35px;
  }
  .f2-content{
    .flex_1;
    overflow: hidden;
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .index-icon{
    border: 1px solid #EBEEF5;
    border-top:none;
    border-bottom:none;
  }
  .edition{
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
       -moz-transform:rotate(90deg); 	/* Firefox */
        -ms-transform:rotate(90deg); 	/* IE 9 */
         -o-transform:rotate(90deg); 	/* Opera */
            transform:rotate(90deg);
    .edition-size{
      font-size: 18px;
      color: #333;
    }
  }
  ._active{
    background-color:#f6f6f6 !important;
    color: #000;
    .sel{
      width: 100% !important;
    }
  }
  ._hover:hover{
    background-color:#f6f6f6;
    color: #000;
    .sel{
      width:100% !important;
    }
  }
  /*右弹窗*/
  .right-pop{
    position: fixed;
    z-index: 99;
    right: 0;
    top: 8%;
    width: 0;
    height: 92%;
    border-radius: 2px;
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
    background: #fff;
    overflow-y:scroll;
    transition:width .3s;
    -moz-transition:width .3s ease-in-out; /* Firefox 4 */
    -webkit-transition:width .3s ease-in-out; /* Safari and Chrome */
    -o-transition:width .3s ease-in-out; /* Opera */
  }
  .Popback{
    width: 300px;
  }
</style>

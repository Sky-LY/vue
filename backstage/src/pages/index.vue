<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="my-index-col-bottom">
            <my-column :index="tabAll.tabs1.length" height="200px">
              <template slot="header">
                <h1>{{tabAll.indexTitle[0].title}}</h1>
              </template>
              <template slot="content1">
                <el-row :gutter="20">
                  <template>
                    <el-col :span="6" v-for="(tab,index) in tabAll.tabs1[0]" :key="index">
                      <my-tab :title="tab.title" :icon="tab.icon" :url="tab.url" style="margin-bottom: 10px;"></my-tab>
                    </el-col>
                  </template>
                </el-row>
              </template>
              <template slot="content2">
                <el-row :gutter="20">
                  <template >
                    <el-col :span="6" v-for="(tab,index) in tabAll.tabs1[1]" :key="index">
                      <my-tab :title="tab.title" :icon="tab.icon" :url="tab.url" style="margin-bottom: 10px;"></my-tab>
                    </el-col>
                  </template>
                </el-row>
              </template>
            </my-column>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="my-index-col-bottom">
            <my-column :index="1" height="200px">
              <template slot="header">
                <h1>{{tabAll.indexTitle[1].title}}</h1>
              </template>
              <template slot="content1">
                <el-row :gutter="20">
                  <template>
                    <el-col :span="12" v-for="(tab,index) in tabAll.tabs2" :key="index">
                      <my-tab2 :title="tab.title" :data="todo[index]" :url="tab.url" style="margin-bottom: 10px;"></my-tab2>
                    </el-col>
                  </template>
                </el-row>
              </template>
            </my-column>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="my-index-col-bottom">
            <my-column :index="3" height="400px">
              <template slot="header">
                <h1>{{tabAll.indexTitle[2].title}}</h1>
              </template>
              <template slot="content1">
                <my-echart4></my-echart4>
              </template>
              <template slot="content2">
                <my-echart3></my-echart3>
              </template>
              <template slot="content3">
                <my-echart2></my-echart2>
              </template>
            </my-column>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <side-left></side-left>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import myColumn from '../components/column';
  import myTab from '../components/tab';
  import myTab2 from '../components/tab2';
  import {indexCN} from '../assets/common/modules/index/indexCN';
  import {indexEN} from '../assets/common/modules/index/indexEN';
  import{arrtoarr} from "../utils/mixin"
  import myEchart1 from "../components/echarts/echart1"
  import myEchart2 from "../components/echarts/echart2"
  import myEchart3 from "../components/echarts/echart3"
  import myEchart4 from "../components/echarts/echart4"
  import {httpUrl} from "../api/api"
  import sideLeft from '../components/sideLeft'
  export default{
    data() {
      return {
        visible: false,
        tabAll:[],
        indexCN:[],
        indexEN:[],
        one:[22,33,44,55],
        todo:[]
      }
    },
    created(){
      this.indexCN = indexCN;
      this.indexEN = indexEN;
      this.indexCN.tabs1 = arrtoarr(indexCN.tabs1,8)
      this.indexEN.tabs1 = arrtoarr(indexEN.tabs1,8)
      this.tabAll =this.indexCN
      this.$http.get(httpUrl.test1)
        .then(rev => {
          this.todo = rev.data.todo
        })
        .catch(err => {
          console.log(err)
        })
    },
//    监听中英文切换
    watch:{
      lang(newValue, oldValue) {
        if(newValue === 'cn'){
          this.tabAll =this.indexCN
        }else {
          this.tabAll =this.indexEN
        }
      }
    },
    computed: {
      count () {
        return this.$store.state.count
      },
      lang(){
        return this.$store.state.lang
      }
    },
    components: {
      myColumn,
      myTab,
      myTab2,
      myEchart1,
      myEchart2,
      myEchart3,
      myEchart4,
      sideLeft
    },
    inject:  ['reload'],
    methods: {
      increment () {
        this.$store.commit('increment')
      },
      decrement () {
        this.$store.commit('decrement')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .my-index-col-bottom{
    margin-bottom: 20px;
  }
</style>

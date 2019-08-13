/**
 * Created by Administrator on 2018/7/10 0010.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    swiperBase:0,
    navLable:[],
    active: false,
    lang: 'cn'
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    //添加页面标签一个数组
    addNav (state,val) {
      var v = val.index;
      var arr = state.navLable;
      var flag = true;
      for(var i = 0; i < arr.length; i++){
        if(v == arr[i].index){
          flag = false;
          break
        }
      }
      if(flag){
        state.navLable.push(val);
      }
      return state.navLable;
    },
    // 关闭当前页面
    delNav(state,idx){
      state.navLable.splice(idx, 1);
    },
    // 关闭其他页面
    closeOther(state, val){
      state.navLable.splice(0,state.navLable.length);
      state.navLable.push(val);
    },
    // 关闭所有页面
    closeAll(state){
      state.navLable.splice(0,state.navLable.length);
    }
  }
});

export default store;

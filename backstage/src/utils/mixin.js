/**
 * Created by Administrator on 2018/8/22 0022.
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n'

Vue.use(ElementUI);
Vue.use(VueI18n);
export function changeLangEvent() {
  this.$confirm('确定切换语言吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (this.$i18n.locale === 'zh-CN') {
      this.$i18n.locale = 'en-US';//关键语句
    } else {
      this.$i18n.locale = 'zh-CN';//关键语句
    }
  }).catch(() => {
    console.log('catch');
    this.$message({
      type: 'info',
      message: '已取消切换'
    });
  });
}
//      把一个数组分成两份储存在一个数组里
export function arrtoarr(arr,a){
  var arr1 = arr;
  var arr2 = [];
  for(var i = 0; i<arr1.length; i++){
    var arr3 = arr1.splice(0, a);
    arr2.push(arr3)
  }
  if(arr1.length > 0){
    arr2.push(arr1)
  }
  return arr2
}

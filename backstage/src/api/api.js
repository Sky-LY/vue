/**
 * Created by Administrator on 2018/6/4 0004.;
 */
// var tid = this.USER.RSAKeyPair('userId');
let localhostDev = false;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
let _host= localhostDev ? './static' : 'https://api.myjson.com';
let httpUrl = {
  // 'test1': _host + '/data.json',//本地测试
  'test1': _host + '/bins/zgq2i',
  'sku': _host + '/bins/1a8o4a'
};
export {httpUrl}

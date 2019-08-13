<template>
    <div class="box">
        <div class="title">版本信息</div>
        <div class="mine">
          <p><span>当前版本：</span><span>Tugou-v1.0.0</span></p>
          <p><span>基于框架：</span><span>Vue-v2.5.2、Element-v2.4.6</span></p>
        </div>
      <div class="title">关于版权</div>
      <div class="mine">
        <div class="txt">该后台界面设计参照与layuiAdmin-v1.0.0，由Mr.huang个人制作完成，为非商用性项目。</div>
        <p> © 2018 tugou.com 版权所有</p>
      </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    @white: #fff;
    .box{
      padding: 10px;
      color: #666;
      .title{
        border-bottom: 1px solid #f6f6f6;
        padding: 10px 0;
      }
      .mine{
        padding: 10px 0;
        p{
          margin: 10px 0;
          font-size: 14px;
          line-height: 22px;
        }
        .txt{
          background-color: #f2f2f2;
          padding: 10px;
          font-size: 14px;
          line-height: 22px;
          min-height: 100px;
        }
      }
    }
</style>


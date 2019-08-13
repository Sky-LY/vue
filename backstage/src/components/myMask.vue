<template>
    <div class="box" @click="close"></div>
</template>
<script>
  export default{
    methods: {
      close:function () {
        this.$emit('close',false)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    background-color: rgb(0, 0, 0);
    opacity: 0.1;
    z-index: 98;
  }
</style>


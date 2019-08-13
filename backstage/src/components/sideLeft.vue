<template>
    <div class="sideLeft">
      <sku></sku>
    </div>
</template>
<script>
  import Sku from '../components/sku';
  export default {
    data() {
      return {}
    },
    components: {
      Sku
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .sideLeft{
    background: #fff;
  }
</style>


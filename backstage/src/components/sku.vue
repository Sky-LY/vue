<template>
    <div class="sku">
      <div class="stand">
        <ul>
          <li class="attr" v-for="(item,index) in standData" :key="index">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-button icon="el-icon-delete" @click="remove(index)" class="delBtn"></el-button>
                <el-input class="title" v-model="item.title" placeholder="请输入属性">:</el-input>
                <el-button icon="el-icon-plus" @click="addAtrr(index)" class="addAtrrBtn"></el-button>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="putt" v-if="item.attrs.length" v-for="(subitem,i) in item.attrs" :key="i">
                  <div style="display:inline-block;width: 56px;height: 30px"></div>
                  <el-input v-model="subitem.attr" placeholder="请输入值" class="title"></el-input>
                  <el-button icon="el-icon-close" @click="closeAtrr(index,i)" style="border:none"></el-button>
                </div>
              </el-col>
            </el-row>
          </li>
        </ul>
        <div class="add">
          <el-button @click="addStand" class="addAtrrBtn">添加规格</el-button>
          <el-button @click="getTable" class="addAtrrBtn">生成规格列表</el-button>
          <!--<el-button type="primary" @click="read">读取规格列表</el-button>-->
        </div>
      </div>
      <div class="table">
        <el-table  v-if="isTable"
                   :data="tableData"
                   border
                   stripe
                   style="width: 100%">
          <el-table-column
            prop="date"
            label="属性">
          </el-table-column>
          <el-table-column
            label="原价(￥)"
            >
            <template slot-scope="scope">
              <el-input placeholder="原价" class="title" v-model="scope.row.originalPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="售价(￥)"
           >
            <template slot-scope="scope">
              <el-input placeholder="售价" class="title" v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="库存(件)"
           >
            <template slot-scope="scope">
              <el-input placeholder="库存" class="title" v-model="scope.row.stock"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="运费(￥)"
           >
            <template slot-scope="scope">
              <el-input placeholder="运费" class="title" v-model="scope.row.freight" :disabled="scope.row.freeShipping == '1'?true:false"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="包邮"
            width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.freeShipping"
                active-value = '1'
                inactive-value = '0'
                active-color="#009688"
                inactive-color="#DCDFE6"
                @change="freeShipChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="submitBtn">
        <el-button @click="onSubmit" v-show="tableData.length >0">提交</el-button>
      </div>
    </div>
</template>
<script>
  import {httpUrl} from "../api/api"
  export default {
    data() {
      return {
        tableData: [],
        input: '',
        isTable: false,
        standData: [],
        list: [],
        group: [],
        arrData:[]
      }
    },
    created() {
      this.getSku()
    },
    methods: {
//        获取sku数据
      getSku(){
        var that = this;
        that.$http.get(httpUrl.sku)
          .then(res => {
              that.$nextTick(function () {
                that.arrData = res.data.sku;
                if(that.arrData.length>0){
                  that.read();
                  that.getTable()
                }
              })
          })
      },
      freeShipChange(row){
        if(row.freeShipping == 1){
          row.freight = 0
        }
      },
//        获取表格数据
      onSubmit(){
        console.log(this.tableData)
      },
      // 添加规格行
      addStand (i) {
        //  限制规格种类不超过4种
        if (this.standData.length>3) {
          this.$message('不能超过四行')
        } else {
          this.standData.push({title: '', attrs: []})
        }
      },
      // 添加规格表格
      getTable () {
        this.isTable = true
        this.tableData = []
        this.group = []
        this.list = []
//           console.log(this.standData);
        const num = this.standData.length;
        this.standData.forEach(item => {
          this.list.push(item.attrs)
        });
        //   console.log(this.list);
        var arr = []
        var that = this
        function func(skuarr=[], i){
          for (let j=0; j<that.list[i].length; j++) {
            if (i<that.list.length-1) {
              skuarr[i] = that.list[i][j].attr
              func(skuarr, i+1)
            } else {
              arr.push([...skuarr,that.list[i][j].attr])
            }
          }
          return arr
        }
        let newList = func([], 0)
        let b
        newList.forEach(item => {
          b = ''
          for (let i = 0; i < num; i++) {
            let a = this.standData[i].title
            a = a + ':' + item[i]
            b = b + a + ';'
          }
          this.group.push(b)
        })
        let table = [];
        for (let j = 0; j < this.group.length; j++) {
          if(that.arrData.length == this.group.length){
            table.push({
              date: this.group[j],
              originalPrice: this.arrData[j].originalPrice,
              price: this.arrData[j].price,
              stock: this.arrData[j].stock,
              freeShipping: this.arrData[j].freeShipping,
              freight:this.arrData[j].freight
            })
          }else {
            table.push({
              date: this.group[j],
              originalPrice: '',
              price: '',
              stock: '',
              freeShipping: '1',
              freight: '0'
            })
          }
        }
        this.tableData = table
      },

      // 删除规格行
      remove (i) {
        this.standData.splice(i,1)
        if(this.standData.length <1){
          this.arrData = []
        }
        this.getTable()
      },
      // 添加属性值
      addAtrr (i) {
        //  限制属性值不超过5个
        if (this.standData[i].attrs.length>4) {
          this.$message('不能超过5个')
        } else {
          // 存的时候是存的对象
          this.standData[i].attrs.push({attr: ''})
        }
      },
      // 删除属性值
      closeAtrr (a, b) {
        //   console.log(a, b);
        this.standData[a].attrs.splice(b,1)
      },
      // 读取规格属性数组
      read () {
        var arrData= this.arrData;
        var arr = []
        for(let i =0; i<arrData.length;i++){
          arr.push(arrData[i].date)
        }
        const a = arr[0].split(';')
        const num =a.length-1
        let ss = []
        for (let tt = 0; tt < num; tt++){
          ss.push([])
        }
        arr.forEach(item => {
          for (let tt = 0; tt < num; tt++){
            ss[tt].push(item.split(';')[tt].split(':')[1])
          }
        })
        ss = ss.map(item => {
          return Array.from(new Set(item))
        })
        for (let s = 0; s < ss.length; s++) {
          for (let t = 0; t < ss[s].length; t++) {
            ss[s][t] = {attr:ss[s][t]}
          }
        }
        for (let i = 0; i < num; i++) {
          this.standData.push({'title': a[i].split(':')[0],attrs: ss[i]})
        }
//        console.log(this.standData);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .sku{
    padding: 20px;
    .stand{
      border: 1px solid #f2f2f2;
      padding: 20px;
      ul{
        li{
          list-style: none;
          padding: 10px 0;
          border-bottom: 1px solid #f2f2f2;
          margin-bottom: 10px;
          .delBtn{
            border:none;
            background: #909399;
            color: #fff;
          }
          .title {
            background-color: bisque;
            border: 1px solid #f2f2f2;
          }
          .putt {
            display: inline-block;
            position: relative;
            margin: 10px 0;
          }
        }
      }
    }
    .table{
      padding: 20px 0;
    }
    .submitBtn{
      display: flex;
      justify-content: center;
      align-items: center;
      button{
        color:#fff;
        background: #009688;
      }
    }
  }
  .addAtrrBtn{
    background: #009688;
    color:#fff;
  }
  .el-input {
    width: auto;
  }
</style>

<template>
  <div class="container">
    <el-row class="title">
      <el-col :span="8"
        ><div class="grid-content bg-purple-light">文档信息</div></el-col
      >
    </el-row>
    <el-collapse
      @change="handleChange"
      v-for="item in tableData"
      v-bind:key="item.id"
    >
      <el-collapse-item>
        <template slot="title">
          {{ item.name }}
        </template>
        <div>
          {{ item.detail }}
        </div>
        <div>Author:{{ item.user_id }}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "documentList",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getBudgetInfo();
  },
  methods: {
    getBudgetInfo() {
      this.$axios.get("/api/document/getdoc").then((res) => {
        //console.log(res.data);
        this.tableData = res.data;
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  padding: 5px 15px 15px 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.budget-container {
  width: 100%;
  height: auto;
  padding: 5px 15px 15px 15px;
  margin-top: 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.btnright {
  float: right;
}
.title {
  margin: 15px;
}
</style>

<template>
  <div class="container">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <el-form-item label="按关键字搜索">
          <el-input
            v-model="keyword_data.keyword"
            placeholder="请输入项目标题关键字搜索"
          ></el-input>
        </el-form-item>
        <el-form-item class="btnsub" style="margin-right: 50px">
          <el-button
            type="primary"
            size="mini"
            icon="“view”"
            @click="handleKeywordSearch()"
            >搜索</el-button
          >
        </el-form-item>
        <!--筛选搜索-->
        <el-form-item label="按时间筛选">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="请选择开始时间"
          ></el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="请选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            icon="search"
            @click="handleSearch()"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="btnright">
          <el-button
            type="primary"
            size="mini"
            icon="“view”"
            @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="700"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" align="center" width="70">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设计名称"
          align="center"
          width="250"
        >
        </el-table-column>
        <el-table-column label="设计师" align="center" width="180">
          <template slot-scope="scope">
            <span
              v-for="item in userData"
              v-if="scope.row.designer_id == item.id"
              v-bind:key="item.id"
              >{{ item.name }}</span
            >
            <!--<span>{{scope.row.designer_id == userData.id ? userData.name: scope.row.designer_id}}</span>-->
          </template>
        </el-table-column>
        <el-table-column label="部门" align="center" width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.department_id == 1">地产</span>
            <span v-else>文旅</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="budget"
          label="预算（万）"
          align="center"
          width="170"
          :sortable="true"
          :sort-by="SortByBudget"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="立项时间"
          align="center"
          width="250"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="220">
        </el-table-column>

        <el-table-column prop="level" label="优先级" width="150" align="center">
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="paginations.total"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "designList",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: "",
      },
      keyword_data: {
        keyword: "",
      },
      filterTableData: [],
      paginations: {
        page_index: 1,
        total: 10,
        page_size: 10,
        page_sizes: [10, 20, 50, 100],
        layout: "total,sizes,prev.pager,next,jumper",
      },
      tableData: [],
      allTableData: [],
      formData: {
        name: "",
        designer_id: "",
        department_id: "",
        budget: "",
        date: "",
        status: "",
        level: "",
        id: "",
      },
      userData: {
        id: "",
        name: "",
      },
      dialog: {
        show: false,
        title: "",
        option: "edit",
      },
    };
  },
  created() {
    this.getProfile();
    this.getDepartmentName();
    this.getDesignerName();
  },
  methods: {
    getProfile() {
      //获取表格数据方法
      this.$axios
        .get("/api/design/designlist")
        .then((res) => {
          //console.log(res.data);
          this.allTableData = res.data;
          this.filterTableData = res.data;
          //this.tableData = res.data;
          this.setPaginations();
        })
        .catch((err) => console.log(err));
    },
    updateProfile() {
      this.$axios.post(`/api/department/budget`).then((res) => {
        this.getProfile();
      });
    },
    setPaginations() {
      //分頁數據
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      //默認分頁數據
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    getDepartmentName() {
      this.$axios.get("/api/department/departmentlist").then((res) => {
        //console.log(res.data);
      });
    },
    getDesignerName() {
      this.$axios.get("/api/user/getuser").then((res) => {
        this.userData = res.data;
        //console.log(res.data);
      });
    },
    handleEdit(index, row) {
      //编辑方法
      this.dialog = {
        show: true,
        title: "修改设计项目信息",
        option: "edit",
      };

      this.formData = {
        name: row.name,
        designer_id: row.designer_id,
        department_id: row.department_id,
        budget: row.budget,
        date: row.date,
        status: row.status,
        level: row.level,
        id: row.id,
      };
      this.updateProfile();
    },
    handleDelete(index, row) {
      //删除方法
      this.$axios
        .post(`/api/design/deletedesign`, { id: row.id })
        .then((res) => {
          this.$message("删除成功");
          this.getProfile();
          this.updateProfile();
        });
    },
    handleAdd(index, row) {
      //编辑方法
      this.dialog = {
        show: true,
        title: "添加设计项目信息",
        option: "add",
      };
      this.formData = {
        name: "",
        designer_id: "",
        department_id: "",
        budget: "",
        date: "",
        status: "",
        level: "",
        id: "",
      };
      this.dialog.show = true;
      this.updateProfile();
    },
    handleSizeChange(page_size) {
      //切換size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let nums = this.paginations.page_size * page;
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      //篩選搜索
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "請選擇時間區間",
        });
        this.getProfile();
        return;
      }
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter((item) => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      this.setPaginations();
    },
    handleKeywordSearch() {
      //后端进行的关键字搜索功能
      this.$axios.post("/api/search/search", this.keyword_data).then((res) => {
        this.allTableData = res.data;
        this.setPaginations();
      });
    },
    SortByBudget(obj1, obj2) {
      let val1 = obj1.budget;
      let val2 = obj2.budget;
      return val1 - val2;
    },
  },
  components: {
    Dialog,
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  padding: 15px 15px 15px 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.btnright {
  float: right;
}
.pagination {
  text-align: center;
  margin-top: 10px;
}
</style>

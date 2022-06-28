<template>
  <div class="container">
    <div>
      <el-form :inline="true" ref="add_data">
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
        max-height="500"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" align="center" width="250">
        </el-table-column>
        <el-table-column
          prop="name"
          label="部门名称"
          align="center"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="budget"
          label="总预算(万)"
          align="center"
          width="230"
        >
        </el-table-column>
        <el-table-column label="已用总预算(万)" align="center" width="230">
          <template slot-scope="scope">
            <span
              v-for="item in designData"
              v-if="scope.row.department_id == item.department_id"
              v-bind:key="item.department_id"
              >{{ item.total_budget }}</span
            >
            <!--<span>{{scope.row.designer_id == userData.id ? userData.name: scope.row.designer_id}}</span>-->
          </template>
        </el-table-column>
        <el-table-column label="剩余(万)" align="center" width="230">
          <template slot-scope="scope">
            <span
              v-for="item in designData"
              v-if="scope.row.department_id == item.department_id"
              v-bind:key="item.department_id"
              >{{ scope.row.budget - item.total_budget }}</span
            >
            <!--<span>{{scope.row.designer_id == userData.id ? userData.name: scope.row.designer_id}}</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="department_id"
          label="部门ID"
          align="center"
          width="250"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="operation"
          label="操作"
          fixed="right"
        >
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
    </div>
    <Dialog
      :dialog="edialog"
      :formData="formData"
      @update="getDepartmentName"
    ></Dialog>
    <template>
      <div class="budget-container">
        <el-descriptions
          title="总预算信息"
          :data="BudgetData"
          :column="3"
          border
        >
          <el-descriptions-item
            label="总预算（万）"
            label-class-name="my-label"
            content-class-name="my-content"
            >{{ BudgetData[0].total_budget }}</el-descriptions-item
          >
          <el-descriptions-item label="剩余总预算（万）">{{
            BudgetData[0].remaining_budget
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
    <div class="Charts" id="Charts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import Dialog from "../components/DepDialog";
export default {
  name: "designList",
  data() {
    return {
      tableData: [],
      BudgetData: [],
      designData: {
        id: "",
        department_id: "",
        total_budget: "",
      },
      edialog: {
        show: false,
        title: "",
        option: "edit",
      },
    };
  },
  created() {
    this.getDepartmentName();
    this.getDesignInfo();
    this.getBudgetInfo();
  },
  methods: {
    getDepartmentName() {
      this.$axios
        .get("/api/department/departmentlist")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => console.log(err));
    },
    getDesignInfo() {
      this.$axios.get("/api/department/getdepartmentbudget").then((res) => {
        //console.log(res.data);
        this.designData = res.data;
      });
      this.updateInfo();
    },
    getBudgetInfo() {
      this.$axios.get("/api/department/budgetlist").then((res) => {
        console.log(res.data);
        this.BudgetData = res.data;
      });
    },
    updateInfo() {
      this.$axios
        .post(`/api/department/budget`)
        .then((res) => {
          console.log("non error");
        })
        .catch((err) => console.log(err));
    },
    handleEdit(index, row) {
      //编辑方法
      this.edialog = {
        show: true,
        title: "修改部门信息",
        option: "edit",
      };

      this.formData = {
        name: row.name,
        department_id: row.department_id,
        budget: row.budget,
        id: row.id,
      };
      this.getDepartmentName();
      this.getDesignInfo();
      this.getBudgetInfo();
    },
    handleDelete(index, row) {
      //删除方法
      this.$axios
        .post(`/api/department/deletedepartment`, { id: row.id })
        .then((res) => {
          this.$message("删除成功");
          this.getDepartmentName();
          this.getDesignInfo();
          this.getBudgetInfo();
        });
    },
    handleAdd(index, row) {
      //编辑方法
      this.edialog = {
        show: true,
        title: "添加部门信息",
        option: "add",
      };
      this.formData = {
        name: "",
        department_id: "",
        budget: "",
        id: "",
      };
      this.edialog.show = true;
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
</style>

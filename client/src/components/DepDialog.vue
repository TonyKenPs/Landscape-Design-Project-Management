<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      width="40%"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="auto"
          style="margin: 10px; witth: auto"
        >
          <el-form-item prop="name" label="部门名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="department_id" label="部门ID">
            <el-input v-model.number="formData.department_id"></el-input>
          </el-form-item>
          <el-form-item prop="budget" label="预算（万）">
            <el-input v-model.number="formData.budget"></el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button type="danger" @click="dialog.show = false"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialog",
  data() {
    return {
      formData: {
        name: "",
        department_id: "",
        budget: "",
        id: "",
      },
      form_rules: {
        name: [
          {
            required: true,
            message: "部门名称不能为空",
            trigger: "blur",
          },
        ],
        department_id: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur",
          },
          {
            type: "number",
            message: "部门ID仅为数字",
            trigger: "blur",
          },
        ],
        budget: [
          {
            required: true,
            message: "预算金额不能为空",
            trigger: "blur",
          },
          {
            type: "number",
            message: "预算仅为数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    dialog: Object,
    formData: Object,
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const url = this.dialog.option == "add" ? "adddepartment" : `editdepartment`;
          this.$axios.post(`/api/department/${url}`, this.formData).then((res) => {
            this.$message({
              message: "成功",
              type: "success",
            });
            //关闭dialog
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    },
  },
};
</script>
<style scoped></style>

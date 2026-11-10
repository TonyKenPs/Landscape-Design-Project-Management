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
          <el-form-item prop="name" label="设计项目名称">
            <el-input type="name" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="date" label="日期">
            <el-input type="date" v-model="formData.date"></el-input>
          </el-form-item>
          <el-form-item prop="budget" label="预算（万）">
            <el-input v-model.number="formData.budget"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-input v-model="formData.status"></el-input>
          </el-form-item>
          <el-form-item prop="level" label="优先级">
            <el-input v-model="formData.level"></el-input>
          </el-form-item>
          <el-form-item prop="designer_id" label="设计师ID">
            <el-input v-model.number="formData.designer_id"></el-input>
          </el-form-item>
          <el-form-item prop="department_id" label="部门">
            <el-select
              v-model.number="formData.department_id"
              placeholder="部门"
              style="width: 100%"
            >
              <!--直接取值方式-->
              <el-option label="地产" value=1></el-option>
              <el-option label="市政" value=2></el-option>
              <!--
                  遍历方式取值
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                label="formtype"
                :value="formtype"
              ></el-option>
              -->
            </el-select>
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
        designer_id: "",
        department_id: "",
        budget: "",
        date: "",
        status: "",
        level: "",
        id: "",
      },
      format_type_list: ["地产", "文旅"],
      form_rules: {
        name: [
          {
            required: true,
            message: "设计项目名称不能为空",
            trigger: "blur",
          },
        ],
        designer_id: [
          {
            required: true,
            message: "设计师不能为空",
            trigger: "blur",
          },
          {
            type:'number',
            message:'设计师ID仅为数字',
            trigger: "blur",
          }
        ],
        department_id: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur",
          },
          {
            type:'number',
            message:'部门ID仅为数字',
            trigger: "blur",
          }
        ],
        budget: [
          {
            required: true,
            message: "预算金额不能为空",
            trigger: "blur",
          },
          {
            type:'number',
            message:'预算仅为数字',
            trigger: "blur",
          }
        ],
        date: [
          {
            required: true,
            message: "日期不能为空",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "工作状态不能为空",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "设计优先度不能为空",
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
          const url =
            this.dialog.option == "add"
              ? "adddesign"
              : `editdesign`;
          this.$axios.post(`/api/design/${url}`, this.formData).then((res) => {
            this.$message({
              message: "成功新增项目",
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

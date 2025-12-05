<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">景观设计管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerUser.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              v-model="registerUser.password2"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="部门" prop="department">
            <el-select v-model="registerUser.department" placeholder="请选部门">
              <el-option label="地产" value="1"></el-option>
              <el-option label="市政" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="registerUser.phone"
              placeholder="请输入电话"
            ></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-select v-model="registerUser.gender" placeholder="请选性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>

          <el-form-item label="身份">
            <el-select
              v-model="registerUser.identity"
              placeholder="请选择权限类型"
            >
              <el-option label="管理员" value="admin"></el-option>
              <el-option label="员工" value="staff"></el-option>
            </el-select>
          </el-form-item>

          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('registerForm')"
            >注册</el-button
          >
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        username: "",
        password: "",
        password2: "",
        department: "",
        phone: "",
        gender: "",
        name: "",
        identity: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30字符间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30字符间",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "请再次输入确认密码",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "长度在2到30字符间",
            trigger: "blur",
          },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        department: [
          {
            required: true,
            message: "部门不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "性别不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
        ],
        identity: [
          {
            required: true,
            message: "用户身份不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.$axios.post("/api/login/register", this.registerUser);
            this.$message.success("注册成功！");
            this.$router.push("/login");
          } catch (err) {
            this.$message.error("注册失败，请重试");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100vh;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
}

.form_container {
  width: 420px;
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.manage_tip .title {
  display: block;
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.registerForm {
  width: 100%;
}

.submit_btn {
  width: 100%;
  margin-top: 15px;
}
</style>

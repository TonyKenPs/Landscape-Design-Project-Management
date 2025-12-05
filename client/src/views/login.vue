<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="loginForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginUser.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginUser.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <div class="btn_group">
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button type="primary" class="submit_btn" @click="toRegister()"
              >注册</el-button
            >
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.$axios.post(
              "/api/login/logincheck",
              this.loginUser
            );
            const { identity, token } = res.data.data;

            localStorage.setItem("token", token);
            localStorage.setItem("identity", JSON.stringify(identity));

            const decoded = jwt_decode(token);

            this.$store.dispatch("setAuthenticated", true);
            this.$store.dispatch("setUser", decoded);
            this.$store.dispatch("setIdentity", identity);

            this.$message.success("登录成功");
            this.$router.push("/home");
          } catch (err) {
            this.$message.error("用户名或密码错误");
          }
        }
      });
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: cover;

  /* 居中容器 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.form_container {
  width: 400px;
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

.loginForm {
  width: 100%;
}

.btn_group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>

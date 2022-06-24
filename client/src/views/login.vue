<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">景观设计管理系统</span>
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
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button type="primary" class="submit_btn" @click="toRegister()"
            >注册</el-button
          >
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/login/logincheck", this.loginUser)
            .then((res) => {
              const { identity, token } = res.data.data;
              localStorage.setItem("token", token);
              localStorage.setItem("identity", identity);
              const decoded = jwt_decode(token);
              this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
              //儲存解碼好的username到Vuex
              this.$store.dispatch("setUser", decoded);
              this.$store.dispatch("setIdentity", identity);
              //Success
              this.$message({
                message: "Success,登陆验证成功",
                type: "success",
              });
              this.$router.push("/home");
            })
            .catch((res) => {
              this.$message({
                message: "用户信息错误",
                type: "error",
              });
            });
        }
      });
    },
    toRegister() {
      this.$router.push("/register");
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 25%;
  left: 45%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 40%;
}
</style>

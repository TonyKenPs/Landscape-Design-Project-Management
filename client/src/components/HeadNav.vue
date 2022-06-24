<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <!--<img
          src="null"
          class="logo"
          alt=""
        >-->
        <span class="title">景观设计管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img
            src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
            class="avatar"
            alt=""
          />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.username}}</p>
          </div>
          <span class="username">
            <!--下拉菜单-->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "head-nav",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setDialogInfo(cmdItem) {
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      this.$router.push("/infoshow");
    },
    logout() {
      localStorage.removeItem("token");
      //设置Vuex store
      this.$store.dispatch("clearCurrentState");
      //
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 80px;
  min-width: 600px;
  padding: 5px;
  background: #6b8eaf;
  color: #fff;
  border-bottom: 1px solid #8aa3bd;
}
.logo-container {
  line-height: 80px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  margin-left: 15px;
}
.user {
  line-height: 80px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: white;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>

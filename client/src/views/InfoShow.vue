<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img
            src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
            class="avatar"
            alt=""
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <!--<span>Ken</span>-->
            <span>{{ user.username }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{ identity }}</span>
            <!-- <span>{{user.identity =="manamger" ? "Admin": "User">}}</span> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  name: "infoshow",
  data() {
    return {
      identity: "",
    };
  },
  created() {
    this.getDesignerName();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    getDesignerName() {
      this.$axios.get("/api/user/getuser").then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          const decoded = jwt_decode(localStorage.token);
          //console.log(res.data[index].username);
          //console.log(decoded.username);
          if (decoded.username == res.data[index].username) {
            this.identity = res.data[index].identity;
          }
        }
        this.userData = res.data;
        //console.log(res.data);
      });
    },
  },
};
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url(../assets/bg.jpg) center no-repeat;
  background-size: 100%;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
  background-color: rgb(238, 238, 238, 0.3);
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: rgb(238, 238, 238, 0.48);
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: rgb(117, 67, 106);
}
.fa {
  padding: 15px;
}
</style>

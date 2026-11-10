<template>
  <el-row class="menu_page">
    <el-col :span="12">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#677996"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="currentActive"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      currentActive: "",
      items: [
        {
          icon: "el-icon-document",
          name: "项目管理",
          path: "design",
          children: [
            { path: "/designlist", name: "项目列表" },
            { path: "/designcharts", name: "预算图表" },
          ],
        },
        {
          icon: "el-icon-s-order",
          name: "组织架构信息管理",
          path: "department",
          children: [{ path: "/department", name: "部门信息" }],
        },
        {
          icon: "el-icon-user",
          name: "信息管理",
          path: "info",
          children: [
            { path: "/infoshow", name: "个人信息" },
            { path: "/document", name: "文档信息" },
          ],
        },
      ],
    };
  },
  created() {
    this.currentActive = this.$route.path;
    //console.log(this.$route.path);
  },
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 90px;
  left: 0;
  min-height: 100%;
  background-color: #8795ac;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 500px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>

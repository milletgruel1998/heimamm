<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse=!collapse"></i>
        <img class="marginlr" src="@/assets/img/loginTitle.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" :src="$store.state.userInfo.avatar" alt />
        <span class="name">{{$store.state.userInfo.username}}，您好</span>
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <el-menu
          :router="true"
          :default-active="$route.fullPath"
          class="el-menu-vertical-demo"
          :collapse="collapse"
        >
          <!-- v-show="item.meta.rules.includes($store.state.role)" -->
          <el-menu-item
            :index="'/home/'+item.path"
            v-for="(item,index) in $router.options.routes[1].children"
            :key="index"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
          <!-- <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main class="body_mod">
        <!-- 嵌套路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo, exitLogin } from "@/api/home.js";
import { removeToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      userInfo: "", // 用户信息
      baseUrl: process.env.VUE_APP_URL,
      collapse: false // 控制菜单动画
    };
  },
  created() {
    // 首页进行token判断，没有token的话就跳转到登录页
    if (!getToken()) {
      this.$router.push("/");
      return;
    }
    // 获取用户信息
    getUserInfo().then(res => {
      // console.log("用户信息", res);
      // console.log("当前路由信息", this.$route);
      // console.log("全部的路由信息", this.$router);
      this.userInfo = res.data;
      this.userInfo.avatar =
        process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
      // 将用户角色添加到vuex中
      this.$store.state.role = res.data.role;
      // console.log("用户角色", this.$store.state.role);
      // 当用户被禁用时
      if (res.data.status == 0) {
        //  当账号让禁用时，提示一下
        this.$message.warning("您的账号被禁用，请联系管理员！");
        // 清除到token
        removeToken();
        // 跳转到登录页
        this.$router.push("/");
      } else {
        // 判断 该用户可不可以访问该模块(侧边栏)
        if (!this.$route.meta.rules.includes(res.data.role)) {
          // 不允许 访问处理
          // 当账号让禁用时提示
          this.$message.warning("您无权访问该页面！");
          // 清除掉token
          removeToken();
          // 跳转到登录页
          this.$router.push("/");
        }
      }
      // 将用户信息共享到vuex中
      this.$store.state.userInfo = this.userInfo;
    });
  },
  methods: {
    exit() {
      this.$confirm("是否确定要退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 调用退出接口
        exitLogin().then(() => {
          // 点了确定按钮，执行这里代码
          this.$message.success("退出成功！");
          // 删除token
          removeToken();
          // 跳转登录页
          this.$router.push("/");
        });
      });
    }
  }
};
</script>

<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 160px;
    }
  }
  .body_mod {
    background-color: #e8e9ec;
  }
}
</style>
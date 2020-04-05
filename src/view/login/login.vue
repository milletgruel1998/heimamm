<template>
  <div class="login">
    <div class="left">
      <div class="login_title">
        <img src="@/assets/img/loginTitle.png" alt />
        <span class="loginLeftText">黑马面面</span>
        <span class="loginLine">|</span>
        <span class="loginRightText">用户登录</span>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.psd"
            prefix-icon="el-icon-lock"
            :show-password="true"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="form.verification"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                class="verification"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-input class="verification" prefix-icon="el-icon-key"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/logo.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "", // 用户名
        psd: "", // 用户密码
        verification: "" // 验证码
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
.login {
  display: flex;
  /* 水平方向 */
  justify-content: space-around;
  /* 侧轴方向 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .login_title {
      margin-bottom: 18px;
    }
    .loginLeftText {
      width: 94px;
      height: 22px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin: 0 15px 0 15px;
    }
    .loginLine {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
    }
    .loginRightText {
      width: 87px;
      height: 21px;
      font-size: 22px;
      font-weight: 400;
      color: rgba(12, 12, 12, 1);
      margin-left: 15px;
    }
  }
}
</style>
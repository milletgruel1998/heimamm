<template>
  <div class="login">
    <div class="left">
      <div class="login_title">
        <img src="@/assets/img/loginTitle.png" alt />
        <span class="loginLeftText">黑马面面</span>
        <span class="loginLine">|</span>
        <span class="loginRightText">用户登录</span>
      </div>
      <!-- form表单 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            :show-password="true"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="form.code"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                class="verification"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/codePic.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-checkbox v-model="form.checked">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-checkbox>
        <!-- 登录+注册按钮 -->
        <el-form-item>
          <el-button type="primary" class="login_btn" @click="loginClick()">登录</el-button>
          <br />
          <el-button type="primary" class="register_btn" @click="dialogVisible = true">注册</el-button>
        </el-form-item>
        <!-- 注册弹出框 -->
        <el-dialog :visible.sync="dialogVisible" width="30%" :show-close="false">
          <div slot="title">用户注册</div>
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/logo.png" alt />
    </div>
  </div>
</template>

<script>
/* 导入注册组件 */
// import register from "@/view/register/register.vue";

export default {
  name: "login",
  // components: {
  //   register
  // },
  data() {
    return {
      form: {
        phone: "", // 手机号
        password: "", // 用户密码
        code: "", // 验证码
        checked: "" // 是否选中协议
      },
      /* 验证规则 */
      rules: {
        phone: [
          // 手机号码验证
          { required: true, message: "请输入11位的手机号", trigger: "blur" }
        ],
        password: [
          // 登录密码验证
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "请输入6到12位长度密码",
            trigger: "change"
          }
        ],
        code: [
          // 验证码验证
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请正确输入验证码", trigger: "blur" }
        ]
      },
      /* 默认注册弹出框是隐藏的 */
      dialogVisible: false
    };
  },
  methods: {
    /* 登录验证 */
    loginClick() {
      this.$refs.form.validate(res => {
        if (res) {
          this.$message.success("登录成功！");
        } else {
          this.$message.error("登录失败！");
        }
      });
    }
  }
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
    /* 登录+注册按钮 */
    .login_btn,
    .register_btn {
      width: 394px;
      height: 40px;
      background: rgba(20, 147, 250, 1);
      border-radius: 4px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
      margin-top: 26px;
    }
  }
}
</style>
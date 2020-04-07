<template>
  <!-- el-dialog：对话框 -->
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="register">
    <div slot="title" class="userLogin">用户注册</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="68px">
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="nickName" class="txtStyle">
        <el-input v-model="form.nickName" class="longInput"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="Email" class="txtStyle">
        <el-input v-model="form.Email" class="longInput"></el-input>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item label="手机" prop="phone" class="txtStyle">
        <el-input v-model="form.phone" class="longInput"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password" class="txtStyle">
        <el-input v-model="form.password" :show-password="true" class="longInput"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="8">
            <!-- <img src="../../assets/img/codePic.png" alt /> -->
            <!-- <el-input></el-input> -->
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码">
        <el-row>
          <el-col :span="16">
            <el-input></el-input>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btn_box">
        <el-button class="btn">取消</el-button>
        <el-button type="primary" class="btn">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nickName: "", // 昵称
        Email: "", // 邮箱
        phone: "", // 手机号
        password: "", // 密码
        code: "" // 验证码
      },
      /* 设置表单规则 */
      rules: {
        nickName: []
      },
      /* 控制是否显示对话框 */
      dialogFormVisible: false
    };
  }
};
</script>

<style lang="less">
.register {
  .userLogin {
    height: 53px;
    line-height: 53px;
    background: rgba(14, 156, 250, 1);
    color: #fff;
    font-size: 18px;
    text-align: center;
  }

  .longInput {
    width: 489px;
    height: 39px;
    border: 1px solid rgba(211, 215, 223, 1);
    border-radius: 4px;
  }

  .el-dialog__header {
    padding: 0;
  }
  .btn_box {
    text-align: center;
    .btn {
      width: 75px;
      height: 39px;
      border-radius: 4px;
    }
  }
}
</style> 
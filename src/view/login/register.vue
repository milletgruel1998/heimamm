<template>
  <!-- el-dialog：对话框 -->
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" width="600px" class="register">
    <div slot="title" class="userLogin">用户注册</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="68px">
      <!-- 头像 -->
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="username" class="txtStyle">
        <el-input v-model="form.username" class="longInput"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email" class="txtStyle">
        <el-input v-model="form.email" class="longInput"></el-input>
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
          <!-- offset：列偏移 -->
          <el-col :span="7" :offset="1">
            <img :src="codeUrl" @click="changeCode" class="codePic" />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="code_btn">
            <el-button @click="getPhoneCode" :disabled="totalTime!=60">
              获取用户验证码
              <span v-if="totalTime!=60">{{totalTime}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 取消+注册按钮 -->
      <el-form-item class="btn_box">
        <el-button class="btn" @click="cancel_btn">取消</el-button>
        <el-button type="primary" class="btn" @click="submitClick">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getPhoneCodeNum, submitForm } from "@/api/register.js";
export default {
  data() {
    return {
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms", // 图形验证码
      form: {
        avatar: "", // 头像地址---注册功能需要提交的数据
        username: "", // 昵称
        email: "", // 邮箱
        phone: "", // 手机号
        password: "", // 密码
        code: "", // 图形码
        rcode: "" // 手机验证码
      },
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              /* 正则校验 */
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                return callback();
              } else {
                return callback("请输入正确格式的邮箱！");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                return callback();
              } else {
                return callback("请输入正确的手机号！");
              }
            },
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "请输入6到12位的密码！",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确图形码", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "请输入手机验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位手机验证码", trigger: "blur" }
        ]
      },

      baseUrl: process.env.VUE_APP_URL, // 调用基地址
      imageUrl: "", // 只是纯展示那个图片 的地址
      dialogFormVisible: false, // 控制是否显示对话框
      totalTime: 60 // 获取验证码倒计时
    };
  },
  //----------------------------------侦听器------------------------------------
  /* 侦听器 */
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields(); // 表单提交成功后，清空表单
        this.imageUrl = ""; // 清空头像
        // this.dialogFormVisible = false; // 隐藏掉注册界面
      }
    }
  },
  //-----------------------------------methods------------------------------------
  methods: {
    /* 图片上传前的处理 */
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、jpg、gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /* 图片上传成功执行 */
    handleAvatarSuccess(res) {
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      /* 主动触发一下头像的表单验证：validateField
        第一个参数：需要验证的项 ---可以是字符串也可以是数组
        第二个参数：是一个结果的回调函数
            该结果如果为空，表示没问题；如果不为空表示验证不通过
        如果前面传的是数组，有多个值时，它会有两条结果
      */
      this.$refs.form.validateField("avatar");
    },
    /* 表单提交验证 */
    submitClick() {
      // 全局验证
      this.$refs.form.validate(result => {
        if (result) {
          submitForm(this.form).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("注册成功！");
              this.dialogFormVisible = false; // 隐藏掉注册界面
            } else {
              if (res.code == 201) {
                this.$message.error(res.message);
              }
            }
          });
        }
      });
    },
    /* 点击改变图形码图片 */
    changeCode() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    /* 获取手机验证码 */
    getPhoneCode() {
      let _pass = true;
      this.$refs.form.validateField(["phone", "code"], err => {
        if (err != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        this.totalTime--;
        let timer = setInterval(() => {
          this.totalTime--;
          if (this.totalTime == 0) {
            clearInterval(timer);
            this.totalTime = 60;
          }
        }, 1000);
        getPhoneCodeNum({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          // 不加字符串res.data.data.captcha是一个数字类型
          this.$message.success(res.data.captcha + "");
        });
      }
    },
    /* 取消按钮 */
    cancel_btn() {
      this.dialogFormVisible = false; // 隐藏掉注册界面
    }
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
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .codePic {
    width: 100%;
    height: 40px;
    border: 1px dashed #eee;
  }
}
</style> 
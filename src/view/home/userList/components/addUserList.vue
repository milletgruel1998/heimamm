<template>
  <div class="addUserList">
    <el-dialog :visible.sync="dialogFormVisible" width="447px">
      <div slot="title" class="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
      <el-form :model="form" :rules="rules" ref="form" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请选择角色" v-model="form.role_id">
            <!-- 这里的value值应该是number类型 -->
            <el-option
              v-for="(value,key,index) in $store.state.roleObj"
              :key="index"
              :value="+key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option :value="1" label="启用"></el-option>
            <el-option :value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUserData, editUserData } from "@/api/userList.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      form: {
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 手机号
        role_id: "", // 角色
        status: "", // 状态
        remark: "" // 备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "请输入3到8个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                return callback();
              } else {
                return callback("请输入正确格式的邮箱！");
              }
            },
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                return callback();
              } else {
                return callback("请输入正确的手机号！");
              }
            },
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      dialogFormVisible: false
    };
  },
  //-----------------------------------methods----------------------------------
  methods: {
    submitForm() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addUserData(this.form).then(() => {
              this.$message.success("新增成功！");
              this.$emit("refresh");
              this.dialogFormVisible = false;
            });
          } else {
            editUserData(this.form).then(() => {
              this.$message.success("编辑成功！");
              this.dialogFormVisible = false;
              this.$emit("refresh");
            });
          }
        }
      });
    }
  },
  //--------------------------------------watch-------------------------------
  watch: {
    dialogFormVisible(value) {
      if (value == false) {
        this.$refs.form.resetFields();
      }
    }
  }
};
</script>

<style lang="less">
.addUserList {
  .title {
    height: 54px;
    line-height: 54px;
    color: #fff;
    text-align: center;
    background-color: #04bbfb;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
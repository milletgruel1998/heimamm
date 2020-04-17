<template>
  <el-dialog :visible.sync="dialogFormVisible" width="600px" class="addSubiness">
    <div slot="title" class="title">{{this.mode=="add"?'新增企业':'编辑企业'}}</div>
    <el-form :model="form" :rules="rules" ref="form" class="form" label-width="100px">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBusiness, editBusiness } from "@/api/business.js";
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
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 企业简称
        intro: "", // 企业简介
        remark: "" // 企业备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业编号", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业编号", trigger: "blur" }]
      },
      dialogFormVisible: false
    };
  },
  //---------------------------------methods-----------------------
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.form.validate(res => {
        // 表单整体验证通过后，调用企业新增接口
        if (res) {
          if (this.mode == "add") {
            addBusiness(this.form).then(() => {
              this.$message.success("新增成功！");
              this.dialogFormVisible = false;
              this.$emit("refresh");
            });
          } else {
            editBusiness(this.form).then(() => {
              this.$message.success("编辑成功！");
              this.dialogFormVisible = false;
              this.$emit("refresh");
            });
          }
        }
      });
    }
  },
  //---------------------------------watch-----------------------
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
.addSubiness {
  .title {
    text-align: center;
    background-color: #109cfa;
    height: 53px;
    line-height: 53px;
    color: #fff;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
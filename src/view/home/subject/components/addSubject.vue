<template>
  <el-dialog class="subjectAdd" width="600px" :visible.sync="dialogFormVisible">
    <div slot="title" class="title">{{mode=='add'?'新增列表':'编辑列表'}}</div>
    <!-- 表单 -->
    <el-form :model="form" label-width="100px" :rules="rules" class="form" ref="form">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="confirmBtn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add" // 默认值
    }
  },
  data() {
    return {
      form: {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 学科简称
        intro: "", // 学科简介
        remark: "" // 备注
      },

      // 验证规则
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      dialogFormVisible: false
    };
  },
  //----------------------------------methods-------------------------------
  methods: {
    confirmBtn() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            // 验证通过后  执行的代码
            addSubject(this.form).then(() => {
              this.dialogFormVisible = false;
              this.$message.success("新增学科成功！");
              this.$emit("refresh");
            });
          } else {
            editSubject(this.form).then(() => {
              this.$message.success("编辑成功！"); // 弹出编辑成功的提示
              this.dialogFormVisible = false; // 编辑成功后隐藏弹出框
              this.$emit("refresh"); // 调用父方法，刷新学科列表
            });
          }
        }
      });
    }
  },
  //----------------------------------watch-------------------------------
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
.subjectAdd {
  .btn {
    text-align: center;
  }
  .el-dialog__header {
    padding: 0;
  }
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    background-color: #04bbfb;
    color: #fff;
    font-size: 18px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
<template>
  <div class="addQuestion">
    <el-dialog :visible.sync="dialogFormVisible" :fullscreen="true">
      <div slot="title" class="title">新增题库测试</div>
      <span>
        <el-form :model="form" ref="form" :rules="rules" class="form" label-width="100px">
          <el-form-item label="学科" prop="subject">
            <el-select placeholder="请选择学科" v-model="form.subject">
              <el-option
                v-for="(item,index) in subjectList"
                :key="index"
                :value="item.id"
                :label="item.name"
                v-show="item.status==1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段" prop="step">
            <el-select placeholder="请选择阶段" v-model="form.step">
              <el-option
                v-for="(value,key,index) in stepObj"
                :key="index"
                :value="+key"
                :label="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" prop="enterprise">
            <el-select placeholder="请选择企业" v-model="form.enterprise">
              <el-option
                v-for="(item,index) in businessList"
                :key="index"
                :value="item.id"
                :label="item.name"
                v-show="item.status==1"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 地区级联 -->
          <el-form-item label="城市" prop="city">
            <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
          </el-form-item>
          <el-form-item label="题型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio v-for="(value,key,index) in typeObj" :key="index" :label="+key">{{value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="难度" prop="difficulty">
            <el-radio-group v-model="form.difficulty">
              <el-radio
                v-for="(value,key,index) in difficultyObj"
                :key="index"
                :label="+key"
              >{{value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <hr />
          <!-- 试题标题富文本 -->
          <el-form-item label="试题标题" class="quillEditor" prop="title">
            <div class="sonStyle">
              <quillEditor
                v-model="form.title"
                @change="editChange('title')"
                :options="{placeholder:'请在这里输入...'}"
              />
            </div>
          </el-form-item>
          <!-- 单选、多选、简答 -->
          <el-form-item
            :label="typeObj[form.type]"
            :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]"
          >
            <allSelect :form="form" @change="selectChange" class="changeStyle" />
          </el-form-item>
          <hr />
          <!-- 视频解析 -->
          <el-form-item label="解析视频" class="videoStyle" prop="video">
            <uploadFile v-model="form.video" type="video" />
          </el-form-item>
          <hr />
          <!-- 答案解析富文本 -->
          <el-form-item label="答案解析" prop="answer_analyze">
            <div class="sonStyle">
              <quillEditor
                v-model="form.answer_analyze"
                @change="editChange('answer_analyze')"
                :options="{placeholder:'请在这里输入...'}"
              />
            </div>
          </el-form-item>
          <hr />
          <el-form-item label="试题备注" prop="remark">
            <el-input v-model="form.remark" class="remark"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { quillEditor } from "vue-quill-editor"; // 富文本
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import allSelect from "./allSelect.vue";
import uploadFile from "./uploadFile.vue";
import { addQuestion, editQuestion } from "@/api/question.js";
export default {
  components: {
    quillEditor,
    allSelect,
    uploadFile
  },
  props: {
    subjectList: Array,
    businessList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object,
    mode: String
  },
  data() {
    return {
      options: regionData,
      form: {
        subject: "", // 学科
        step: "", // 阶段
        enterprise: "", // 企业
        type: 1, // 题型
        difficulty: 1, // 难度
        city: [], // 城市
        title: "", // 富文本内容
        single_select_answer: "", // 单选答案
        multiple_select_answer: [], // 多选答案
        short_answer: "", // 简答答案
        video: "", // 解析视频路径
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      },
      dialogFormVisible: false,
      rules: {
        subject: [
          { required: true, message: "请选择学科！", trigger: "change" }
        ],
        step: [{ required: true, message: "请选择阶段！", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业！", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市！", trigger: "change" }],
        type: [{ required: true, message: "请选择题型！", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择难度！", trigger: "change" }
        ],
        title: [
          { required: true, message: "请填写试题标题！", trigger: "change" }
        ],
        single_select_answer: [
          { required: true, message: "必选项！", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "必选项！", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "请填写简答内容！！", trigger: "change" }
        ],
        answer_analyze: [
          { required: true, message: "请填写答案解析！", trigger: "change" }
        ],
        remark: [
          { required: true, message: "请填写试题备注！", trigger: "change" }
        ]
      }
    };
  },

  //-----------------------------------methods------------------------------------
  methods: {
    submitForm() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addQuestion(this.form).then(res => {
              console.log(res);
              this.$message.success("新增题目成功！");
              this.dialogFormVisible = false;
              this.$emit("refresh");
            });
          } else {
            // 先将this.form深克隆哦一份再改里面的数据格式
            let _params = JSON.parse(JSON.stringify(this.form));
            _params.city = _params.city.join(",");
            editQuestion(_params).then(() => {
              this.$message.success("编辑成功！");
              this.dialogFormVisible = false;
              this.$parent.getQuestionList();
            });
          }
        }
      });
    },
    /* 单独验证富文本 */
    editChange(str) {
      this.$refs.form.validateField(str);
    },
    /* 单独验证单选多选简答 */
    selectChange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    }
  },
  //----------------------------------watch--------------------------
  watch: {
    dialogFormVisible(value) {
      if (value == true) {
        this.$nextTick(() => {
          // 清空验证
          this.$refs.form.clearValidate();
        });
      }
    }
  }
};
</script>

<style lang='less'>
.addQuestion {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    background-color: #409eff;
    height: 54px;
    padding: 24px 0 0 18px;
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .dialog-footer {
    text-align: center;
  }
  .form {
    width: 832px;
    margin: 0 auto;
    .changeStyle {
      .el-input__inner {
        border-color: #dcdfe6;
      }
    }
  }
  .quillEditor {
    margin-top: 30px;
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-form-item__content .sonStyle {
    margin-left: -100px !important;
    margin-top: 50px;
  }
  .ql-toolbar.ql-snow {
    padding: 0;
  }
  .remark {
    margin-top: 50px;
    margin-left: -40px;
    width: 771px;
  }
  .videoStyle {
    margin-top: 30px;
  }
}
</style>
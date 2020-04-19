<template>
  <div class="question">
    <!-- 头部 -->
    <el-card class="question_header">
      <el-form :model="form" ref="form" class="form" label-width="70px">
        <el-row>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
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
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item,index) in businessList"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(value,key,index) in typeObj"
                  :key="index"
                  :value="+key"
                  :label="value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
                <el-option
                  v-for="(value,key,index) in difficultyObj"
                  :key="index"
                  :value="+key"
                  :label="value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select placeholder="请选择状态" v-model="form.status">
                <el-option :value="1" label="启用"></el-option>
                <el-option :value="0" label="禁用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input id="title" v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clearForm">清除</el-button>
              <el-button type="primary" @click="addQuestion">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 题库列表 -->
    <el-card class="question_list">
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column label="序号" width="66">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageCapacity+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="title" label="题目" width="263">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科.阶段" width="110">
          <template
            slot-scope="scope"
          >{{scope.row.subject_name}}.{{scope.row.step==1?'初级':(scope.row.step==2?'中级':'高级')}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="80">
          <template slot-scope="scope">{{scope.row.step==1?"单选":(scope.row.step==2?'多选':'简答')}}</template>
        </el-table-column>
        <el-table-column prop="enterprice_name" label="企业" width="80">
          <template slot-scope="scope">{{scope.row.enterprise_name}}</template>
        </el-table-column>
        <el-table-column prop="username" label="创建者" width="120"></el-table-column>
        <el-table-column label="状态" width="70">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="66"></el-table-column>
        <el-table-column label="操作" width="251">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button @click="deleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="pagination.pageCapacity"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          background
        ></el-pagination>
      </div>
    </el-card>
    <!-- 子组件 -->
    <addQuestion
      ref="addQuestion"
      :subjectList="subjectList"
      :businessList="businessList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
      @refresh="search"
      :mode="mode"
    />
  </div>
</template>

<script>
import {
  questionList,
  setQuestionStatus,
  deleteQuestion
} from "@/api/question.js";
import { getSubjectData } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
import addQuestion from "@/view/home/question/components/addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  data() {
    return {
      mode: "add",
      form: {
        subject: "", // 学科id
        step: "", // 题目阶段
        enterprise: "", // 企业id
        type: "", // 题目类型
        difficulty: "", // 题目难度
        username: "", // 作者
        status: "", // 状态
        create_date: "", // 创建日期
        title: "" // 标题名称
      },
      pagination: {
        currentPage: 1, // 当前页
        pageCapacity: 3, // 当前页容量
        total: 40 // 数据总量
      },
      // 阶段
      stepObj: {
        1: "初级",
        2: "中级",
        3: "高级"
      },
      // 题型
      typeObj: {
        1: "单选",
        2: "多选",
        3: "简答"
      },
      difficultyObj: {
        1: "简单",
        2: "一般",
        3: "困难"
      },
      subjectList: [], // 学科列表数据
      businessList: [], // 企业列表数据
      tableData: [] // 题库列表数据
    };
  },
  //-------------------------------methods--------------------------------
  methods: {
    // 当前页容量
    handleSizeChange(val) {
      this.pagination.pageCapacity = val;
      this.search();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getQuestionList();
    },
    // 获取当前页的数据
    getQuestionList() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageCapacity,
        ...this.form
      };
      questionList(_params).then(res => {
        console.log("获取当前页数据", res);
        this.tableData = res.data.items;
        // 转换数据格式
        this.tableData.forEach(item => {
          // 将城市转成数组
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 搜索按钮
    search() {
      this.pagination.currentPage = 1;
      this.getQuestionList();
    },
    // 清除按钮
    clearForm() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 更改状态
    setStatus(id) {
      setQuestionStatus({ id: id }).then(res => {
        console.log(res);
        this.$message.success("修改状态成功！");
        this.getQuestionList();
      });
    },
    // 新增题库
    addQuestion() {
      this.mode = "add";
      this.$refs.addQuestion.form = {
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
      };
      this.$refs.addQuestion.dialogFormVisible = true;
    },
    /* 删除题目 */
    deleteItem(id) {
      this.$confirm("您确定要删除这个题目吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 点击确认的处理
        deleteQuestion({ id: id }).then(() => {
          this.$message.success("删除成功！");
          this.search();
        });
      });
    },
    // 编辑题库
    edit(row) {
      this.mode = "edit";
      this.$refs.addQuestion.dialogFormVisible = true;
      this.$refs.addQuestion.form = JSON.parse(JSON.stringify(row));
    }
  },
  //-------------------------------created--------------------------------
  created() {
    // 获取学科列表数据
    getSubjectData({}).then(res => {
      // console.log("学科列表数据", res);
      this.subjectList = res.data.items;
    });
    // 获取企业列表数据
    getBusinessData({ limit: 1000 }).then(res => {
      // console.log("企业列表数据", res);
      this.businessList = res.data.items;
    });
    this.getQuestionList();
  }
};
</script>

<style lang="less">
.question {
  .question_header {
    margin-bottom: 19px;
    .el-icon-date:before {
      content: "";
    }
    .el-input--prefix .el-input__inner {
      width: 160px;
    }
    .el-input__icon {
      padding-right: 80px;
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
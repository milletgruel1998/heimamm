<template>
  <div class="question">
    <!-- 头部 -->
    <el-card class="question_header">
      <el-form :model="form" ref="form" class="form" label-width="70px" :inline="true">
        <el-form-item label="学科" prop="subject">
          <el-select placeholder="请选择学科" v-model="form.subject">
            <el-option
              v-for="(item,index) in subjectList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select placeholder="请选择阶段" v-model="form.step">
            <el-option value="1" label="初级"></el-option>
            <el-option value="2" label="中级"></el-option>
            <el-option value="3" label="高级"></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="题型" prop="type">
          <el-select placeholder="请选择题型" v-model="form.type">
            <el-option value="1" label="单选"></el-option>
            <el-option value="2" label="多选"></el-option>
            <el-option value="3" label="简答"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select placeholder="请选择难度" v-model="form.difficulty">
            <el-option value="1" label="简单"></el-option>
            <el-option value="2" label="一般"></el-option>
            <el-option value="3" label="困难"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-input placeholder="选择日期" v-model="form.create_date"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input id="title" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 题库列表 -->
    <el-card class="question_list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="66">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageCapacity+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="title" label="题目" width="250">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科.阶段" width="100">
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
        <el-table-column prop="username" label="创建者" width="110"></el-table-column>
        <el-table-column label="状态" width="70">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="66"></el-table-column>
        <el-table-column label="操作" width="251">
          <template>
            <el-button>编辑</el-button>
            <el-button>启用</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 200, 300, 400]"
          :page-size="pagination.pageCapacity"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { questionList } from "@/api/question.js";
import { getSubjectData } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
export default {
  data() {
    return {
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
    },
    // 当前页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
    },
    getQuestionList() {
      // 获取题目列表
      questionList(this.form).then(res => {
        // console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    }
  },
  //-------------------------------created--------------------------------
  created() {
    // 获取学科列表数据
    getSubjectData({}).then(res => {
      console.log("学科列表数据", res);
      this.subjectList = res.data.items;
    });
    // 获取企业列表数据
    getBusinessData({ limit: 1000 }).then(res => {
      console.log("企业列表数据", res);
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
    .el-input--suffix .el-input__inner {
      width: 150px;
      height: 38px;
    }
    .el-input__inner {
      width: 150px;
      height: 38px;
    }
    #title {
      width: 380px;
      height: 38px;
    }
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
<template>
  <div class="subject">
    <!-- 搜索栏 -->
    <el-card class="search">
      <el-form :model="form" label-width="70px" ref="form" :inline="true" class="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="setWidth" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" class="setWidth">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addData">+增加学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 学科列表 -->
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="70">
          <template
            slot-scope="scope"
          >{{(pagination.defaultPage-1)*pagination.pageItemCount+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="120"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="150"></el-table-column>
        <el-table-column prop="username" label="创建者" width="130"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="159"></el-table-column>
        <el-table-column prop="status" label="状态" width="130">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button @click="editData(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="deleteDate(scope.row.id)" type="warning">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.defaultPage"
          :page-sizes="[3, 20, 30, 40]"
          :page-size="pagination.pageItemCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 子组件标签 -->
    <addSubject ref="addSubject" :mode="mode" @refresh="search" />
    <!-- mode就好比一个标识符，它的作用就是为了区分是新增学科还是编辑学科 -->
  </div>
</template>

<script>
import {
  getSubjectData,
  getSubjectStatus,
  deleteSubStatus
} from "@/api/subject.js";
import addSubject from "./components/addSubject.vue";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add",
      // 表单属性
      form: {
        rid: "", // 学科编号
        name: "", // 学科名称
        username: "", // 创建者用户名
        status: "" // 判断是启用（1）还是禁用（0）
      },
      // 分页器属性
      pagination: {
        defaultPage: 1, // 当前在第多少页（默认在第1页）
        pageItemCount: 3, // 每页显示的数据量
        total: 40 // 总数据量
      },
      tableData: [] // 学科列表
    };
  },
  methods: {
    // 封装学科列表
    getData() {
      // 一进入页面就请求学科列表数据
      let _params = {
        page: this.pagination.defaultPage, // 当前页
        limit: this.pagination.pageItemCount, // 页容量
        ...this.form // 表单里面各项的参数
      };
      getSubjectData(_params).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 修改学科状态
    setStatus(id) {
      // console.log(id);
      getSubjectStatus({ id: id }).then(() => {
        this.$message.success("状态设置成功！");
        this.search();
      });
    },
    // 页容量改变时，调用的函数
    handleSizeChange(pageSize) {
      // pageSize：这个参数就是当前的页容量
      this.pagination.pageItemCount = pageSize;
      this.pagination.defaultPage = 1;
      this.getData();
    },
    // 页码改变时，调用的函数
    handleCurrentChange(page) {
      // page：这个参数就是当前点击的页码数
      this.pagination.defaultPage = page;
      this.getData();
    },
    // 给搜索按钮添加点击事件---搜索时，不管当前页是多少，都让它回到第一页
    search() {
      this.pagination.defaultPage = 1;
      this.getData();
    },
    // 清除表单
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 删除单条数据
    deleteDate(id) {
      this.$confirm("您确定要删除这条数据吗", "删除确认", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确认按钮   执行的代码
        .then(() => {
          deleteSubStatus({ id: id }).then(() => {
            this.$message.success("删除成功！");
            // 刷新数据
            this.search();
          });
        })
        // 点击取消按钮   执行的代码
        .catch();
    },
    // 新增学科列表数据
    addData() {
      this.mode = "add";
      this.$refs.addSubject.form = {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 学科简称
        intro: "", // 学科简介
        remark: "" // 备注
      };
      this.$refs.addSubject.dialogFormVisible = true;
    },
    // 编辑学科列表数据
    editData(row) {
      // 显示编辑界面
      this.mode = "edit";
      this.$refs.addSubject.dialogFormVisible = true;
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.subject {
  .search {
    margin-bottom: 19px;
  }
  .setWidth {
    width: 125px;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
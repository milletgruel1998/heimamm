<template>
  <div class="business">
    <!-- 行内表单 -->
    <el-card class="businessHeader">
      <el-form :model="form" ref="form" class="form" :inline="true" label-width="70px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearForm">清除</el-button>
          <el-button type="primary" @click="addSubiness">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 子组件 -->
    <addSubiness ref="addSubiness" @refresh="search" :mode="mode" />
    <!-- 企业信息 -->
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="70">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageItemCount+ scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="120"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="150"></el-table-column>
        <el-table-column prop="username" label="创建者" width="130"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="159"></el-table-column>
        <el-table-column prop="status" label="状态" width="130">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <span class="btnStyle" @click="editData(scope.row)">编辑</span>
            <span
              @click="setStatus(scope.row.id)"
              class="btnStyle forbidden"
            >{{scope.row.status==1?"禁用":"启用"}}</span>
            <span
              class="btnStyle"
              @click="deleteData(scope.row.id)"
              v-if="$store.state.role.includes('管理员')"
            >删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 5, 8, 10]"
          :page-size="pagination.pageItemCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalPage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getBusinessData,
  setBusinessStatus,
  deleteBusinessData
} from "@/api/business.js";
import addSubiness from "@/view/home/business/components/addSubiness.vue";
export default {
  components: {
    addSubiness
  },
  data() {
    return {
      mode: "add",
      form: {
        eid: "", // 企业编号
        name: "", // 企业名称
        username: "", // 创建者
        status: "" // 状态
      },
      pagination: {
        currentPage: 1, // 当前页
        pageItemCount: 3, // 页容量
        totalPage: 40 // 总数据量
      },
      tableData: [] // 企业信息
    };
  },
  //---------------------------metnods----------------------------
  methods: {
    // 改变页容量
    handleSizeChange(val) {
      this.pagination.pageItemCount = val;
      this.search();
    },
    // 改变当前页
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getListData();
    },
    // 将 获取企业列表数据 的代码封装
    getListData() {
      // 请求企业列表数据
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageItemCount,
        ...this.form
      };
      getBusinessData(_params).then(res => {
        // console.log(res);
        this.tableData = res.data.items;
        this.pagination.totalPage = res.data.pagination.total;
      });
    },
    // 修改企业状态
    setStatus(id) {
      setBusinessStatus({ id: id }).then(() => {
        this.$message.success("修改状态成功！");
        this.getListData();
      });
    },
    // 给搜索按钮添加点击事件
    search() {
      this.pagination.currentPage = 1;
      this.getListData();
    },
    // 清空头部表单
    clearForm() {
      this.$refs.form.resetFields();
      this.search(); // 清空头部表单后，再重新搜索一下
    },
    // 删除企业列表数据
    deleteData(id) {
      this.$confirm("您确定要删除这条数据吗?", "删除数据", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 点击确定按钮 执行的代码
          deleteBusinessData({ id: id }).then(() => {
            this.$message.success("删除成功！");
            this.search(); // 重新获取数据(刷新页面)
          });
        })
        .catch();
    },
    // 新增按钮点击事件
    addSubiness() {
      this.mode = "add";
      this.$refs.addSubiness.form = {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 企业简称
        intro: "", // 企业简介
        remark: "" // 企业备注
      };
      this.$refs.addSubiness.dialogFormVisible = true;
    },
    // 设置编辑按钮的点击事件
    editData(info) {
      this.mode = "edit"; // 点击编辑按钮，将mode标识改为edit
      this.$refs.addSubiness.form = JSON.parse(JSON.stringify(info)); //将该行的数据赋值给编辑界面
      this.$refs.addSubiness.dialogFormVisible = true;
    }
  },

  //---------------------------created----------------------------
  created() {
    this.getListData();
  }
};
</script>

<style lang="less">
.business {
  .businessHeader {
    margin-bottom: 19px;
    .form {
      .el-input__inner {
        width: 125px;
        height: 40px;
      }
    }
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
  .btnStyle {
    width: 30px;
    height: 14px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(70, 160, 255, 1);
    cursor: pointer;
  }
  .forbidden {
    margin: 0 9px;
  }
  .red {
    color: #f00;
  }
}
</style>
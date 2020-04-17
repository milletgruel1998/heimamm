<template>
  <div class="userList">
    <el-card class="userListHeader">
      <!-- 用户列表头部表单 -->
      <el-form :model="form" ref="form" class="form" :inline="true" label-width="70px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <template>
            <el-select placeholder="请选择状态" v-model="form.role_id">
              <el-option
                v-for="(value,key,index) in $store.state.roleObj"
                :key="index"
                :value="key"
                :label="value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clearData">清除</el-button>
          <el-button type="primary" @click="addUser">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户列表数据 -->
    <el-card>
      <el-table :data="tableData" :border="true" style="width: 100%">
        <el-table-column label="序号" width="70">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageCapacity+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="135"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="role" label="角色" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="135"></el-table-column>
        <el-table-column label="状态" width="90">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="276">
          <template slot-scope="scope">
            <el-button @click="editUserData(scope.row)">编辑</el-button>
            <el-button @click="changeStatus(scope.row.id)">{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button @click="deleteUser(scope.row.id)">删除</el-button>
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
          :page-size="pagination.pageCapacity"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 子组件 -->
    <addUserList ref="addUserList" :mode="mode" @refresh="search" />
  </div>
</template>

<script>
import {
  getUserList,
  changeUserStatus,
  deleteUserData
} from "@/api/userList.js";
import addUserList from "@/view/home/userList/components/addUserList.vue";
export default {
  components: {
    addUserList
  },
  data() {
    return {
      mode: "add", // 标识符
      form: {
        username: "", // 用户名称
        email: "", // 用户邮箱
        role_id: "" // 角色
      },
      pagination: {
        currentPage: 1, // 当前页
        pageCapacity: 3, // 页容量
        total: 40
      },
      tableData: [] // 用户列表数据
    };
  },
  //--------------------------------------methods-------------------------------
  methods: {
    handleSizeChange(val) {
      this.pagination.pageCapacity = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getUserData();
    },
    getUserData() {
      // 获取当前页的用户列表数据
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageCapacity,
        ...this.form
      };
      getUserList(_params).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    search() {
      this.pagination.currentPage = 1; // 搜索结束后回到第一页
      this.getUserData();
    },
    // 清除按钮点击事件
    clearData() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 修改用户状态
    changeStatus(id) {
      changeUserStatus({ id: id }).then(() => {
        this.getUserData();
        this.$message.success("修改状态成功！");
      });
    },
    // 删除用户
    deleteUser(id) {
      deleteUserData({ id: id }).then(() => {
        this.$confirm("您确定要删除这条数据吗？", "删除确认", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message.success("删除成功！");
          this.search();
        });
      });
    },
    // 新增用户
    addUser() {
      this.mode = "add";
      this.$refs.addUserList.form = {
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 手机号
        role_id: "", // 角色
        status: "", // 状态
        remark: "" // 备注
      };
      this.$refs.addUserList.dialogFormVisible = true;
    },
    // 编辑用户信息
    editUserData(info) {
      console.log(info);
      this.mode = "edit"; // 改变标识符
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(info));
      this.$refs.addUserList.dialogFormVisible = true;
    }
  },
  //--------------------------------------created-------------------------------
  created() {
    this.getUserData();
  }
};
</script>

<style lang="less">
.userList {
  .userListHeader {
    margin-bottom: 19px;
    .el-input__inner {
      width: 125px;
      height: 40px;
    }
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
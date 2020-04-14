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
          <el-button>清除</el-button>
          <el-button type="primary">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 企业信息 -->
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="70">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号" width="120"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="150"></el-table-column>
        <el-table-column prop="username" label="创建者" width="130"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="159"></el-table-column>
        <el-table-column prop="status" label="状态" width="130">
          <template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <span class="btnStyle">编辑</span>
            <span
              @click="setStatus(scope.row.id)"
              class="btnStyle forbidden"
            >{{scope.row.status==1?"禁用":"启用"}}</span>
            <span class="btnStyle">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页插件 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pagination.pageItemCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.totalPage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getBusinessData, setBusinessStatus } from "@/api/business.js";
export default {
  data() {
    return {
      form: {
        eid: "", // 企业编号
        name: "", // 企业名称
        username: "", // 创建者
        status: "" // 状态
      },
      pagination: {
        currentPage: 1, // 当前页
        pageItemCount: 10, // 页容量
        totalPage: 40 // 总数据量
      },
      tableData: [] // 企业信息
    };
  },
  //---------------------------metnods----------------------------
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
      });
    },
    // 修改企业状态
    setStatus(id) {
      setBusinessStatus({ id: id }).then(res => {
        console.log(res);
        this.$message.success("修改状态成功！");
      });
    },
    // 给搜索按钮添加点击事件
    search() {
      this.getListData();
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
}
</style>
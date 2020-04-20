<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li class="item">
          <div class="itemContent color1">{{chartData.increment_users}}</div>
          <p>今日新增用户</p>
        </li>
        <li class="item">
          <div class="itemContent color1">{{chartData.total_users}}</div>
          <p>用户总量</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{chartData.increment_questions}}</div>
          <p>新增试题</p>
        </li>
        <li class="item">
          <div class="itemContent color2">{{chartData.total_questions}}</div>
          <p>总试题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{chartData.total_done_questions}}</div>
          <p>总刷题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">{{chartData.personal_questions}}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div class="echarts_mod" ref="echarts_mod"></div>
    </el-card>
  </div>
</template>

<script>
import { getchartData, getQuestionData } from "@/api/chart.js";
import echarts from "echarts";
export default {
  data() {
    return {
      chartData: "" // 头部图表数据
    };
  },
  methods: {},
  created() {
    getchartData().then(res => {
      this.chartData = res.data;
    });
  },
  mounted() {
    var myChart = echarts.init(this.$refs.echarts_mod);
    getQuestionData().then(res => {
      let dataName = res.data.map(item => {
        return item.name;
      });
      // console.log(res);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 50,
          data: dataName
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart {
  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .item {
      p {
        color: #737373;
        margin-top: 10px;
      }
      .itemContent {
        width: 99px;
        height: 99px;
        line-height: 99px;
        border-radius: 50%;
      }
      .color1 {
        border: 3px solid #0086fa;
        color: #0086fa;
      }
      .color2 {
        border: 3px solid #f76137;
        color: #f76137;
      }
      .color3 {
        border: 3px solid #55cd78;
        color: #55cd78;
      }
    }
  }
  .echarts_mod {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
  }
}
</style>
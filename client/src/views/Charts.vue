<template>
  <div id="Charts">
    <div class="container" id="main" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Charts",
  data() {
    return {
      total: [],
      namedata: [],
      valuedata: [],
    };
  },
  created() {
    this.getdata();
  },
  mounted() {
    //this.drawCharts();
  },
  methods: {
    getdata() {
      //获取数据
      this.$axios
        .get("/api/design/designchartdata")
        .then((res) => {
          for (let i of res.data) {
            this.namedata.push(i.name);
            this.valuedata.push(i.value);
          }
          //后端已将对应数据名称替换成Echarts对应名称
          //同步获取数据会有错误，需要转换数据进行数据读取
          var thisdata = JSON.stringify(res.data);
          this.total = JSON.parse(thisdata);
          this.drawCharts();
        })
        .catch((err) => console.log(err));
    },
    drawCharts() {
      var theChart = echarts.init(document.getElementById("main"));
      window.onresize = function () {
        theChart.resize();
      };
      var option = {
        tooltip: {},
        title: {
          text: "项目预算",
          left: "center",
          top: 10,
        },
        xAxis: {
          type: "category",
          data: this.namedata,
          axisLable: {
            interval: 0,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
        },
        grid: [
          {
            right: "45%",
          },
        ],
        series: [
          {
            type: "pie",
            radius: [0, "50%"],
            center: ["80%", "50%"],
            data: this.total,
          },
          {
            type: "bar",
            data: this.valuedata,
          },
        ],
      };
      theChart.setOption(option);
    },
  },
  components: {},
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  padding: 5px 15px 15px 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.budget-container {
  width: 100%;
  height: auto;
  padding: 5px 15px 15px 15px;
  margin-top: 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.btnright {
  float: right;
}
</style>

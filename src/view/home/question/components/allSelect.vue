<template>
  <div class="allSelect">
    <!-- 单选 -->
    <div v-if="form.type==1">
      <div class="item" v-for="(item,index) in form.select_options" :key="index">
        <el-radio
          class="selectRadio"
          @change="changeItem"
          v-model="form.single_select_answer"
          :label="item.label"
        ></el-radio>
        <el-input v-model="item.text" class="inputStyle"></el-input>
        <div>
          <uploadFile v-model="item.image" />
        </div>
      </div>
    </div>
    <!-- 多选 -->
    <div v-else-if="form.type==2">
      <div class="item" v-for="(item,index) in form.select_options" :key="index">
        <el-checkbox
          class="selectRadio"
          v-model="form.multiple_select_answer"
          @change="changeItem"
          :label="item.label"
        ></el-checkbox>
        <el-input v-model="item.text" class="inputStyle"></el-input>
        <div>
          <uploadFile v-model="item.image" />
        </div>
      </div>
    </div>
    <!-- 简答 -->
    <div v-else>
      <el-input type="textarea" rows="5" @change="changeItem" v-model="form.short_answer"></el-input>
    </div>
  </div>
</template>

<script>
import uploadFile from "./uploadFile.vue";
export default {
  props: ["form"],
  components: {
    uploadFile
  },
  data() {
    return {};
  },
  methods: {
    changeItem() {
      this.$emit("change");
    }
  }
};
</script>

<style lang="less">
.allSelect {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
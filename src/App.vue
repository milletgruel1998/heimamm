<template>
  <div class="app">
    <!-- 子组件在主组件中显示的位置 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
/* 使用@添加css外部样式，需要在前面加上 `~` 符号 */
@import url(~@/style/base.css);
</style>
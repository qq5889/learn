<template>
  <div>
    <h3>{{ appName }}</h3>
    <div>我的名字是{{ name }}，今年{{ age }}岁</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    /**
     * 姓名
     */
    name: String,

    /**
     * 年龄
     */
    age: Number
  },
  data: () => {
    return { appName: "用户信息" };
  }
});
</script>

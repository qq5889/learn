<template>
  <div>
    <div>{{ text }}</div>
    <div>{{ htmlText }}</div>
    <div v-html="htmlText" />
    <div v-bind:style="attribute">
      我的样式是绑定的
    </div>
    <button v-on:click="btnChangeClickHandler">修改text</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return {
      text: "普通文本",
      htmlText: "<span style='color:red'>富文本</span>",
      attribute: "font-weight:bold; color:green;"
    };
  },
  methods: {
    clickHandler: function() {
      alert(`click this.text=${this.text}`);
    },
    btnChangeClickHandler: function() {
      this.text = "普通文本" + Math.random();
    }
  }
});
</script>

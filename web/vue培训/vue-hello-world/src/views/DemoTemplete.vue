<template>
  <div>
    <ul>
      <li v-for="item in userList" v-bind:key="item.name">
        <span
          v-if="item.name !== ''"
          v-show="!item.hide"
          v-bind:style="{ color: item.name === 'a' ? 'red' : '' }"
        >
          {{ item.name }}
        </span>
        <span v-else>无名氏</span>
      </li>
    </ul>
    <hr />
    <h3>可能有人要问，不渲染hide=true的怎么做？</h3>
    <h2>答案是: 计算属性</h2>
    <ul>
      <li v-for="item in validUserList" v-bind:key="item.name">
        <span v-if="item.name !== ''" v-show="!item.hide">
          {{ item.name }}
        </span>
        <span v-else>无名氏</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return {
      userList: [
        {
          name: "a"
        },
        {
          name: ""
        },
        {
          name: "c",
          hide: true
        },
        {
          name: "d"
        },
        {
          name: "e"
        }
      ]
    };
  },
  computed: {
    validUserList: function(): any[] {
      return this.userList.filter((item: any) => !item.hide);
    }
  }
});
</script>

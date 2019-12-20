<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-bind:class="$style.FormItem">
      <input v-model="account" />
      <label v-bind:class="{ [$style.hasValue]: account }">用户名：</label>
    </div>
    <div v-bind:class="$style.FormItem">
      <input v-model="password" />
      <label v-bind:class="{ [$style.hasValue]: password }">密码：</label>
    </div>
    <button v-on:click="login">登录</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return {
      title: "登录",
      account: "",
      password: ""
    };
  },
  methods: {
    login: function(): void {
      const error: string = this.checkInput();
      if (!error) {
        alert("登录成功");
      } else {
        alert(error);
      }
    },
    checkInput: function(): string {
      if (!this.account) {
        return "please input account";
      } else if (!this.password) {
        return "please input password";
      }
      return "";
    }
  }
});
</script>

<style lang="less" module src="./DemoStyle.less" />

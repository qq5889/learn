<template>
  <div>
    <DemoCom name="aa" :age="6"></DemoCom>
    <DemoCom name="bbbb" :age="7"></DemoCom>
    <DemoCom name="ccc" :age="8" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DemoCom from "./DemoCom.vue";
export default Vue.extend({
  components: {
    DemoCom
  }
});
</script>

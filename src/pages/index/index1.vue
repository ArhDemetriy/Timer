<template lang='pug'>
.main(id='app')
  Timer(v-for="timer in timers", :key="timer.id", :timer="timer")
  Adder(@click='addTimer')
</template>

<script>
import Timer from "../../components/timer/timer.vue";
import Adder from "../../components/adder/adder.vue";

let nextTimerId = 1;

export default {
  components: {
    Timer,
    Adder,
  },
  data() {
    return {
      timers: [],
    };
  },
  methods: {
    addTimer() {
      this.timers.push({
        id: nextTodoId++,
      });
    },
    removeTimer(idToRemove) {},
  },
};
</script>

<style lang="scss"></style>
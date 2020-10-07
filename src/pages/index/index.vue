<template lang='pug'>
.main
  Timer(v-for="id in timers", :key="id.id", :id="id")
  Adder(@click.native='addTimer')

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
      timers: [
      ],
    };
  },
  methods: {
    addTimer() {
      this.timers.push({
        id: nextTimerId++,
      });
    },
    removeTimer(idToRemove) {
    },
  },
};
</script>

<style lang="scss"></style>
<template lang='pug'>
label.timer
  input.timer__input(type='text', readonly, value ='00')
  hr.timer__line
  .timer__buttons_container
    button.timer__button-play_pause(type='button', class='timer__button material-icons')=''
    button.timer__button-stop(type='reset', class='timer__button material-icons')='stop'
</template>

<script>
import { Timer, ArrayOfDestructible, iDestructible } from './timer__class';
export default {
  props: {
    id: {
      type: Object,
      required: true
    }
  },
  data(){
    return {timer: undefined}
  },
  mounted: function () {
    this.$nextTick(function () {
      this.timer = new Timer(this.$el)
    })
  },
  beforeDestroy: function () {
    console.log(this.timer);
    this.timer.destroy()
  }
}
</script>

<style lang="scss" src='./timer.scss'></style>
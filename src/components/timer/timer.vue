<template lang='pug'>
lable.timer()
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
    timer: {
      type: Object,
      required: true
    }
  },
  data:{
    myTimer: undefined,
  },
  mounted: function () {
    this.$nextTick(function () {
      $data.myTimer = new Timer($this.$el)
      console.log($data.myTimer);
    })
  },
}
</script>

<style lang="scss" src='./timer.scss'></style>
// ASSET: C:\Development\Projects\Timer\src\components\timer\timer__class.ts
function $eb1bb9566f3f431d28f6bbc25948e$var$_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class $eb1bb9566f3f431d28f6bbc25948e$export$default {
  constructor(element) {
    $eb1bb9566f3f431d28f6bbc25948e$var$_defineProperty(this, "SEC", 1000);
    $eb1bb9566f3f431d28f6bbc25948e$var$_defineProperty(this, "MIN", 60 * this.SEC);
    $eb1bb9566f3f431d28f6bbc25948e$var$_defineProperty(this, "HOU", 60 * this.MIN);
    $eb1bb9566f3f431d28f6bbc25948e$var$_defineProperty(this, "bindedPlayPauseToggle", this.playPauseToggle.bind(this));
    $eb1bb9566f3f431d28f6bbc25948e$var$_defineProperty(this, "bindedStop", this.stop.bind(this));
    let temp = element.querySelector('.timer__button-play_pause');
    if (!temp) throw new ReferenceError("not elem \".timer__button-play_pause\" in tag: ".concat(element.tagName, " class: ").concat(element.classList.toString));
    this.buttonPlayPauseToggle = temp;
    temp = element.querySelector('.timer__button-stop');
    if (!temp) throw new ReferenceError("not elem \".timer__button-stop\" in tag: ".concat(element.tagName, " class: ").concat(element.classList.toString));
    this.buttonStop = temp;
    temp = element.querySelector('.timer__input');
    if (!temp) throw new ReferenceError("not elem \".timer__input\" in tag: ".concat(element.tagName, " class: ").concat(element.classList.toString));
    this.outputElement = temp;
    this.selfElement = element;
    this.countedTime = new Date(0);
    this.lastStartTime = new Date();
    this.isActive = false;
    this.idInterval = null;
    this.buttonPlayPauseToggle.addEventListener('click', this.bindedPlayPauseToggle);
    this.buttonStop.addEventListener('click', this.bindedStop);
  }

  play() {
    if (!isNaN(this.idInterval)) clearInterval(this.idInterval);
    this.lastStartTime.setTime(Date.now());
    this.isActive = true;
    this.idInterval = setInterval(this.tick.bind(this), 1000);
    setTimeout((() => this.selfElement.classList.add('timer-active')).bind(this), 0);
  }

  pause() {
    this.isActive = false;
    this.countedTime.setTime(Date.now() - this.lastStartTime.getTime() + this.countedTime.getTime());
    if (!isNaN(this.idInterval)) clearInterval(this.idInterval);
    setTimeout((() => this.selfElement.classList.remove('timer-active')).bind(this), 0);
  }

  tick() {
    let lengthTime = Date.now();
    if (!this.isActive) return;
    setTimeout((() => {
      lengthTime += this.countedTime.getTime() - this.lastStartTime.getTime();
      let temp = Math.trunc(lengthTime % this.MIN / this.SEC);
      let lengthTimeStr = temp.toString().padStart(2, '0');

      if (lengthTime / this.MIN >= 1) {
        lengthTime -= temp;
        temp = Math.trunc(lengthTime % this.HOU / this.MIN);
        lengthTimeStr = temp.toString().padStart(2, '0') + ':' + lengthTimeStr;

        if (lengthTime / this.HOU >= 1) {
          lengthTime -= temp;
          temp = Math.trunc(lengthTime / this.HOU);
          lengthTimeStr = temp.toString().padStart(2, '0') + ':' + lengthTimeStr;
        }
      }

      setTimeout(this.render.bind(this), 0, lengthTimeStr);
    }).bind(this), 0);
  }

  render(time = '00') {
    if ('value' in this.outputElement) this.outputElement.value = time;else this.outputElement.textContent = time;
  }

  playPauseToggle() {
    if (this.isActive) this.pause();else this.play();
  }

  stop() {
    this.isActive = false;
    if (!isNaN(this.idInterval)) clearInterval(this.idInterval);
    this.countedTime.setTime(0);
    setTimeout((() => this.selfElement.classList.remove('timer-active')).bind(this), 0);
    setTimeout(this.render.bind(this), 0, '00');
  }

  destruct() {
    this.stop();
    this.buttonPlayPauseToggle.removeEventListener('click', this.bindedPlayPauseToggle);
    this.buttonStop.removeEventListener('click', this.bindedStop);
  }

}

const $e5791784bcec78b3262f83ee0a8a600$var$arrayOfDestructible = [function () {
  for (let i = 1; i < this.length; this[i++].destruct()) {}
}];
document.q = $e5791784bcec78b3262f83ee0a8a600$var$arrayOfDestructible;
document.querySelectorAll('.timer').forEach(q => $e5791784bcec78b3262f83ee0a8a600$var$arrayOfDestructible.push(q.myTimer = new $eb1bb9566f3f431d28f6bbc25948e$export$default(q)));
//# sourceMappingURL=timer.20a51de0.js.map

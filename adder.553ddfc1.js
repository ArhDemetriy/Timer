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

class $eb1bb9566f3f431d28f6bbc25948e$export$Timer {
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

function $c5112f890ef20864f5c155ece5$var$_defineProperty(obj, key, value) {
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

class $c5112f890ef20864f5c155ece5$var$AdderTimer {
  constructor(element) {
    $c5112f890ef20864f5c155ece5$var$_defineProperty(this, "bindedAddNewTimer", this.addNewTimer.bind(this));
    this.template = document.getElementById('timerTemplate');
    if (!this.template || !('content' in this.template)) throw new ReferenceError('id timerTemplate is not template');
    this.selfElement = element;
    if (!this.selfElement.parentNode) throw new ReferenceError("element.parentNode is undiferent. element is tag: ".concat(element.tagName, " class: ").concat(element.classList.toString));
    this.selfElement.addEventListener('click', this.bindedAddNewTimer, {
      passive: true
    });
  }

  addNewTimer() {
    this.selfElement.parentNode.insertBefore(document.importNode(this.template.content, true), this.selfElement);
    const newTimer = this.selfElement.previousElementSibling;
    if (!newTimer) throw new ReferenceError("\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0442\u0430\u0439\u043C\u0435\u0440, \u0442.\u043A. \u043E\u043D \u043E\u0442\u0441\u0443\u0442\u0441\u0432\u0443\u0435\u0442 \u043F\u0435\u0440\u0435\u0434 tag: ".concat(this.selfElement.tagName, " class: ").concat(this.selfElement.classList.toString));
    newTimer.myTimer = new $eb1bb9566f3f431d28f6bbc25948e$export$Timer(newTimer);
  }

  destruct() {
    this.selfElement.removeEventListener('click', this.bindedAddNewTimer);
  }

}

document.querySelectorAll('.adder').forEach(q => q.addTimer = new $c5112f890ef20864f5c155ece5$var$AdderTimer(q));
//# sourceMappingURL=adder.553ddfc1.js.map

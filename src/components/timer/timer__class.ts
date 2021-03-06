export { iDestructible, iTimer, iTimerToggleble, iTimerPauseble, ArrayOfDestructible }

interface iDestructible {
  destroy: () => void;
}
interface iTimer {
  play(): void;
  stop(): void;
}
interface iTimerToggleble extends iTimer {
  playPauseToggle(): void;
}
interface iTimerPauseble extends iTimer {
  pause(): void;
}
type ArrayOfDestructible = [() => void, ...Array<iDestructible>];

export class Timer implements iDestructible, iTimer, iTimerToggleble, iTimerPauseble{
  protected readonly SEC = 1000;
  protected readonly MIN = 60 * this.SEC;
  protected readonly HOU = 60 * this.MIN;

  protected countedTime: Date;
  protected lastStartTime: Date;
  protected isActive: boolean;
  protected idInterval: number | null;
  protected readonly selfElement: Element;

  private readonly buttonPlayPauseToggle: Element;
  private readonly buttonStop: Element;
  private readonly outputElement: Element | HTMLInputElement;
  private readonly bindedPlayPauseToggle = this.playPauseToggle.bind(this);
  private readonly bindedStop = this.stop.bind(this);
  constructor(element: Element) {
    let temp = element.querySelector('.timer__button-play_pause');
    if (!temp) throw new ReferenceError(
      `not elem ".timer__button-play_pause" in tag: ${element.tagName} class: ${element.classList.toString}`);
    this.buttonPlayPauseToggle = temp;

    temp = element.querySelector('.timer__button-stop');
    if (!temp) throw new ReferenceError(
      `not elem ".timer__button-stop" in tag: ${element.tagName} class: ${element.classList.toString}`);
    this.buttonStop = temp;

    temp = element.querySelector('.timer__input');
    if (!temp) throw new ReferenceError(
      `not elem ".timer__input" in tag: ${element.tagName} class: ${element.classList.toString}`);
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
    if (!isNaN(this.idInterval!))
      clearInterval(this.idInterval!);
    this.lastStartTime.setTime(Date.now());
    this.isActive = true;
    this.idInterval = setInterval(this.tick.bind(this), 1000);
    setTimeout((() => this.selfElement.classList.add('timer-active')).bind(this), 0);
  }
  pause() {
    this.isActive = false;
    this.countedTime.setTime(Date.now() - this.lastStartTime.getTime() + this.countedTime.getTime());
    if (!isNaN(this.idInterval!))
      clearInterval(this.idInterval!);
    setTimeout((() => this.selfElement.classList.remove('timer-active')).bind(this), 0);
  }
  private tick() {
    let lengthTime = Date.now();
    if (!this.isActive) return;

    setTimeout((() => {
      lengthTime += this.countedTime.getTime() - this.lastStartTime.getTime();
      let temp = Math.trunc((lengthTime % this.MIN) / this.SEC);
      let lengthTimeStr = temp.toString().padStart(2, '0');
      if (lengthTime / this.MIN >= 1) {
        lengthTime -= temp;
        temp = Math.trunc((lengthTime % this.HOU) / this.MIN);
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
  private render(time: string = '00') {
    if ('value' in this.outputElement)
      this.outputElement.value = time
    else
      this.outputElement.textContent = time;
  }
  playPauseToggle() {
    if (this.isActive)
      this.pause()
    else
      this.play();
  }
  stop() {
    this.isActive = false;
    if (!isNaN(this.idInterval!))
      clearInterval(this.idInterval!);
    this.countedTime.setTime(0);
    setTimeout((() => this.selfElement.classList.remove('timer-active')).bind(this), 0);
    setTimeout(this.render.bind(this), 0, '00');
  }
  destroy() {
    this.stop();
    this.buttonPlayPauseToggle.removeEventListener('click', this.bindedPlayPauseToggle);
    this.buttonStop.removeEventListener('click', this.bindedStop);
  }
}
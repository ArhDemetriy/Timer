interface iDestructible {
  destruct: () => void;
}
type arrayDestructible = [() => void, ...Array<iDestructible>];

class Timer implements iDestructible{
  protected readonly SEC = 1000;
  protected readonly MIN = 60 * this.SEC;
  protected readonly HOU = 60 * this.MIN;

  protected countedTime: Date;
  protected lastStartTime : Date;
  protected isActive : boolean;
  protected idInterval: number | null;
  protected readonly selfElement: Element;

  private readonly buttonPlayPauseToggle: Element;
  private readonly buttonStop: Element;
  constructor(element: Element) {
    if (!element.querySelector('.timer__input')) throw new ReferenceError(
      `not elem ".timer__input" in tag: ${element.tagName} class: ${element.classList.toString}`);

    let temp = element.querySelector('.timer__button-play_pause');
    if (!temp) throw new ReferenceError(
      `not elem ".timer__button-play_pause" in tag: ${element.tagName} class: ${element.classList.toString}`);
    this.buttonPlayPauseToggle = temp;

    temp = element.querySelector('.timer__button-stop');
    if (!temp) throw new ReferenceError(
      `not elem ".timer__button-stop" in tag: ${element.tagName} class: ${element.classList.toString}`);
    this.buttonStop = temp;
    this.selfElement = element;
    this.countedTime = new Date(0);
    this.lastStartTime = new Date();
    this.isActive = false;
    this.idInterval = null;

    this.buttonPlayPauseToggle.addEventListener('click', this.playPauseToggle);
    this.buttonStop.addEventListener('click', this.stop);
  }
  protected play() {
    if (!isNaN(this.idInterval!))
      clearInterval(this.idInterval!);
    this.lastStartTime.setTime(this.countedTime.getTime() + Date.now());
    this.isActive = true;
    this.idInterval = setInterval(this.tick.bind(this), 1000);
  }
  protected pause() {
    this.isActive = false;
    this.countedTime.setTime(Date.now() - this.lastStartTime.getTime() + this.countedTime.getTime());
    if (!isNaN(this.idInterval!))
      clearInterval(this.idInterval!);
  }
  private tick() {
    let lengthTime = Date.now();

    if (!this.isActive) return;
    const element = this.selfElement.querySelector('.timer__input');
    if (!element) return;

    lengthTime -= this.lastStartTime.getTime();

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

    if (element.hasOwnProperty('value'))
      (element as HTMLInputElement).value = lengthTimeStr
    else
      element.textContent = lengthTimeStr;
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
  }
  destruct() {
    this.stop();
    this.buttonPlayPauseToggle.removeEventListener('click', this.playPauseToggle);
    this.buttonStop.removeEventListener('click', this.stop);
  }
}

const elements = document.querySelectorAll('.timer');
elements.forEach((_, i, a) => {
  (a[i] as any).myTimer = new Timer(a[i]);
});
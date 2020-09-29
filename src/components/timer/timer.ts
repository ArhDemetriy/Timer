interface iDestructible {
  destruct: () => void;
}
type arrayDestructible = [() => void, ...Array<iDestructible>];

class Timer implements iDestructible{
  protected SEC = 1000;
  protected MIN = 60 * this.SEC;
  protected HOU = 60 * this.MIN;

  protected countTime: Date;
  protected lastStartTime : Date;
  protected isActive : boolean;
  protected idInterval: number | null;
  protected selfElement: Element;
  constructor(element: Element) {
    this.selfElement = element;
    this.countTime = new Date(0);
    this.lastStartTime = new Date();
    this.isActive = false;
    this.idInterval = null;
  }
  play() {
    if (!this.idInterval)
      clearInterval(this.idInterval);
    this.lastStartTime.setTime(this.countTime.getTime() + Date.now());
    this.isActive = true;
    this.idInterval = setInterval(this.tick.bind(this), 1000);
  }
  pause() {
    this.isActive = false;
    this.countTime.setTime(Date.now() - this.lastStartTime.getTime() + this.countTime.getTime());
    clearInterval(this.idInterval);
  }
  private tick() {
    if (!this.isActive) return;

    let lengthTime = Date.now() - this.lastStartTime.getTime();

    let temp = Math.trunc((lengthTime % this.MIN) / this.SEC);
    // let lengthTimeStr = temp.toString().padStart(2, '0');
    // if (lengthTime / this.MIN >= 1) {
    //   lengthTime -= temp;
    //   temp = Math.trunc((lengthTime % this.HOU) / this.MIN);
    //   lengthTimeStr = temp.toString().padStart(2, '0') + ':' + lengthTimeStr;
    //   if (lengthTime / this.HOU >= 1) {
    //     lengthTime -= temp;
    //     temp = Math.trunc(lengthTime / this.HOU);
    //     lengthTimeStr = temp.toString().padStart(2, '0') + ':' + lengthTimeStr;
    //   }
    // }
    // element.querySelector('.timer__input').value = lengthTimeStr;

  }
  destruct() {
    this.selfElement.removeEventListener('click', clickOnButton);
  }
}

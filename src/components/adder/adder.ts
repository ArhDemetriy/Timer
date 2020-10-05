import { Timer, ArrayOfDestructible, iDestructible } from '../timer/timer__class';

class AdderTimer implements iDestructible{
  protected readonly selfElement: Element;
  protected readonly template: HTMLTemplateElement;
  private readonly bindedAddNewTimer = this.addNewTimer.bind(this);
  constructor(element: Element) {
    this.template = document.getElementById('timerTemplate') as HTMLTemplateElement;
    if (!this.template || !('content' in this.template)) throw new ReferenceError('id timerTemplate is not template');
    this.selfElement = element;
    if (!this.selfElement.parentNode) throw new ReferenceError(`element.parentNode is undiferent. element is tag: ${element.tagName} class: ${element.classList.toString}`);
    this.selfElement.addEventListener('click', this.bindedAddNewTimer, {passive: true});
  }
  addNewTimer() {
    this.selfElement.parentNode!.insertBefore(document.importNode(this.template.content, true), this.selfElement);
    const newTimer = this.selfElement.previousElementSibling;
    if (!newTimer)
      throw new ReferenceError(`вероятно не получилось создать новый таймер, т.к. он отсутсвует перед tag: ${this.selfElement.tagName} class: ${this.selfElement.classList.toString}`);
    (newTimer as any).myTimer = new Timer(newTimer);
  }
  destruct() {
    this.selfElement.removeEventListener('click', this.bindedAddNewTimer);
  }
}
document.querySelectorAll('.adder').forEach(q => (q as any).addTimer = new AdderTimer(q));

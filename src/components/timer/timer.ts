import Timer from './timer__class';
import * as timerInterfaces from './timer__class';

const arrayOfDestructible: timerInterfaces.ArrayOfDestructible = [
  function () {
    for (let i = 1; i < this.length; this[i++].destruct()) { }
  },
];

(document as any).q = arrayOfDestructible;

document.querySelectorAll('.timer').forEach(q => arrayOfDestructible.push((q as any).myTimer = new Timer(q)));
import Timer from './timer__class';
import * as timerInterfaces from './timer__class';

const q: timerInterfaces.ArrayOfDestructible = [
  function () {
    for (let i = 1; i < this.length; this[i++].destroy()){}
  }
]
q[0]();

document.querySelectorAll('.timer').forEach(q => (q as any).myTimer = new Timer(q));
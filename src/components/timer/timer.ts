import { Timer, ArrayOfDestructible } from './timer__class';

const arrayOfDestructible: ArrayOfDestructible = [
  function qwe(this:any) {
    for (let i = 1; i < this.length; this[i++].destruct()) { }
  },
];

(document as any).arrayOfTimer = arrayOfDestructible;
(document as any).Timer = Timer;


// document.querySelectorAll('.timer').forEach(q => arrayOfDestructible.push((q as any).myTimer = new Timer(q)));
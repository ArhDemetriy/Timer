import { Timer, ArrayOfDestructible, iDestructible } from './timer__class';


const arrayOfDestructible: ArrayOfDestructible = [
  function qwe(this:iDestructible[]) {
    let q = this[0];
    for (let i = 1; i < this.length; this[i++].destroy()) { }
  },
];

// (document as any).arrayOfTimer = arrayOfDestructible;
// (document as any).Timer = Timer;


// document.querySelectorAll('.timer').forEach(q => arrayOfDestructible.push((q as any).myTimer = new Timer(q)));
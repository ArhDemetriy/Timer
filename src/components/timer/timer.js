const zeroTime = new Date();
function timer(element) {
  if (!element.isActive) return;

  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOU = 60 * MIN;

  let lengthTime = (new Date()).getTime() - element.startTime.getTime();

  let temp = Math.trunc((lengthTime % MIN) / SEC);
  let lengthTimeStr = temp.toString().padStart(2,'0');
  if (lengthTime / MIN >= 1) {
    lengthTime -= temp;
    temp = Math.trunc((lengthTime % HOU) / MIN);
    lengthTimeStr = temp.toString().padStart(2, '0') + ':' + lengthTimeStr;
    if (lengthTime / HOU >= 1) {
      lengthTime -= temp;
      temp = Math.trunc(lengthTime / HOU);
      lengthTimeStr = temp.toString().padStart(2, '0') + ':' + lengthTimeStr;
    }
  }
  element.querySelector('.timer__input').value = lengthTimeStr;
}

function clickOnButton(event) {
  if (event.target.matches('.timer__button-play_pause')) {
    if (event.currentTarget.isActive = !event.currentTarget.isActive) {
      event.currentTarget.classList.add('timer-active');
      event.currentTarget.startTime = new Date();
      event.currentTarget.intervalId = setInterval(timer, 1000, event.currentTarget);
    }
    else {
      event.currentTarget.classList.remove('timer-active');
      if (event.currentTarget.intervalId)
        clearInterval(event.currentTarget.intervalId);
    }
    timer(event.currentTarget);
    console.log('play_pause');
  } else if (event.target.matches('.timer__button-stop')) {
    event.currentTarget.classList.remove('timer-active');
    event.currentTarget.removeEvent();
    console.log('stop');
  }
}
function destroy() {
  this.removeEventListener('click', clickOnButton);
}

const elements = document.querySelectorAll('.timer');
elements.forEach((_, i, a) => {
  // click change
  a[i].addEventListener('click', clickOnButton, {
    passive: true,
  });
  a[i].startTime = new Date();
  a[i].isActive = false;
  a[i].intervalId = undefined;
  a[i].removeEvent = destroy;
});
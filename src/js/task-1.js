class CountdownTimer {
  idInterval = null;
  constructor({ selector, targetDate }) {
    this.refs = {
      refTimer: document.querySelector(this.selector),
      h2: document.querySelector('.h2'),
      days: document.querySelector('[data-value="days"]'),
      hours: document.querySelector('[data-value="hours"]'),
      mins: document.querySelector('[data-value="mins"]'),
      secs: document.querySelector('[data-value="secs"]'),
    };
    this.targetDate = targetDate;
    this.start();
  }

  start() {
    const startTime = this.targetDate;
    this.refs.h2.textContent = `to the ${this.targetDate.getDate()}.${
      this.targetDate.getMonth() + 1
    }.${this.targetDate.getFullYear()}`;
    this.idInterval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const { days, hours, mins, secs } = getTimesComponents(deltaTime);
      const sum = Number(days) + Number(hours) + Number(mins) + Number(secs);
      if (sum <= 0) {
        this.updateTimer();
        this.stop();
      } else {
        this.updateTimer(days, hours, mins, secs);
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.idInterval);
    this.idInterval = null;
  }
  updateTimer(days = 0, hours = 0, mins = 0, secs = 0) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
}
function getTimesComponents(time) {
  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
   * Оставшиеся часы: получаем остаток от 
  предыдущего расчета с помощью оператора
   * остатка % и делим его на количество миллисекунд в одном часе
   * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );

  /*
   * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
   * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
   * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
   * миллисекунд в одной секунде (1000)
   */

  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 28, 2021'),
});

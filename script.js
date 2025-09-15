function getEndOfSchoolYear(baseDate = new Date()) {
  const year = (baseDate.getMonth() > 5) ? baseDate.getFullYear() + 1 : baseDate.getFullYear();
  const d = new Date(year, 5, 30, 9, 0, 0, 0);
  const day = d.getDay();
  const diffToFriday = (day >= 5) ? day - 5 : day + 2;
  d.setDate(d.getDate() - diffToFriday);
  return d;
}

function diffWithMonths(from, to) {
  if (to <= from) return { months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  let months = 0;
  let cursor = new Date(from);
  cursor.setMilliseconds(0);
  while (true) {
    const probe = new Date(cursor);
    probe.setMonth(probe.getMonth() + 1);

    if (probe <= to) {
      months++;
      cursor = probe;
    } else break;
  }

  let remainingMs = to - cursor;
  const second = 1000, minute = 60 * second, hour = 60 * minute, day = 24 * hour, week = 7 * day;

  const weeks = Math.floor(remainingMs / week); remainingMs -= weeks * week;
  const days = Math.floor(remainingMs / day); remainingMs -= days * day;
  const hours = Math.floor(remainingMs / hour); remainingMs -= hours * hour;
  const minutes = Math.floor(remainingMs / minute); remainingMs -= minutes * minute;
  const seconds = Math.floor(remainingMs / second);

  return { months, weeks, days, hours, minutes, seconds };
}

const el = {
  months: document.getElementById("months"),
  weeks: document.getElementById("weeks"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  date: document.getElementById("date"),
  endDate: document.getElementById("end-date"),
};

const language = "pl-PL";
const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };

el.date.textContent = new Date().toLocaleDateString(language, options);
el.endDate.textContent = getEndOfSchoolYear().toLocaleDateString(language, options);

const interval = setInterval(() => {
  const NOW = new Date();
  const result = diffWithMonths(NOW, getEndOfSchoolYear(NOW));
  el.months.textContent = result.months;
  el.weeks.textContent = result.weeks;
  el.days.textContent = result.days;
  el.hours.textContent = result.hours;
  el.minutes.textContent = result.minutes;
  el.seconds.textContent = result.seconds;
}, 1000);

window.addEventListener('beforeunload', () => {
  clearInterval(interval);
});

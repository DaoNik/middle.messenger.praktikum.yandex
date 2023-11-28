export function isEqualDate(firstDate: Date, secondDate: Date): boolean {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export function isFirstDateMoreThenSecondDate(
  firstDate: Date,
  secondDate: Date
): boolean {
  if (isEqualDate(firstDate, secondDate)) return false;

  if (firstDate.getFullYear() > secondDate.getFullYear()) return true;

  if (firstDate.getMonth() > secondDate.getMonth()) return true;

  return firstDate.getDate() > secondDate.getDate();
}

export function isFirstDateLessThenSecondDate(
  firstDate: Date,
  secondDate: Date
): boolean {
  return (
    !isEqualDate(firstDate, secondDate) &&
    !isFirstDateMoreThenSecondDate(firstDate, secondDate)
  );
}

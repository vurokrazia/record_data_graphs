const now = new Date();
function AddZero(num) {
  return num >= 0 && num < 10 ? "0" + num : num + "";
}
export function getDateTimeNow() {
  return [
    [
      now.getFullYear(),
      AddZero(now.getMonth() + 1),
      AddZero(now.getDate())
    ].join("-")
  ].join(" ");
}
export function getTimeNow() {
  return [[AddZero(now.getHours()), AddZero(now.getMinutes())].join(":")].join(
    " "
  );
}
export function getTimeFormatNow() {
  return now.getHours() >= 12 ? "PM" : "AM";
}

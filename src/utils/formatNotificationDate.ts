function formatNotificationDate(originalNotificationCreateDate: string) {
  const dateStr = originalNotificationCreateDate;
  const currentTime = new Date();

  const currentDate = {
    year: currentTime.getFullYear(),
    month: currentTime.getMonth() + 1,
    day: currentTime.getDate(),
    hour: currentTime.getHours(),
    minute: currentTime.getMinutes(),
    second: currentTime.getSeconds(),
  };

  const [datePart, timePart] = dateStr.split('T');
  const [notificationYear, notificationMonth, notificationDay] = datePart
    .split('-')
    .map(Number);

  const [notificationHour, notificationMinute, notificationSecond] =
    timePart.split(':');
  const second = parseInt(notificationSecond, 10);

  const notificationCreateDate = {
    year: notificationYear,
    month: notificationMonth,
    day: notificationDay,
    hour: +notificationHour,
    minute: +notificationMinute,
    second,
  };

  let notificationDate = '';

  if (
    currentDate.year !== notificationCreateDate.year ||
    currentDate.month !== notificationCreateDate.month ||
    currentDate.day !== notificationCreateDate.day
  ) {
    if (
      currentDate.year === notificationCreateDate.year &&
      currentDate.month === notificationCreateDate.month
    ) {
      const daysDiff = currentDate.day - notificationCreateDate.day;
      notificationDate = `${daysDiff}일 전`;
    } else {
      notificationDate = `${notificationCreateDate.year}년 ${notificationCreateDate.month}월 ${notificationCreateDate.day}일`;
    }
  } else if (currentDate.hour !== notificationCreateDate.hour) {
    const hoursDiff = currentDate.hour - notificationCreateDate.hour;
    notificationDate = `${hoursDiff}시간 전`;
  } else {
    const minutesDiff = currentDate.minute - notificationCreateDate.minute;
    notificationDate = `${minutesDiff}분 전`;
  }

  return notificationDate;
}

export default formatNotificationDate;

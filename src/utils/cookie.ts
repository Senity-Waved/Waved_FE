const getCookieValue = (cookieName: string) => {
  let decodedCookie;
  if (typeof document !== 'undefined') {
    decodedCookie = decodeURIComponent(document.cookie);

    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i + 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length).substring(1);
      }
    }
  }
  return '';
};

export default getCookieValue;

export const setToken = (token: string, expiryInMinutes = 1440) => {
  const now = new Date();
  const expiryTime = now.getTime() + expiryInMinutes * 60 * 1000;
  const tokenObject = {
    token: token,
    expiry: expiryTime,
  };
  sessionStorage.setItem("access_token", JSON.stringify(tokenObject));
};

export const getToken = (): string | null => {
  const tokenString = sessionStorage.getItem("access_token");
  if (!tokenString) return null;

  const tokenObject = JSON.parse(tokenString);
  const now = new Date();

  if (now.getTime() > tokenObject.expiry) {
    sessionStorage.removeItem("access_token");
    return null;
  }

  return tokenObject.token;
};

export const removeToken = () => {
  sessionStorage.removeItem("access_token");
};

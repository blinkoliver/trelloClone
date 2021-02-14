export const loginPath = `auth/`;
export const getCardsPath = `cards/`;
export const hosting =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_LOCAL_URL
    : process.env.REACT_APP_API_URL;

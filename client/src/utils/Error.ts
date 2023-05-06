export const toErrorMessage = (error: any) => {
  if (error.code === "ERR_NETWORK") {
    return "Failed to load data. Please try again later.";
  } else if (error.response.status === 401) {
    return "You need to authenticate to use this service.";
  } else {
    return "Unknown error";
  }
};

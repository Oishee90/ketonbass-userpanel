const getRole = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) return null;

  // Direct role inside user object
  if (userData.
verified_email) return userData.
verified_email;

  return null;
};

export default getRole;
const getRole = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) return null;

  // Direct role inside user object
  if (userData.role) return userData.role;

  return null;
};

export default getRole;
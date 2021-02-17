// Get Visible User list for Admin Based on Filter and Sort Criteria

const getVisibleUsers = (users, { text }) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(text.toLowerCase())
  );
};

export default getVisibleUsers;

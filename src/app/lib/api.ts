export const fetchEmployees = async () => {
  const res = await fetch('https://dummyjson.com/users?limit=20');
  return res.json();
};

// Add more API utilities as needed 
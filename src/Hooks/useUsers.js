import  { useState, useEffect } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(users);
  // Fetch the users from the backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAgents();
  }, []); // Fetches data once when the component is mounted

  return [users, setUsers, loading];
};

export default useUsers;
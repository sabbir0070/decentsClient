import { useState, useEffect, useContext } from 'react';
import useUsers from './useUsers';
import { AuthContext } from '../pages/Providers/AuthProvider';

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [users] = useUsers(); // Assuming this fetches all users from MongoDB
console.log(users);
  useEffect(() => {
    // Only proceed if user and users data is available
    if (!loading && user?.email) {
      setIsAdminLoading(true); // Set loading state to true while checking
      const currentUser = users.find((u) => u.email === user.email && u.role === "admin");
      
      setIsAdmin(!!currentUser); // Set isAdmin based on role match
      setIsAdminLoading(false); // Set loading state to false once check is done
    }
  }, [user, users, loading]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
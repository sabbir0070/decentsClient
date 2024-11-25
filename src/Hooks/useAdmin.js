import { useState, useEffect, useContext } from 'react';
import useUsers from './useUsers';
import { AuthContext } from '../pages/Providers/AuthProvider';


const useAdmin = () => {
const {user,loading} = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [users] = useUsers(); // Assuming this fetches all users from MongoDB

  useEffect(() => {
    // Only proceed if user and users data is available
    if (!loading && user ) {
      setIsAdminLoading(true); // Set loading state to true while checking
      const currentUser = users.find((u) => u.email === user?.email  && u.role === "admin");
      setIsAdminLoading(false)
      setIsAdmin(!!currentUser); 
      setIsAdminLoading(false); 
    }
  }, [user, users, loading]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;

// import { useState, useEffect, useContext } from 'react';
// import useUsers from './useUsers';
// import { AuthContext } from '../pages/Providers/AuthProvider';

// const useAdmin = () => {
//   const { user, loading } = useContext(AuthContext); // `user` is just an email string
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isAdminLoading, setIsAdminLoading] = useState(true);
//   const [users] = useUsers(); // Assuming this fetches all users from MongoDB
//    console.log("Checking admin:", { user, users });
//   useEffect(() => {
//     // Ensure that both user and users are available
//     if (!loading && user && users && users.length > 0) {
//       console.log("Checking admin:", { user, users });

//       // Set loading to true to indicate the check is in progress
//       setIsAdminLoading(true); 

//       // Find the user in the list of users
//       const currentUser = users.find(
//         (u) => u.email === user && u.role === "admin"
//       );

//       // Set admin status based on whether a matching user with admin role was found
//       setIsAdmin(!!currentUser); // Set isAdmin to true if currentUser is found and has the "admin" role
//       setIsAdminLoading(false); // Stop loading once the check is complete
//     } else if (!loading) {
//       // Handle cases where no user is logged in or users list is empty
//       setIsAdmin(false);
//       setIsAdminLoading(false);
//     }
//   }, [user, users, loading]);

//   return [isAdmin, isAdminLoading];
// };

// export default useAdmin;


//  coockie running code 

// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../pages/Providers/AuthProvider';
// import useUsers from './useUsers';

// const useAdmin = () => {
//   const { user, loading } = useContext(AuthContext); // Get user email from context
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isAdminLoading, setIsAdminLoading] = useState(true);
//   const [users] = useUsers(); // Fetch all users from MongoDB

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const storedUser = localStorage.getItem('user');
    
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser); // Parse the stored user data
//       setIsAdminLoading(true); // Indicate loading while checking for admin role

//       // Ensure users data is available and has users to check
//       if (users && users.length > 0) {
//         const currentUser = users.find(u => u.email === parsedUser && u.role === 'admin');
//         setIsAdmin(!!currentUser); // Set isAdmin based on whether the role is admin
//       }
//       setIsAdminLoading(false); // Stop loading after the check
//     } else {
//       // If no user data is stored, set admin status to false
//       setIsAdmin(false);
//       setIsAdminLoading(false);
//     }
//   }, [loading, users]); // Run effect when `loading` or `users` changes

//   return [isAdmin, isAdminLoading]; // Return the admin status and loading state
// };

// export default useAdmin;

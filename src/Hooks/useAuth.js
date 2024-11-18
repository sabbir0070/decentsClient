import {useContext} from 'react';
import { AuthContext } from '../pages/Providers/AuthProvider';

const useAuth = () => {
const auth = useContext(AuthContext)
console.log(auth);
  return auth;
  
}
export default useAuth;
import React, {useState, useEffect} from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({email:'',password:''});
  


  const login= ((loginstr)=>{
     console.log(loginstr)
     // if (loginstr !== false){
     //   setCurrentUser(undefined);
    // }else{
      setCurrentUser(loginstr)
      console.log(currentUser)
     //}
   })


  
  return (
    <AuthContext.Provider value={{currentUser:currentUser,setLogin:login}}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects,setProjects] = useState([]);
  const [project, setProject] = useState(null);


  return (
    <UserContext.Provider value={{ user,setUser,projects,setProjects,loading, setLoading,project, setProject }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

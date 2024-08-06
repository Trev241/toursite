import React, { createContext, useState } from 'react';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [sites, setSites] = useState([]);
  const [deletedSites, setDeletedSites] = useState([]);

  return (
    <SiteContext.Provider value={{ sites, setSites, deletedSites, setDeletedSites }}>
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;

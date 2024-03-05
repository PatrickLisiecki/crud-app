import { createContext, useState } from "react";

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactContextProvider };

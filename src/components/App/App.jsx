import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact, deleteContact } from './contactsSlice';
import { setFilter } from './filterSlice';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const addContactHandler = contact => {
    dispatch(addContact({ ...contact, id: nanoid() }));
  };

  const deleteContactHandler = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactHandler} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <Filter value={filter} onChangeFilter={handleFilterChange} />
      )}
      {filteredContacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContactHandler}
        />
      )}
    </div>
  );
};

export default App;

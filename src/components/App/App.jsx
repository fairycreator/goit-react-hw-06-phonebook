import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact, deleteContact } from './contactsSlice';
import { setFilter } from './filterSlice';
import {
  BackgroundContainer,
  Stars,
  Stars2,
  Stars3,
} from '../Background/Background.styled';
import { Container, Wrapper, Title, SubTitle } from '../App/App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      dispatch(addContact(savedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
    <>
      <BackgroundContainer>
        <Stars />
        <Stars2 />
        <Stars3 />
        <Container>
          <Title>
            Phone<span>book</span>
          </Title>
          <ContactForm onSubmit={addContactHandler} />
          <SubTitle>Contacts</SubTitle>
          {contacts.length > 0 ? (
            <Filter value={filter} onChangeFilter={handleFilterChange} />
          ) : (
            <Wrapper>Your phonebook is empty. Add your first contact!</Wrapper>
          )}
          {filteredContacts.length > 0 && (
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={deleteContactHandler}
            />
          )}
        </Container>
      </BackgroundContainer>
    </>
  );
};

export default App;

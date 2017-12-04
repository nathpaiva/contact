import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    'screen': 'list', // could be contact
    'contacts': []
  }

  componentDidMount() {
    ContactAPI.getAll().then(contacts => {
      this.setState({ contacts });
    })
  }

  removeContact = (contact) => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactAPI.remove(contact);
  }

  render () {
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}
            onNavigate={() => this.setState({ screen: 'contact' })}
          />
        )}
        {this.state.screen === 'contact' && (
          <CreateContact />
        )}
      </div>
    )
  }
}

export default App;

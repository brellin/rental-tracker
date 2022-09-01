import { useEffect, useState } from 'react';

import Row from './components/Row';
import './App.scss';

const serverAddress = window.location.hostname === 'localhost' ? 'http://localhost:5000/rentals' : 'https://pfl-be.herokuapp.com/rentals';

const App = _ => {
  const [ rentals, setRentals ] = useState([]);
  const [ fields, setFields ] = useState({ name: '', link: '', contacted: false, scheduled: false, wanted: null });

  useEffect(_ => {
    fetch(serverAddress)
      .then(res => res.json())
      .then(res => setRentals(res))
      .catch(err => console.error(err));
  }, []);

  console.log(fields);

  const handleChanges = e => { setFields({ ...fields, [ e.target.name ]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }); };

  const submit = e => {
    e.preventDefault();
    fetch(serverAddress + '/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    })
      .then(res => {
        console.log(res);
        rentals.push(fields);
        setFields({ name: '', link: '', contacted: false, scheduled: false, wanted: null });
      })
      .catch(err => console.error(err));
  };

  return <div className="wrApp">
    <h1>Rental Tracker</h1>

    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Contacted</th>
            <th>Scheduled</th>
            <th>Wanted</th>
            <th>Add/Delete</th>
          </tr>
        </thead>

        <tbody>
          { rentals.map(r => <Row key={ r.id } { ...r } />) }
        </tbody>

        <tfoot>
          <tr>
            <td> <input type="text" name='name' onInput={ handleChanges } /> </td>
            <td> <input type="text" name='link' onInput={ handleChanges } /> </td>
            <td> <input type="checkbox" name="contacted" onInput={ handleChanges } /> </td>
            <td> <input type="checkbox" name="scheduled" onInput={ handleChanges } /> </td>
            <td> <input type="checkbox" name="wanted" onInput={ handleChanges } /> </td>
            <td colSpan={ 5 }><button onClick={ submit }>Submit</button></td>
          </tr>
        </tfoot>
      </table>
    </section>

  </div>;
};

export default App;

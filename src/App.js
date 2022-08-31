import { useEffect, useState } from 'react';
import './App.scss';

const serverAddress = window.location.hostname;

export default _ => {
  const [ rentals, setRentals ] = useState([]);

  useEffect(_ => {
    fetch(serverAddress === 'localhost' ? 'http://localhost:5000/rentals' : 'https://pfl-be.herokuapp.com/rentals')
      .then(res => res.json())
      .then(res => setRentals(res))
      .catch(err => console.error(err));
  }, []);

  console.log(rentals);

  return <div className="wrApp">
    <h1>Rental Tracker</h1>

    <table>
      <thead>
        <tr>
          <th>Contacted</th>
          <th>Scheduled</th>
          <th>Wanted</th>
          <th>Link</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
      </tbody>
    </table>
  </div>;
};

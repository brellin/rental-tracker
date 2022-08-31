import { useState } from "react";

const Row = ({ id, name, contacted, scheduled, wanted, link }) => {
    const [ fields, setFields ] = useState({ name, link, contacted, scheduled, wanted });


    const serverAddress = window.location.hostname === 'localhost' ? 'http://localhost:5000/rentals' : 'https://pfl-be.herokuapp.com/rentals';


    const handleChanges = e => {
        setFields({ ...fields, [ e.target.name ]: e.target.checked });

        fetch(serverAddress + `/${ id }`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [ e.target.name ]: e.target.checked })
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
    };

    const delRent = e => {
        e.preventDefault();
        fetch(serverAddress + `/${ id }`, { method: "DELETE" })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.error(err));
    };

    return <tr>
        <td>{ name }</td>
        <td><a about="_blank" href={ link }>{ link }</a></td>
        <td><input type="checkbox" name="contacted" checked={ fields.contacted } onChange={ handleChanges } /></td>
        <td><input type="checkbox" name="scheduled" checked={ fields.scheduled } onChange={ handleChanges } /></td>
        <td><input type="checkbox" name="wanted" checked={ fields.wanted } onChange={ handleChanges } /></td>
        <td><button className="del" onClick={ delRent }>X</button></td>
    </tr>;
};

export default Row;

/* eslint-disable react/react-in-jsx-scope */
import React from 'react';


function Person(props) {
    return (
        <div>
            <h1>Alias Ashmole</h1>
            <h3>Name: {props.name}</h3>
            <h3>Lastname: {props.lastName}</h3>
            <h3>Occupation: {props.occupation}</h3>
            <hr />
        </div>
    );
}
export default Person;
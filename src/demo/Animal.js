import React from 'react';

function Animal(props) {
    return (
        <div>
            <h1>Animal-Dog</h1>
            <h3>Type: {props.type}</h3>
            <h3>Color: {props.color}</h3>
            <h3>Name: {props.name}</h3>
            <hr />
        </div>
    );
}
export default Animal;
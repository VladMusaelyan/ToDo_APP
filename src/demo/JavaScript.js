import React from 'react';

function JavaScript(props) {
    return (
        <div>
            <h1>Programming language</h1>
            <h3>Name: {props.name}</h3>
            <h3>Typing discipline: {props.typingDiscipline}</h3>
            <h3>First appeared: {props.firstAppeared}</h3>
            <hr />
        </div>
    );
}
export default JavaScript;
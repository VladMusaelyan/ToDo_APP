import React from 'react';

const arr = [1, 2, 3, 4];
const [a, b, c, d] = arr;
console.log(a);
console.log(arr.reduce((x, y) => x + y))
let sum = 0;
function num() {
    for (let num of arr) {
        sum += num;


    }
    return sum;
}
console.log(`num : ${num()}`)


const person = {
    name: 'Vlad',
    surName: 'Musaelyan',
    age: 20,
    gender: 'M'
};
const { name, surName, age, gender } = person;
console.log(name);
console.log(surName);
console.log(age);
console.log(gender);

const methods = {
    name: 'Tigran',
    run: () => 'runing...',
    sleep: () => 'sleeping...'
}

const newPerson = Object.assign(person, methods);
console.log(newPerson);
console.log(person);


const newUser = {
    ...person,
    ...methods
};
console.log(newUser);


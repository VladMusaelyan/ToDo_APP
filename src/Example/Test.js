// let a = 5;
// let b = 10;

// const { element } = require("prop-types");

// function too(strings, ...value) {
//     console.log(strings[0]);
//     console.log(strings[1]);
//     // console.log(strings[2]);
//     // console.log(strings[3]);
//     console.log(value[0]);
//     console.log(value[1]);
//     console.log(value[2]);
//     return 'Hello World!'
// }

// too`Hello ${a + b} world ${a * b} ${'efd'}`

// let x = 0;

// for (var i = 0; i < 10; i++) {
//     x += 10;
// }

// console.log(i)

// const set = new Set();

// set.add(2);
// set.add('Hello');
// console.log(set);
// console.log(set.has(2));
// const iterator = set.entries();
// console.log(iterator.next().value);
// console.log('keys of set', set.keys());


// const name = 'John';

// const obj = {
//     number: 20,
//     name
// }
// console.log(obj)

// var snack = 'Meow Mix';
// // console.log(snack);
// function getFood(food) {
//     // console.log(snack);
//     if (food) {
//         // console.log(snack);
//         var snack = 'Friskies';
//         return snack;
//     }
//     // console.log(snack);
//     return snack;
// }

// console.log(getFood(false));;

// (
//     function demo() {
//     console.log(this);
//     console.log('Hello World!');
// })()

// function logArguments() {
//     for (var i = 0; i < arguments.length; i++) {
//         console.log(arguments[i]);
//     }
// }
// logArguments(1, 4, 5)



// async function getPosts() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const x = await res.json();
//     const user = await x.filter(element => element.id === 2);
//     return user
// }
// getPosts()
//     .then(res => {
//         const user = { ...res };
//         return user;
//     })
//     .then(res => console.log(res))

// async function getPosts(url) {
//     fetch(url)
//         .then(res => res.text())
//         .then(res => console.log(res))
// }

// function getPosts() {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(res => res.json())
//         .then(res => console.log(res))
//         .catch(err => console.error(err))
// }
// getPosts()

// const url = [
//     'https://jsonplaceholder.typicode.com/posts',
//     'https://jsonplaceholder.typicode.com/comments',
//     'https://jsonplaceholder.typicode.com/albums'
// ]

// const requests = url.map(url => fetch(url)
//     .then(res => res.formData())
//     .then(res => console.log(res))
//     .catch(err => new Error(err))
// )

// console.log(requests)

// Promise.allSettled(requests)
//     .then(console.log('Finsh'))

// fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//     .then(res => res.json())
//     .then(res => console.log(res))

// function getUsers(name) {
//     return name.map(async (user) => {
//         const req = await fetch(`https://api.github.com/users/${user}`);
//         return req.json();
//     })
// }

// for (let user of getUsers(['vlad', 'Armen', 'kinit'])) {
//     user.then(res => console.log(JSON.stringify(res)))
// }

// const user = {
//     id: 2,
//     name: 'John'
// }

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
// })
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .then(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//             .then(res => res.json())
//             .then(res => console.log(res))
//     })

// fetch('http://localhost:3001/task', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         title: 'Hello Backend',
//         description: 'I am leraning programming'
//     })
// })
//     .then(res => res.json())
//     .then(res => console.log(res))


// fetch('http://localhost:3001/task', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         title: 'Lorem',
//         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum'
//     })
// })
//     .then(res => res.json())
//     .then(res => console.log(res))


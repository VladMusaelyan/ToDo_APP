// const { element } = require("prop-types");


// function getAvgAgeByColor(arr, hairColor) {
//     let ageCount = 0;
//     let personCount = 0;

//     arr.forEach(element => {
//         if (element.hairColor === hairColor) {
//             ageCount += element.age;
//             personCount++;
//         }
//     });

//     if (ageCount === 0) {
//         return 'No one was found';
//     }

//     return (ageCount / personCount);
// }

// const array = [
//     {
//         name: "Joe",
//         friends: [
//             { name: 'Susan', age: 12 },
//             { name: 'Jane', age: 43 },
//             { name: 'Susan', age: 33 }
//         ]
//     },
//     {
//         name: "Liz",
//         friends: [
//             { name: 'Mila', age: 12 },
//             { name: 'Susan', age: 43 },
//             { name: 'Susan', age: 33 },
//             { name: 'Susan', age: 33 },
//             { name: 'Susan', age: 33 },
//             { name: 'Jane', age: 33 },
//         ]
//     },
//     {
//         name: "Mike",
//         friends: [
//             { name: 'Susan', age: 12 },
//             { name: 'Susan', age: 43 },
//             { name: 'Susan', age: 33 }
//         ]
//     }
// ]

// function getPersonWithMostFriendsByName(arr, name) {
//     const countFrends = [];
//     arr.forEach(element => {
//         element.friends = element.friends.filter(friend => friend.name === name);
//         countFrends.push(element.friends.length);
//     });
//     return (arr[countFrends.indexOf(Math.max(...countFrends))].name);
// }


// function find(arr, text) {
//     let specialText = new Set();
//     arr.forEach(element => {
//         for (let word in element) {
//             if (element[word].search(text) !== -1) {
//                 specialText.add(element);
//             }
//         }
//     });
//     specialText = [...specialText];
//     return specialText;
// }

// console.log(find([
//     {
//         name: 'Apple',
//         color: 'red'
//     },
//     {
//         name: 'Banana',
//         color: 'yellow'
//     },
//     {
//         name: 'Orange',
//         color: 'orange'
//     },
//     {
//         name: 'Apple',
//         color: 'yellow',
//         text: 'yellow'
//     }
// ], 'yellow'))



function diamond(n) {
    let x;
    if (n % 2 === 0) {
        x = 2;
    }
    else {
        x = 1;
    }
    let str = '';
    for (let i = 0; i < (n - x) / 2; i++) {
        for (let j = 1; j < n - i; j++) {
            str = str + ' ';
        }
        for (let k = 1; k <= (2 * i + 1); k++) {
            str = str + '*';
        }
        str += '\n';
    }
    for (let i = (n - x) / 2; i >= 0; i--) {
        for (let j = 1; j < n - i; j++) {
            str = str + ' ';
        }
        for (let k = 1; k <= (2 * i + 1); k++) {
            str = str + '*';
        }
        str += '\n';
    }
}
diamond(7);

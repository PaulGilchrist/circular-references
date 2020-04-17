import React from 'react';
import logo from './logo.svg';
import './App.css';

import './cycle.js';

// Create circular data
// Setup vertices
let people = [
    {
        firstName: 'Lauren',
        lastName: 'Gilchrist'
    },
    {
        firstName: 'Paul',
        lastName: 'Gilchrist'
    },
    {
        firstName: 'Rich',
        lastName: 'Loweke'
    },
    {
        firstName: 'Sherri',
        lastName: 'Loweke'
    },
    {
        firstName: 'Vicky',
        lastName: 'Gilchrist'
    }
];

// Setup edges
let lauren = people.find(p => p.firstName==='Lauren');
let paul = people.find(p => p.firstName==='Paul');
let rich = people.find(p => p.firstName==='Rich');
let sherri = people.find(p => p.firstName==='Sherri');
let vicky = people.find(p => p.firstName==='Vicky');
// Lauren
lauren.aunt = sherri;
lauren.father = paul;
lauren.mother = vicky;
lauren.parents = [
    paul,
    vicky
];
lauren.uncle = rich;
// Paul
paul.brotherInLaw = rich;
paul.children = [
    lauren
];
paul.daughter = lauren;
paul.sister = sherri;
paul.wife = vicky;
// Rich
rich.brotherInLaw = paul;
rich.wife = sherri;
rich.niece = lauren;
rich.sisterInLaw = vicky;
// Sherri
sherri.brother = paul;
sherri.husband = rich;
sherri.niece = lauren;
sherri.sisterInLaw = vicky;
// Vicky
vicky.children = [
    lauren
];
vicky.daughter = lauren;
vicky.husband = paul;
vicky.sisterInLaw = sherri;
vicky.brotherInLaw = rich;

// Store circular referenced objects
let serializedJSON = JSON.stringify(JSON.decycle(people));
console.log('Object with circular references sussessfully serialized');
console.log(serializedJSON);
// Reconstitute object from serialized JSON
let people2 = JSON.retrocycle(JSON.parse(serializedJSON));
console.log('De-serialized without loss of any circular references');
console.log(people2);
let person = paul.sister.husband.niece;
console.log(`1-Way Complex Relationship = Paul's sister's husband's niece = ${person.firstName + ' ' + person.lastName}`);
person = paul.sister.husband.niece.uncle.wife.brother;
console.log(`2-Way Complex Relationship = Paul's sister's husband's niece's uncle's wife's brother = ${person.firstName + ' ' + person.lastName}`);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          View console to see object with circular references sussessfully serialized and then de-serialized without loss of any references.
        </p>
      </header>
    </div>
  );
}

export default App;

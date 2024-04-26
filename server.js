const express = require('express');
const app = express();

const pets = [
  {name: 'Tiny', owner: 'Tyler'},
  {name: 'Athena', owner: 'Tommy'},
  {name: 'Spot', owner: 'Jon'}
]
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/api/v1/pets', (req, res) => {
  res.send(pets);
});

app.get('/api/v1/pets/:name', (req, res) => {
  const { petName } = req.params;

  const foundPet = pets.find((pet) => {
    return pet.name === petName
  })

  res.send(foundPet);
});


app.get('/api/v1/pets/owner', (req, res) => {
  let foundPets = pets;

  if(req.query.owner) {
    foundPets = pets.filter((pet) => {
      return pet.owner === req.query.owner;
    })
  }

  res.send(foundPets);
});

app.listen(3000, () => {
  console.log('listening on port 3000')
});
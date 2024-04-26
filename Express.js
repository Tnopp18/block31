const express = require('express'); const app = express();

const petsData = [
    { id: 1, name: 'Buddy', owner: 'Alice' },
    { id: 2, name: 'Max', owner: 'Bob' },
    { id: 3, name: 'Charlie', owner: 'Alice' },
    { id: 4, name: 'Daisy', owner: 'Eve' }
];

app.get('/api/v1/pets', (req, res) => {
    res.json(petsData);
});

app.get('/api/v1/pets/:name', (req, res) => {
    const petName = req.params.name;
    const pet = petsData.find(pet => pet.name.toLowerCase() === petName.toLowerCase());
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({ message: 'Pet not found' });
    }
});

app.get('/api/v1/pets/owner', (req, res) => {
    const ownerName = req.query.owner;
    if (!ownerName) {
        return res.status(400).json({ message: 'Owner name parameter is missing' });
    }
    const pet = petsData.find(pet => pet.owner.toLowerCase() === ownerName.toLowerCase());
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({ message: 'Pet not found for this owner' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
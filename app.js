const express = require('express');
const bodyParser = require('body-parser');
// import './user.json';
const app = express();
const port = 4001;
const userService =  require('./services/userService.js')

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

// In-memory JSON object
// const user = './user.json';

let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 5, name: 'Item 25' },

     
];

// GET endpoint
app.get('/items', (req, res) => {
  res.json(items);
});

// POST endpoint
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push(newItem);
  res.status(201).json(newItem);

});

// PUT endpoint
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = req.body;
  let itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    items[itemIndex] = { ...items[itemIndex], ...updatedItem };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE endpoint
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    items = items.filter(item => item.id !== id);
    res.json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/registerUser', (req, res)=>{
    userService.registerUser()
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        res.send(error)
    })
})


let users = [];

app.post('/signUP',(req, res)=>{
 const {firstName, lastName, email, password, confirmPassword } = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword){
        return res.json({message: "All fields are req"});
    }

    if(password !== confirmPassword){
        return res.json({message: "password do not match"});
    }

    if(users.some(user => user.email === email)){
        return res.json({message: "password do not match"});
    }

    const newUser = {
        id: users.length ? users[users.length - 1].id +1: 1,
        firstName, lastName, email, password, confirmPassword
    };

    users.push(newUser)

    app.post('/registerUser', (req, res)=>{
        userService.registerUser(req.body)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
     })
});



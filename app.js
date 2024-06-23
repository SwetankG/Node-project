const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// import ('./user.json');
const app = express();
const port = 4001;
const userService =  require('./services/userService.js')

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

// In-memory JSON object
// const user = './user.json';

// let items = [
//     { id: 1, name: 'Item 1' },
//     { id: 2, name: 'Item 2' },
//     { id: 5, name: 'Item 25' },

     
// ];

// // GET endpoint
// app.get('/items', (req, res) => {
//   res.json(users.json);
// });

// // POST endpoint
// app.post('/items', (req, res) => {
//   const newItem = req.body;
//   newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
//   items.push(newItem);
//   res.status(201).json(newItem);

// });

// // PUT endpoint
// app.put('/items/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const updatedItem = req.body;
//   let itemIndex = items.findIndex(item => item.id === id);
  
//   if (itemIndex !== -1) {
//     items[itemIndex] = { ...items[itemIndex], ...updatedItem };
//     res.json(items[itemIndex]);
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // DELETE endpoint
// app.delete('/items/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   let itemIndex = items.findIndex(item => item.id === id);
  
//   if (itemIndex !== -1) {
//     items = items.filter(item => item.id !== id);
//     res.json({ message: 'Item deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });



let users = [];

app.post('/signUp',(req, res)=>{
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

    
});

app.get('/registerUserUI', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registerUser.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });

app.post('/registerUser', (req, res)=>{
    console.log(req.body)
    userService.registerUser(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
 });

 app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(req.body.email)
    console.log(req.body.password)
    userService.loginUser(email, password)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
 });
  
    

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const { registerUser, loginUser } = require('./services/userService');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static(path.join(__dirname, 'public')));

// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'registerUser.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     const result = registerUser(username, password);
//     res.send(result.message);
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const result = loginUser(username, password);
//     res.send(result.message);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

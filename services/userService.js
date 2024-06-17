const Q = require('q');
// const userService = require('./userService');


const userService = {};







// let users = [];

// // POST endpoint to handle user registration
// app.post('/register', (req, res) => {
//   const { firstName, lastName, email, password, confirmPassword } = req.body;

//   // Simple validation (for demonstration purposes)
//   if (!firstName || !lastName || !email || !password || !confirmPassword) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match.' });
//   }

//   // Check if the email is already registered
//   if (users.some(user => user.email === email)) {
//     return res.status(400).json({ message: 'Email is already registered.' });
//   }

//   // Create a new user object
//   const newUser = {
//     id: users.length ? users[users.length - 1].id + 1 : 1,
//     firstName,
//     lastName,
//     email,
//     password, // encrypt pswd before storing them
//   };

//   //  new user
//   users.push(newUser);

//   // Return the new user object (excluding the password) in the response
//   const { password: _, ...userWithoutPassword } = newUser;
//   res.status(201).json(userWithoutPassword);
// });


userService.registerUser = (newUserData) => {
    let deferred = Q.defer();
  
    userService.readDataFromJsonFile('users.json')
    .then((registerUserData)=>{
        return userService.processDataBeforeWrite(registerUserData, newUserData)
    })
    .then((processedData)=>{
        return userService.writeDataToJsonFile('users.json', processedData)
    })
    .then((fileWriteStatus)=>{
        if(fileWriteStatus == "success"){
            deferred.resolve("User Registered Successfully")
        }
        else{
            deferred.resolve("Something went wrong! Please try again")
        }     
    })
    .catch((error)=>{
        deferred.reject(error)
    })
    
  userService.readDataFromJsonFile = (fileName) => {
    let deferred = Q.defer();
    fs.readFile(fileName, 'utf8', (err, jsonFileData) => {
        if (err) {
            console.error('Error reading file:', err);
            deferred.reject(err)
        }
        deferred.resolve(jsonFileData)
    })
    return deferred.promise;
  }
  
  
  userService.processDataBeforeWrite = (existingData, newData)=>{
    let deferred = Q.defer();
    console.log(existingData)
    console.log(newData)
    // Parse the existing data
    let jsonData;
    try {
        jsonData = JSON.parse(existingData);
    } catch (err) {
        console.error('Error parsing JSON:', err);
        deferred.reject(err)
    }
  
  
    // Append the new data
    if (Array.isArray(jsonData)) {
        jsonData.push(newData);
    } else {
        // If jsonData is not an array, convert it to an array
        jsonData = [jsonData, newData];
    }
    deferred.resolve(jsonData)
    return deferred.promise;
  }
  
  
  userService.writeDataToJsonFile = (fileName, fileData) => {
    let deferred = Q.defer();
    console.log(fileName)
    console.log(fileData)
    const jsonData = JSON.stringify(fileData, null, 2);
  
  
    fs.writeFile(fileName, jsonData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            deferred.reject(err)
        } else {
            console.log('File has been written');
            deferred.resolve("success")
        }
    });
    return deferred.promise;
  }
  }

module.exports = userService;
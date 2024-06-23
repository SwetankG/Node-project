const Q = require('q');
const fs = require('fs');
const path = require('path');

const userService = {};

userService.registerUser = (newUserData) => {
    let deferred = Q.defer();

    userService.readDataFromJsonFile('users.json')
        .then((registeredUserData) => {
            return userService.processDataBeforeWrite(registeredUserData, newUserData)
        })
        .then((processedData) => {
            return userService.writeDataToJsonFile('users.json', processedData)
        })
        .then((fileWriteStatus) => {
            if (fileWriteStatus == "success") {
                deferred.resolve("User Registered Successfully")
            }
            else {
                deferred.resolve("Something went wrong! Please try again")
            }
        })
        .catch((error) => {
            deferred.reject(error)
        })
    return deferred.promise;
}

userService.readDataFromJsonFile = (fileName) => {
    let deferred = Q.defer();
    fs.readFile(path.join(fileName), 'utf8', (err, jsonFileData) => {
        if (err) {
            console.error('Error reading file:', err);
            deferred.reject(err)
        }
        // const jsonData = JSON.parse(jsonFileData);
        // deferred.resolve(jsonData)
        deferred.resolve(jsonFileData)
    })
    return deferred.promise;
}

userService.processDataBeforeWrite = (existingData, newData) => {
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
        jsonData = [jsonData];
    }
    deferred.resolve(jsonData)
    return deferred.promise;
}

// userService.processDataBeforeWrite = (existingData, newData) => {
//     let deferred = Q.defer();

//     // Check if existingData is an array, if not, initialize it as an empty array
//     if (!Array.isArray(existingData)) {
//         existingData = [];
//     }

//     // Check if user already exists
//     const userExists = existingData.some(user => user.email === newData.email);
//     if (userExists) {
//         deferred.reject('User already exists.');
//     } else {
//         // Hash the password before saving the new user
//         bcrypt.hash(newData.password, 10, (err, hash) => {
//             if (err) {
//                 console.error('Error hashing password:', err);
//                 deferred.reject(err);
//             } else {
//                 newData.password = hash;
//                 existingData.push(newData);
//                 deferred.resolve(existingData);
//             }
//         });
//     }

//     return deferred.promise;
// };

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
            console.log('File has been written ');
            deferred.resolve("success")
        }
    });
    return deferred.promise;
}

userService.loginUser = (email, password) => {
    let deferred = Q.defer();

    userService.readDataFromJsonFile('users.json')
        .then((registeredUserData) => {

            const parseRegisterUserData = JSON.parse(registeredUserData);

            const user = parseRegisterUserData.find(user => user.email === email);
            if (user) {
                deferred.resolve({ success: true, message: 'Login successful!' });
                // bcrypt.compare(password, user.password, (err, result) => {
                //     if (err) {
                //         console.error('Error comparing passwords:', err);
                //         deferred.reject(err);
                //     } else if (result) {
                //         deferred.resolve({ success: true, message: 'Login successful!' });
                //     } else {
                //         deferred.resolve({ success: false, message: 'Invalid credentials.' });
                //     }
                // });
            } else {
                deferred.resolve({ success: false, message: 'Invalid credentials.' });
            }
        })
        .catch((error) => {
            deferred.reject(error);
        });

    return deferred.promise;
};


module.exports = userService;




//===========================html==========================//

// const fs = require('fs');
// const path = require('path')

// const getUsers = () => {
//     try{
//     const data = fs.readFileSync(path.join(__dirname, '../users.json'), 'utf8')
//     return JSON.parse(data);
// } catch (error) {
//     console.error('Error reading users.json:', error);
//     return [];
// }
// };

// const saveUsers = (users) => {

//     try{
//         fs.writeFileSync(path.join(__dirname, '../users.json'), JSON.stringify(users, null, 2));

//     }catch(error){
//             console.log("error writing user.json", error);
//     }
// };

// const registerUser = (username, password) => {
//     const users = getUsers();
//     console.log('current users:', users)

//     if (users.find(user => user.username === username)) {
//         return { success: false, message: 'User already exists.' };
//     }

//     users.push({ username, password });
//     saveUsers(users);
//     console.log("users registered:", {username, password});
//     return { success: true, message: 'Registration successful!' };
// };

// const loginUser = (username, password) => {
//     const users = getUsers();

//     console.log("current users:", users);

//     const user = users.find(user => user.username === username && user.password === password);

//     if (user) {
//         console.log("login successful for:", username);
//         return { success: true, message: 'Login successful!' };
//     } else {
//         console.log("invalid cred for:", username)
//         return { success: false, message: 'Invalid credentials.' };
//     }
// };

// module.exports = {
//     registerUser,
//     loginUser
// };


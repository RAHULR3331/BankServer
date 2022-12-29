const jwt = require('jsonwebtoken');

//import DB
const db = require("./db");

//database
userDetails = {
    1000: {
        acno: 1000,
        username: "Rahul",
        password: 1000,
        balance: 1000,
        transaction: []
    },
    1001: {
        acno: 1001,
        username: "Alan",
        password: 1001,
        balance: 1000,
        transaction: []
    },
    1002: {
        acno: 1002,
        username: "Amal",
        password: 1002,
        balance: 1000,
        transaction: []
    },
    1003: {
        acno: 1003,
        username: "Redmi",
        password: 1003,
        balance: 1000,
        transaction: []
    }
}

const register = (acno, username, password) => {
    return db.User.findOne({
            acno
        })
        .then(user => {
            if (user) {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: 'user already registered'
                }
            } else {
                const newUser = new db.User({
                    acno:acno,
                    username:username,
                    password:password,
                    balance: 0,
                    transaction: []
                })

                newUser.save();
                return {
                    status: 'True',
                    statusCode: 200,
                    message: 'Register successfull'
                }

            }
        })
}
//Login
// login = (acno, pswd) => {
//     if (acno in userDetails) {
//         if (pswd == userDetails[acno]['password']) {
//             currentUser = userDetails[acno]['username'];
//             currentAcno = acno;
//             //To generatee token
//             const token = jwt.sign({
//                     currentAcno: acno
//                 },
//                 'superkey2022');
//             //It will generate a number and it assign to token.
//             return {
//                 status: 'True',
//                 statusCode: 200,
//                 message: 'Login successfull',
//                 token: token

//             }

//         } else {
//             return {
//                 status: 'false',
//                 statusCode: 400,
//                 message: 'password incorrect'
//             }

//         }
//     } else {
//         return {
//             status: 'false',
//             statusCode: 400,
//             message: 'Invalid user details'
//         }
//     }
// }
const login = (acno, pswd) => {
    return db.User.findOne({
            acno,
            password: pswd
        })
        .then(user => {
            if (user) {
                currentUser = user.username
                currentAcno = acno
                const token = jwt.sign({
                    currentAcno: acno
                }, 'superkey2022') //to generate token
                return {
                    status: 'true',
                    statusCode: 200,
                    message: "login sucessfull",
                    token: token,
                    currentAcno:acno,
                    currentUser:currentUser
                }

            } else {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: "invalid userdetails"
                }
            }
        })
}

//deposite
const deposite = (acno, pswd, amt) => {
    var amount = parseInt(amt);
    return db.User.findOne({
            acno,
            pswd
        })
        .then(user => {
            if (user) {
                user.balance += amount;
                user.transaction.push({
                    Type: 'credit',
                    Amount: amount

                })
                user.save();
                return {
                    status: 'true',
                    statusCode: 200,
                    message: `${amount} is credited and balance is ${user.balance}`
                }
                // console.log(userDetails)
                // return userDetails[acno]['balance'];
            } else {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: 'Invalid user details'
                }
            }
        })
}

const withdraw = (acno, pswd, amt) => {
    var amount = parseInt(amt);

    return db.User.findOne({
            acno,
            pswd
        })
        .then(user => {
            if (user) {
                if (user.balance > amount) {
                    user.balance -= amount;
                    user.transaction.push({
                        Type: 'debit',
                        Amount: amount
                    })

                    user.save();
                    return {
                        status: 'True',
                        statusCode: 200,
                        message: `${amount} is creadited and balance is ${user.balance}`
                    }
                } else {
                    return {
                        status: 'false',
                        statusCode: 400,
                        message: 'Transaction failed'
                    }
                }
            }
        })
}
// Transaction
const getTransaction = (acno) => {
    var amount = parseInt(amount);
    return db.User.findOne({
            acno
        })
        .then(user => {
            if (user) {
                return {

                    status: 'true',
                    statusCode: 200,
                    transaction: user.transaction
                }
            } else {
                return{
                status: 'false',
                statusCode: 400,
                message: "user not found"
            }
            }
        })

}
const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno})
    .then(user=>{
        if(user){
        return{
            status: 'true',
            statusCode: 200,
            message: 'User deleted successfully'
        }
    }
    else{
        return{
            status: 'false',
                statusCode: 400,
                message: "user not found"
        }
    }
    })
}


module.exports = {
    register,
    login,
    deposite,
    withdraw,
    getTransaction,
    deleteAcc
}
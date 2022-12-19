const jwt = require('JsonWebToken');

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
                    }


                 else {
                    const newUser = new db.user({
                        acno,
                        username,
                        password,
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
            }
        )}
        //Login
        login = (acno, pswd) => {
            if (acno in userDetails) {
                if (pswd == userDetails[acno]['password']) {
                    currentUser = userDetails[acno]['username'];
                    currentAcno = acno;
                    //To generatee token
                    const token = jwt.sign({
                            currentAcno: acno
                        },
                        'superkey2022');
                    //It will generate a number and it assign to token.
                    return {
                        status: 'True',
                        statusCode: 200,
                        message: 'Login successfull',
                        token: token

                    }

                } else {
                    return {
                        status: 'false',
                        statusCode: 400,
                        message: 'password incorrect'
                    }

                }
            } else {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: 'Invalid user details'
                }
            }
        }

        //deposite
        deposite = (acno, pswd, amt) => {
            var amount = parseInt(amt);
            if (acno in userDetails) {
                if (pswd == userDetails[acno]['password']) {
                    userDetails[acno]['balance'] += amount;
                    userDetails[acno]['transaction'].push({
                        Type: 'credit',
                        Amount: amount

                    })
                    return {
                        status: 'true',
                        statusCode: 200,
                        message: `${amount} is credited and balance is ${userDetails[acno]["balance"]}`
                    }
                    // console.log(userDetails)
                    // return userDetails[acno]['balance'];
                } else {
                    return {
                        status: 'false',
                        statusCode: 400,
                        message: 'password missmatch'
                    }
                }
            } else {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: 'Invalid user details'
                }
            }
        }

        withdraw = (acno, pswd, amt) => {
            var amount = parseInt(amt);

            if (acno in userDetails) {
                if (pswd == userDetails[acno]['password']) {
                    if (userDetails[acno]['balance'] > amount) {
                        userDetails[acno]['balance'] -= amount;
                        userDetails[acno]['transaction'].push({
                            Type: 'debit',
                            Amount: amount
                        })
                        return {
                            status: 'True',
                            statusCode: 200,
                            message: `${amount} is creadited and balance is ${userDetails[acno]["balance"]}`
                        }
                        //   this.saveDetails();
                        console.log(userDetails)
                        return userDetails[acno]['balance'];
                    } else {
                        // alert('Transaction failed')
                        return {
                            status: 'false',
                            statusCode: 400,
                            message: 'Transaction failed1'
                        }
                    }
                } else {
                    return {
                        status: 'false',
                        statusCode: 400,
                        message: 'Transaction failed2'
                    }
                }
            } else {
                return {
                    status: 'false',
                    statusCode: 400,
                    message: 'Transaction failed3'
                }
            }

        }
        // Transaction
        getTransaction = (acno) => {
            return {
                status: 'true',
                statusCode: 200,
                Transaction: userDetails[acno]['transaction']
            }
        }

        module.exports = {
            register,
            login,
            deposite,
            withdraw,
            getTransaction
        }
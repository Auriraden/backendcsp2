/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
/*                             Secret (Signature)                             */
/* -------------------------------------------------------------------------- */
const secret = "Capstone2E-CommerceAPI";

/* -------------------------------------------------------------------------- */
/*                           Token Creating Function                          */
/* -------------------------------------------------------------------------- */
/* 
    Analogy: 
        Pack the gift and provide a lock with the secret code as the key
*/
module.exports.createAccessToken = (user) => {
    // When a user logs in, a token will be generated with the user's information
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    // Generate a JSON web token using the jwt's sign method
    // Generates the token using the form data and the secret code with no additional options provided
    // data = payload, secret (signature), {} [options(currently none)]
    return jwt.sign(data, secret, {});
}

/* -------------------------------------------------------------------------- */
/*                         Token Verification Function                        */
/* -------------------------------------------------------------------------- */
/* 
    Analogy:
        Receive the gift and open the lock to verify if the sender is legitimate and the gift was not tampered with.
*/
module.exports.verify = (req, res, next) => {

    console.log(req.headers.authorization);

    let token = req.headers.authorization;

    if(typeof token === "undefined" ) {
        return res.send(false);
    }
    else{
        /* 
            Example token received: 
            Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWUzZjE3OTNjMWU5ZDFlYzdhOGEyMiIsImVtYWlsIjoiam9obkBtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTY0ODc4NTd9.x7_fb2gXkpPi_w7rfqk1CgC_a6bRIOQlxviKjoEcM5M
        */
        // To remove the "Bearer " from the authorization header
        // The "Bearer " is automatically included once user was able to log-in (submitted to the header)
        token = token.slice(7,token.length);

        console.log(token);

        // Token decryption

        // Valdate the token using the "verify" method decrypting the token using the secret
        jwt.verify(token, secret, function(err, decodedToken){

            if (err){
                return res.send(false);
            }
            else{
                console.log(decodedToken); // Contains the data from our token

                // user property will be added to request object and will contain our decodedToken
                req.user = decodedToken;

                next()
                // Middleware function
                // next() will let us proceed to the next middleware or controller (userController.getProfile)
            }
        });
    }
};

/* -------------------------------------------------------------------------- */
/*                           Verify Admin Middleware                          */
/* -------------------------------------------------------------------------- */
module.exports.verifyAdmin = (req, res, next) => {
    
    if (req.user.isAdmin){

        // If the logged in user, based on his token is an admin, we will proceed to the next middleware/controller
        next();
    }
    else{
        return res.send(false);
    }
}
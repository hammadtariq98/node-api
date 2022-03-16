const jwt = require('jsonwebtoken');

exports.issueJWT = (user) => {
    const expiresIn = '1d';

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        iat: Date.now()
    };
    
    const signedToken = jwt.sign(payload, "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8Mh+UONZp27", { expiresIn: expiresIn });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
}
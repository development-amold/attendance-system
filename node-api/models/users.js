var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema(
    {
        email: {
                type: String,
                unique: true,
                required: true
        },
        name: {
            type: String,
            required: true
        },
        hash: String,
        salt: String,
        is_admin: { type: Boolean, default: false}, 
        is_active: { type: Boolean, default: true},
    },
    {
        timestamps: true  // auto adds created_At & updated_At fields
    }    
);

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
    //   _id: this._id,
      id: this.id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
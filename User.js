var mongoose = require('mongoose');  

var validateName = function(name){
  var re1 = /^[a-zA-Z]+$/;
  return re1.test(name);
};

var validateEmail = function(email) {
  var re = /^[a-zA-Z\d._]{3,64}\@([a-z0-9]+)\.[a-z]+(.[a-z]+)?$/;
  return re.test(email);
};

 var validatePas= function(password){
  var pass= /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{4,8}$/;
  return pass.test(password);
 }
 
  var UserSchema = new mongoose.Schema({  
    name: { type: String, required:true, validate:[validateName , 'Only Allow Alphabetic '], match:[/^[a-zA-Z]+$/,'Fill valid name']},
    email: { type: String, required:true,validate: [validateEmail, 'Please fill a valid email address'],match: [/^[a-zA-Z\d._]{3,64}\@([a-z0-9]+)\.[a-z]+(.[a-z]+)?$/, 'Please fill a valid email address'], unique:true},
    password: { type: String , required:true, validate: [validatePas, 'Please fill a valid Password '],match: [/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{4,8}$/, 'Please fill a valid Password']},
     confirmPassword : {type:String,required:true}
  });

module.exports = mongoose.model('User',UserSchema);




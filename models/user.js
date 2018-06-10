var bcrypt = require('bcrypt');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopping');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email:{type: String, required: true},
    password:{type: String, required: true}
});
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);


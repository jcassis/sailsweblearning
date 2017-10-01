/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	email:{
  		type: 'string',
  		email: true,
  		unique: 'true'
  	},
  	username:{
  		type: 'string',
  		unique: 'true'
  	},
  	encryptedPassword:{
  		type: 'string'
  	},

  	toJSON: function() {
	  	var obj = this.toObject();
	  	delete obj.password;
	  	delete obj.confirmation;
	  	delete obj.encryptedPassword;
	  	return obj;
	  }
  },

  beforeCreate: (values, next) => {
  	if(!values.password || values.password != values.confirmation){
  		return next({err: ["Password doesn't match password confirmation."]});
  	}

  	require('bcrypt').hash(values.password, 10, (err, hash) => {
  		if(err) return next(err);

  		values.encryptedPassword = hash;
  		next();
  	});
  }
};


/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
		return res.view('homepage');
	},
	login: (req, res) => {
		User.findOne({
			email: req.param('email')
		}, (err, createdUser) => {
			if(err) return res.negotiate(err);
			if(!createdUser) return res.json({success: false, message:"Usuário não encontrado."});

			require('bcrypt').compare(req.param('password'), createdUser.encryptedPassword, function(err, isMatch) {
			    if(!isMatch) return res.json({success: false, message:"Senha incorreta."});

			    req.session.userID = createdUser.id;
			    return res.redirect('/chat/index');
			});
		});
	},
	logout: (req, res) => {
		if(!req.session.userID) return res.redirect('/');

		req.session.userID = null;
		return res.redirect('/');
	}
};


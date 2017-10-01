/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var method = {
	security: (req, res) => {
		if(!req.session.userID) return false;

		User.findOne(req.session.userID, (err, user)=>{
			if(err) return res.negotiate(err);

			if (!user) {
			    sails.log.verbose('Ops! Session refers to a user who no longer exists.');
		        return false;
		    }
		});
		return true;
	}
}

module.exports = {
	index: (req, res) => {
		if(!method.security(req, res)) return res.redirect('/');

		return res.view('chat/index');
	}
};


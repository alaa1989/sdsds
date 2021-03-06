/**
 * Users Controller
 *
 * @author khinds
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @copyright Kevin Hinds @ KevinHinds.com
 */

/**
 * show the user account page
 */
exports.myaccount = function(req, res) {
	req.userModel.getByUserName(req, req.session.user.username).then(function (result) {
		res.render('pages/users/account', {
			title : req.siteEnvironment.websiteConfig.websiteName + ' [Manage Account]',
			websiteName: req.siteEnvironment.websiteConfig.websiteName,
			username: req.session.user.username,
			fullname: result.fullname
		});
	});	
};

/**
 * show the login page
 */
exports.login = function(req, res) {
	res.render('pages/users/login', {
		title : req.siteEnvironment.websiteConfig.websiteName + ' [login]',
		websiteName: req.siteEnvironment.websiteConfig.websiteName
	});
};

/**
 * upon valid login credentials
 * 	set secure cookie with the user's info
 */
exports.checkLogin = function(req, res) {
	// if results and no errors check the user password against DB and set the user to the session
	req.userModel.getByUserName(req, req.body.username).then(function(result) {
		if (req.bcrypt.compareSync(req.body.password, result.password)) {
			
		    // render success message, set user in session and update last login time
			req.session.user = {uuid:result.uuid,username:result.username};
		    req.userModel.updateLastLogin(req, result.uuid);
		    res.render('pages/response', {response : 'user login sucessful'});
		} else {
			res.render('pages/response', {response : 'not found'});
		}
	  }).catch(function(err) {
	      res.render('pages/response', {response : 'not found'});
	  });
};

/**
 * logout then redirect to home page
 */
exports.logout = function(req, res) {
	req.session = null;
	res.redirect('/');
};

/**
 * forgot password dialog
 */
exports.forgot = function(req, res) {
	res.render('pages/users/forgot', {
		title : req.siteEnvironment.websiteConfig.websiteName + ' [Forgot Login]',
		websiteName: req.siteEnvironment.websiteConfig.websiteName
	});
};

/**
 * search for user email recovery password
 */
exports.checkForgot = function(req, res) {
	
	// search by username, but only if no email else we always search by that
	if (req.body.username.length > 0 && req.body.email.length == 0) {
		req.userModel.getByUserName(req, req.body.username).then(function (result) {
			
			// render success message, and email recovery message
			if (typeof result.email !== 'undefined' && result.email !== null) {
				req.userModel.recoverPassword(req, result.email);
			    res.render('pages/response', {response : 'user password recovered'});
			} else {
			    res.render('pages/response', {response : 'not found'});
			}
		 }).catch(function(err) {
			 res.render('pages/response', {response : 'not found'});
		 });
	}

	// search by email
	if (req.body.email.length > 0) {
		req.userModel.getByEmail(req, req.body.email).then(function (result) {
			if (typeof result.email !== 'undefined' && result.email !== null) {
				
				// render success message, and email recovery message
				req.userModel.recoverPassword(req, result.email);					
			    res.render('pages/response', {response : 'user password recovered'});
			}			
		 }).catch(function(err) {
		    res.render('pages/response', {response : 'not found'});
		 });
	}
};

/**
 * update and redirect to /users/account
 */
exports.update = function(req, res) {
	req.userModel.updateNameAndPassword(req, req.body.fullname, req.body.password).then(function (result) {
	    res.render('pages/response', {response : 'User Updated Successfully.'});
	}).catch(function(err) {
		res.render('pages/response', {response : 'User information could not be updated.'});
	});
};

/**
 * user signup page
 */
exports.signup = function(req, res) {
	res.render('pages/users/signup', {
		title : req.siteEnvironment.websiteConfig.websiteName + ' [Join Us!]',
		websiteName: req.siteEnvironment.websiteConfig.websiteName
	});
};

/**
 * create user here
 */
exports.create = function(req, res) {
	req.userModel.createNew(req).then(function (result) {
    	res.render('pages/users/create', {
    		title : req.siteEnvironment.websiteConfig.websiteName + ' [Join Us!]',
    		websiteName: req.siteEnvironment.websiteConfig.websiteName,
    		status: 'User account has been created.'
    	});
    	
    	// send the thank you for signing up email
    	req.emailHelper.emailUser(req, req.body.email, "Thank you for registering your account on "+ req.siteEnvironment.websiteConfig.websiteName + "!", "This address has been used to create an account on "+ req.siteEnvironment.websiteConfig.websiteName + ".  \n\nIf this action is unfamiliar to you, please let us know.  -" + req.siteEnvironment.websiteConfig.websiteEmailFromName);
	}).catch(function(err) {
		res.render('pages/users/create', {
    		title : req.siteEnvironment.websiteConfig.websiteName + ' [Join Us!]',
    		websiteName: req.siteEnvironment.websiteConfig.websiteName,
    		status: 'An error has occurred, your user account could not be created.'
    	});
	});
};

/**
 * check if any user values are already existing
 */
exports.checkExistingUserValues = function(req, res) {
	req.userModel.checkNameValueExists(req, req.body.property, req.body.value).then(function (result) {
		var existingUserValue = 'value exists';
	    if( ! result ) { existingUserValue = 'value does not exist'; }
	    res.render('pages/response', {response : existingUserValue});
	}).catch(function(err) {
		res.render('pages/response', {response : 'value does not exist'});
	});
};

/**
 * expose is logged in for browser AJAX requests
 */
exports.isLoggedIn = function(req, res) {
	res.render('pages/response', {
		response : res.locals.loggedIn
	});
}

// generic require logged in user checking for any routes that may require it
exports.requireLogin = function(req, res, next) {
	if (!req.session.user) {
	  res.redirect('/user/login');
	} else {
	  next();
	}
};
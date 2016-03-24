/**
 * SHADOW FILE
 * 		(please create your own personal 'settings.js' file with your own values from the template below)
 *
 * 		WARNING:
 * 				Never check in your own 'settings.js' to GIT, if it's a public repo and you'll give away your passwords :)
 */

// postgres DB
exports.DBConfig = {
	db : {
		host : "localhost",
		username : "website_db_user",
		password : "password here",
		database : "mydatabase"
	}
};

// SMTP config, send admin emails to users
exports.SMTPConfig = {
	mailHost : 'mail.mywebsite.com.com',
	fromAddress : 'admin@mywebsite.com',
	sendMailPassword : 'mail host password here'
};

// cookie session keys
exports.sessionKeys = {
	cookieParserKey : 'secret string value here',
	sessionKey: 'another secret string value here'
};
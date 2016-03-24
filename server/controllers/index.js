/**
 * Home Page Controller
 *
 * @author khinds
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @copyright Kevin Hinds @ KevinHinds.com
 */
 
/** 
 * show the main home page 
 */
exports.index = function(req, res) {
	res.render('pages/index', {
		title : req.siteEnvironment.websiteConfig.websiteName,
		websiteName: req.siteEnvironment.websiteConfig.websiteName
	});
};

/** 
 * show the about page 
 */
exports.about = function(req, res) {
	res.render('pages/about', {
		title : req.siteEnvironment.websiteConfig.websiteName,
		websiteName: req.siteEnvironment.websiteConfig.websiteName
	});
};

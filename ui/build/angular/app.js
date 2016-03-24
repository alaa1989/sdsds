/**
 * NodeJS Website 
 *
 * @author khinds
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * @copyright Kevin Hinds @ KevinHinds.com
 */
var nodeJSWebApp = angular.module('nodeJSWebApp', [ 'mm.foundation', 'indexController', 'userControllers', 'menuControllers', 'navigationController']);

//Intercept POST requests, convert to standard form encoding
nodeJSWebApp.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.transformRequest.unshift(function(data, headersGetter) {
	var key, result = [];
	for (key in data) {
	    if (data.hasOwnProperty(key)) {
		if (typeof (data[key]) == "undefined")
		    data[key] = '';
		result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
	    }
	}
	return result.join("&");
    });
} ]);
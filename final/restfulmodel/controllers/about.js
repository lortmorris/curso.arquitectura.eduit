/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:about");

function About(main) {
	debug("init...");

	return {
		'about': (req, res, next)=> {
			debug(".about called");


			let name = req.swagger.params.name ? req.swagger.params.name.value : null;

			res.json({
				'name': name,
				'version': '1.0'
			})
		}

	};
}

module.exports = About;
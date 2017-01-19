/* eslint-disable semi */
"use strict";

const debug = require('debug')("restful:controllers:universal");

function Universal(main) {
	debug("init...");

	return {
		'search': (req, res, next)=> {
			debug(".search called");
			let q = req.swagger.params.q ? req.swagger.params.q.value : null;
      let page = req.swagger.params.page ? req.swagger.params.page.value : null;
      let limit = req.swagger.params.limit ? req.swagger.params.limit.value : null;

      console.log(req.swagger.apiPath.slice(1));
			main.libs.universal.search(req.swagger.apiPath.slice(1),q, page, limit)
      .then((data)=> res.json(data))
      .catch(err=> next(err));
		}

	};
}

module.exports = Universal;

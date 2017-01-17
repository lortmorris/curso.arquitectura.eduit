const debug = require("debug")("lib:paginate");

const paginate = (db)=>{
    debug('.paginate constructor called');

        db.getCollectionNames((err, collections)=>{
            if(err) return;

            collections.forEach( c=> db[c].paginate = (query, fields, options)=>{
                debug("paginate called ");

                return new Promise((resolve, reject)=>{
                    let page  = options.page || 1;
                    let count = 0;
                    let totalPages = 0;
                    let defaultLimit = 30;
                    let sort = options.sort;

                    let total = db[c].count(query || {} ,(err, doc)=>{
                        if (err) return reject(err);
                        count = doc;

                        totalPages = Math.floor(count / (options.limit || defaultLimit)) + ((count % (options.limit || defaultLimit) ) > 0 ? 1:0);

                            db[c].find(query, fields)
                            .sort(sort)
                            .skip( (options.limit || defaultLimit) * (page -1) )
                            .limit(options.limit || defaultLimit, (err, docs)=>{
                                if(err) return reject(err);
                                else resolve({docs: docs, limit: (options.limit || defaultLimit), count: count, page:page, totalpages:  totalPages});
                            });

                    });
                });//end promise
            });
        });
}


module.exports = paginate;
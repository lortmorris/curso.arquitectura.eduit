const request = require('supertest');

module.exports = ({ Application, basePath }) => (next) => {
  const categoryPath = `${basePath}/categories`;
  const temporalCategoryName = `__TEMPORAL__${new Date().getTime()}`;
  const categoryObj = {
    name: temporalCategoryName,
    actualStatus: 'active',
  };

  let _id = null;
  describe(`Categories ${categoryPath}`, () => {
    it ('PUT', (done) => {
      Application
        .then(({ app }) => {
          request(app)
            .put(categoryPath)
            .set('Accept', 'application/json')
            .send(categoryObj)
            .expect('Content-Type', /json/)
            .expect(200, (err, response) => {
              if (err) done(response);
              else if ('_id' in response.body) done();
              else done(new Error('invalid answer'));
            });
        })
        .catch(err => done(err));
    });

    it('GET', (done) => {
      Application
        .then(({ app }) => {
          request(app)
            .get(`${categoryPath}?q=name:${temporalCategoryName}&page=1&limit=30`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, (err, response) => {
              if (err) done(err);
              else if ('docs' in response.body && 'totalPages' in response.body) {
                const { docs } = response.body;
                _id = docs.pop()._id;
                if (!_id) done(new Error('Document not saved'));
                else done();
              } else done(new Error('invalid answer'));
            });
        })
        .catch(err => done(err));
    });

    it('UPDATE', (done) => {
      Application
        .then(({ app }) => {
          request(app)
            .patch(categoryPath)
            .set('Accept', 'application/json')
            .send({
              _id,
              actualStatus: 'remove',
            })
            .expect('Content-Type', /json/)
            .expect(200, (err, response) => {
              if (err) done(err);
              else if ('nModified' in response.body && response.body.nModified === 1) {
                done();
              } else done(new Error('invalid answer'));
            });
        })
        .catch(err => done(err));
    });

    it('DELETE', (done) => {
      Application
        .then(({ app }) => {
          request(app)
            .delete(`${categoryPath}?_id=${_id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, (err, response) => {
              if (err) done(response);
              else if ('deletedCount' in response.body && response.body.deletedCount === 1) {
                done();
              } else done(new Error('invalid answer'));
            });
        })
        .catch(err => done(err));
    });
    after(next);
  });
};

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../');
let should = chai.should();

chai.use(chaiHttp);

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  password: 'test1234',
  email: 'john.was.here@clopotel.ro',
};

const userToAuthenticate = {
  email: 'mauris@pellentesquetellus.org',
  password: 'parola123',
};

describe('Users', () => {
  describe('[unauthenticated] User', () => {
    it('should not list all users', done => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should not list a user', done => {
      chai.request(server)
        .get('/users/106')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        })
    });

    it('should not create a user', done => {
      chai.request(server)
        .post('/users')
        .send(mockUser)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    })
  });

  describe('[authenticated] User', () => {
    let token = null;

    beforeEach(done => {
      chai.request(server)
        .post('/login')
        .send(userToAuthenticate)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should list all users', done => {
      chai.request(server)
        .get('/users')
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          // res.should.have.status(200);
          // res.should.have.property('array');
          assert(res.header.statusCode === 200, "nu e 200");
          // assert(res.body, Array);
          done();
        });
    });

    let createdUserId = null;

    it('should create a new user', done => {
      chai.request(server)
        .post('/users')
        .send(mockUser)
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          createdUserId = res.body.id;
          res.should.have.status(201);
          done();
        })
    });


    it('should list one user', done => {
      chai.request(server)
        .get('/users/' + createdUserId)
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should update the user', done => {
      chai.request(server)
        .put('/users/' + createdUserId)
        .send({
          ...mockUser,
          firstName: 'UpdatedName',
          lastName: 'TestUpdate',
        })
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    });

    it('should delete the user', done => {
      chai.request(server)
        .delete('/users/' + createdUserId)
        .set({ Authorization: 'Bearer ' + token })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    })
  })
});

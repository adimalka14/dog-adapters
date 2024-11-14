import request from 'supertest';
import app from '../../app';

describe('GET /', function () {
    it('res status 200', function (done) {
        request(app).get('/').expect(200, done);
    });

    it('main page', function (done) {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                expect(res.text).toBe('Main page');
                done();
            });
    });
});

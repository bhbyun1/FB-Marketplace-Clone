const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  //  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});

test('GET Category', async () => {
  await request.get('/v0/listings/category')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].names).toBeDefined();
      expect(res.body[0].names).toBe('Vehicles');
      expect(res.body[1].names).toBeDefined();
      expect(res.body[1].names).toBe('Apparel');
      expect(res.body[2].names).toBeDefined();
      expect(res.body[2].names).toBe('Electronics');
      expect(res.body[3].names).toBeDefined();
      expect(res.body[3].names).toBe('Sporting Goods');
    });
});

test('GET Subcategories', async () => {
  await request.get('/v0/listings/category?sub=Vehicles')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].names).toBeDefined();
      expect(res.body[0].names).toBe('Cars');
      expect(res.body[1].names).toBeDefined();
      expect(res.body[1].names).toBe('Motorcycles');
      expect(res.body[2].names).toBeDefined();
      expect(res.body[2].names).toBe('RVs');
      expect(res.body[3].names).toBeDefined();
      expect(res.body[3].names).toBe('Boats');
    });
});

test('GET Filters', async () => {
  await request.get('/v0/listings/category?fil=Vehicles')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].names).toBeDefined();
      expect(res.body[0].names).toBe('Vehicle Color');
      expect(res.body[0].attributes.color1).toBeDefined();
      expect(res.body[0].attributes.color1).toBe('White');
      expect(res.body[0].attributes.color2).toBeDefined();
      expect(res.body[0].attributes.color2).toBe('Grey');
      expect(res.body[0].attributes.color3).toBeDefined();
      expect(res.body[0].attributes.color3).toBe('Black');
      expect(res.body[0].attributes.color4).toBeDefined();
      expect(res.body[0].attributes.color4).toBe('Red');
      expect(res.body[0].attributes.color5).toBeDefined();
      expect(res.body[0].attributes.color5).toBe('Blue');
    });
});

test('GET Listings', async () => {
  await request.get('/v0/listings/')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].categoryid).toBeDefined();
      expect(res.body[0].memberid).toBeDefined();
      expect(res.body[0].listings.title).toBeDefined();
      expect(res.body[0].listings.price).toBeDefined();
      expect(res.body[0].listings.content).toBeDefined();
      expect(res.body[0].listings.createDate).toBeDefined();
    });
});

test('GET Listings Search', async () => {
  await request.get('/v0/listings?search=grey')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].categoryid).toBeDefined();
      expect(res.body[0].memberid).toBeDefined();
      expect(res.body[0].listings.title).toBeDefined();
      expect(res.body[0].listings.price).toBeDefined();
      expect(res.body[0].listings.content).toBeDefined();
      expect(res.body[0].listings.createDate).toBeDefined();
    });
});

test('GET Listings by ID', async () => {
  await request.get('/v0/listings?id=61d21627-0c63-4b85-9ae1-c7b668009348')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      console.log(res.body);
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].id).toBe('61d21627-0c63-4b85-9ae1-c7b668009348');
      expect(res.body[0].categoryid).toBeDefined();
      expect(res.body[0].categoryid).toBe('e2af758a-0c87-4710-a611-14a9ecbccc9a');
      expect(res.body[0].memberid).toBeDefined();
      expect(res.body[0].memberid).toBe('59599566-32d7-4cff-a293-48178ff58876');
      expect(res.body[0].listings.title).toBeDefined();
      expect(res.body[0].listings.title).toBe('grey shirt');
      expect(res.body[0].listings.price).toBeDefined();
      expect(res.body[0].listings.price).toBe('$3');
      expect(res.body[0].listings.content).toBeDefined();
      expect(res.body[0].listings.createDate).toBeDefined();
    });
});

test('GET Bad Listings Search', async () => {
  await request.get('/v0/listings?search=unicorncrazymenwithweapons')
    .expect(404)

});

test('GET Listings by Cat', async () => {
  await request.get('/v0/listings/Apparel')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].categoryid).toBeDefined();
      expect(res.body[0].memberid).toBeDefined();
      expect(res.body[0].listings.title).toBeDefined();
      expect(res.body[0].listings.price).toBeDefined();
      expect(res.body[0].listings.content).toBeDefined();
      expect(res.body[0].listings.createDate).toBeDefined();
    });
});

test('GET Listings by Sub', async () => {
  await request.get('/v0/listings/Apparel?sub=Clothing')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].categoryid).toBeDefined();
      expect(res.body[0].memberid).toBeDefined();
      expect(res.body[0].listings.title).toBeDefined();
      expect(res.body[0].listings.price).toBeDefined();
      expect(res.body[0].listings.content).toBeDefined();
      expect(res.body[0].listings.createDate).toBeDefined();
    });
});

test('GET Bad Listings by Cat', async () => {
  await request.get('/v0/listings/Oldsoggywaffles')
    .expect(404)
});

test('GET Bad Listings by Sub', async () => {
  await request.get('/v0/listings/Apparel?sub=Unicornmoonjumpers')
    .expect(404)
});


test('GET Listings by Sub', async () => {
  await request.get('/v0/listings/Apparel?sub=Clothing')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].categoryid).toBeDefined();
      expect(res.body[0].memberid).toBeDefined();
      expect(res.body[0].listings.title).toBeDefined();
      expect(res.body[0].listings.price).toBeDefined();
      expect(res.body[0].listings.content).toBeDefined();
      expect(res.body[0].listings.createDate).toBeDefined();
    });
});


test('GET Members', async () => {
  await request.get('/v0/member')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].member).toBeDefined();
      expect(res.body[0].member.name).toBeDefined();
      expect(res.body[0].member.email).toBeDefined();
      expect(res.body[0].member.picture).toBeDefined();
      expect(res.body[0].member.password).toBeDefined();
    });
});

test('GET Members by ID', async () => {
  await request.get('/v0/member?id=ff761662-3505-4fcf-b44d-e7307bb586c6')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      console.log(res.body);
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].id).toBe('ff761662-3505-4fcf-b44d-e7307bb586c6');
      expect(res.body[0].member).toBeDefined();
      expect(res.body[0].member.name).toBeDefined();
      expect(res.body[0].member.name).toBe('David Harrison');
      expect(res.body[0].member.email).toBeDefined();
      expect(res.body[0].member.email).toBe('davidharrison@gmail.com');
      expect(res.body[0].member.picture).toBeDefined();
      expect(res.body[0].member.password).toBeDefined();
    });
});

test('GET BAD Members by ID', async () => {
  await request.get('/v0/member?id=ff761662-3505-ffff-4444-e7307bb58666')
    .expect(404)
});








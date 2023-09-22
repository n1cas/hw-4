import request from 'supertest';
const API_URL = 'https://date.nager.at';
const countryCode = 'UA';
describe('e2e test for date.nager.at api', () => {
  describe('/CountryInfo', () => {
    test('should return 200 and Country Info ', async () => {
      const { status, body } = await request(API_URL).get(`/api/v3/CountryInfo/${countryCode}`);

      expect(status).toEqual(200);
      expect(body).toEqual({
        commonName: 'Ukraine',
        officialName: expect.any(String),
        countryCode: countryCode,
        region: expect.any(String),
        borders: expect.arrayContaining(
          [
            {
              commonName: expect.any(String),
              officialName: expect.any(String),
              countryCode: expect.any(String),
              region: expect.any(String),
              borders: null
            }
          ]
        )
      });
    });

    test('should return 404 if the country code provided is wrong', async () => {
      const fakeCountryCode = 'hw4';
      const { status } = await request(API_URL).get(`/api/v3/CountryInfo/${fakeCountryCode}`);

      expect(status).toEqual(404);
    });
  })

  describe('/AvailableCountries', () => {
    test('should return 200 and Available Countries ', async () => {
      const { status, body } = await request(API_URL).get(`/api/v3/AvailableCountries`);

      expect(status).toEqual(200);
      expect(body).toEqual(
        expect.arrayContaining([{
          countryCode: expect.any(String),
          name: expect.any(String)
      }]))
    });
  })
});

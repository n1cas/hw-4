import { shortenPublicHoliday, validateInput } from "./helpers";

describe('helpers', () => {
  const holiday = {
    date: '2023-01-01',
    localName: 'New Year',
    name: 'New Year',
    countryCode: "USA",
    fixed: false,
    global: true,
    counties:[],
    launchYear:80,
    types:[],
  }

  const expectedShortenedHoliday = {
    name: 'New Year',
    localName: 'New Year',
    date: '2023-01-01',
  };

  it('validateInput should pass successful', () => {
    expect(validateInput({ year: 2023, country: 'GB' })).toBeTruthy()
  });

  it('should throw an error for an invalid country', () => {
    const invalidCountry = 'JA';
    const errMsg = `Country provided is not supported, received: ${invalidCountry}`
    expect(()=> validateInput({ year: 2023, country: 'JA' })).toThrow(Error(errMsg))
  });

  it('should throw an error for an invalid year', () => {
    const invalidYear = 8266;
    const errMsg = `Year provided not the current, received: ${invalidYear}`
    expect(()=> validateInput({ year: invalidYear, country: 'GB' })).toThrow(Error(errMsg))
  });

  it('should return a shortened PublicHoliday object', () => {
    expect(shortenPublicHoliday(holiday)).toEqual(expectedShortenedHoliday);
  });

  it('should not modify the original PublicHoliday object', () => {
    const result = shortenPublicHoliday(holiday);

    expect(result).not.toBe(holiday);
  });
})

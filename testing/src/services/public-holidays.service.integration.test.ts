import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';

describe('publicHolidayService Integration Tests', () => {

  const year = 2023;
  const country = 'GB';
  const mockShortenPublicHolidays = [
    {
      "date": "2023-01-01",
      "localName": "New Year's Day",
      "name": "New Year's Day",
    }
  ];

  it('should get list of public holidays', async () => {
    const holidays = await getListOfPublicHolidays(year, country);
    expect(holidays[0]).toEqual(mockShortenPublicHolidays[0]);
  });

  it('should get not empty list of public holidays', async () => {
    const holidays = await getListOfPublicHolidays(year, country);
    expect(holidays.length).toBeGreaterThan(1);
  });

  it('should check if today is a public holiday', async () => {
    const holidays = await getListOfPublicHolidays(year, country);
    const result = holidays.find((el) => new Date(el.date) === new Date());
    const resp = await checkIfTodayIsPublicHoliday(country);

    if(result) {
      expect(resp).toBe(true);
    }else {
      expect(resp).toBe(false);
    }
  });

  it('should get next public holidays', async () => {
    const holidays = await getListOfPublicHolidays(year, country);
    const nextHolidays = await getNextPublicHolidays(country);

    expect(holidays.length).toBeGreaterThanOrEqual(nextHolidays.length);
  })
});
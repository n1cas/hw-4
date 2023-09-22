import axios from 'axios';

import { PUBLIC_HOLIDAYS_API_URL } from '../config';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from './public-holidays.service';
import * as helpers from '../helpers';
import { error } from 'console';
// Mock axios to avoid actual HTTP requests
jest.mock('axios');

describe('publicHolidayService', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const year = 2023;
  const country = 'GB';
  const mockResPublicHolidays = [
    {
      "date": "2023-12-25",
      "localName": "Christmas Day",
      "name": "Christmas Day",
      "countryCode": "GB",
      "fixed": false,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": [
        "Public"
      ]
    },
    {
      "date": "2023-12-26",
      "localName": "Boxing Day",
      "name": "St. Stephen's Day",
      "countryCode": "GB",
      "fixed": false,
      "global": true,
      "counties": null,
      "launchYear": null,
      "types": [
        "Public"
      ]
    }
  ];
  const mockShortenPublicHolidays = [
    {
      "date": "2023-12-25",
      "localName": "Christmas Day",
      "name": "Christmas Day",
    },
    {
      "date": "2023-12-26",
      "localName": "Boxing Day",
      "name": "St. Stephen's Day",
    }
  ];

  

  it('should get list of public holidays', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(mockResPublicHolidays));
    const resp = await getListOfPublicHolidays(year, country).then(resp => resp);
    
    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`
    );
    
    resp.forEach(
      (holiday, index) => {
        expect(holiday).toEqual(mockShortenPublicHolidays[index]);
      }
    );
  })

  it('should get list public holidays with fail', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
    const resp = await getListOfPublicHolidays(year, country).then(resp => resp);
    
    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`
    );
    
    expect(resp).toEqual([]);
  })

  it('should check if today is a public holiday', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`
    );

    expect(result).toBe(true);
  });

  it('should check if today is not a public holiday', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 204 }));
    const result = await checkIfTodayIsPublicHoliday(country);

    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`
    );

    expect(result).toBe(false);
  });

  it('should get next public holidays', async () => {
    (axios.get as jest.Mock).mockResolvedValue(mockResPublicHolidays);
    const result = await getNextPublicHolidays(country);

    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`
    );

    result.forEach(
      (holiday, index) => {
        expect(holiday).toEqual(mockShortenPublicHolidays[index]);
      }
    );
  })

  it('should get next public holidays with fail', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 204 }));
    const result = await getNextPublicHolidays(country);

    expect(axios.get).toHaveBeenCalledWith(
      `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`
    );

    expect(result).toEqual([])
  })
});
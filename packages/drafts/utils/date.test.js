import {
  dateTimeToUnixTimestamp,
  getDateString,
  getOrdinalSuffix,
  isToday,
} from './date';

describe('date utility', () => {
  const timezone = 'Europe/London';

  describe('getDateString', () => {
    describe('options not createdAt, not today', () => {
      it('should return date string with month, day, and time', () => {
        const timestamp = 1495820520;
        const expectedDateString = 'May 26th at 6:42 PM (BST)';
        const dateString = getDateString(timestamp, timezone);
        expect(dateString)
          .toBe(expectedDateString);
      });

      it('should return 24 hour string', () => {
        const timestamp = 1495820520;
        const expectedDateString = 'May 26th at 18:42 (BST)';
        const dateString = getDateString(timestamp, timezone, { twentyFourHourTime: true });
        expect(dateString)
          .toBe(expectedDateString);
      });

      it('should handle past due date', () => {
        const timestamp = 0;
        const expectedDateString = 'January 1st';
        const dateString = getDateString(timestamp, timezone, { isPastDue: true });
        expect(dateString)
          .toBe(expectedDateString);
      });

      it('should date from the past', () => {
        const timestamp = 0;
        const expectedDateString = 'January 1st at 1:00 AM (BST)';
        const dateString = getDateString(timestamp, timezone);
        expect(dateString)
          .toBe(expectedDateString);
      });
    });

    describe('is today', () => {
      it('should return date string beginning with \'today at\'', () => {
        const todayAsTimestamp = Date.now()/1000;
        const expectedPattern = /today at/;
        const todayDateString = getDateString(todayAsTimestamp, timezone);
        expect(todayDateString)
          .toMatch(expectedPattern);
      });
    });
  });

  describe('getOrdinalSuffix', () => {
    it('should return \'st\' for numbers ending in 1 (except 11)', () => {
      const first = getOrdinalSuffix(1);
      const twentyFirst = getOrdinalSuffix(21);
      const thirtyFirst = getOrdinalSuffix(31);
      expect(first)
        .toBe('st');
      expect(twentyFirst)
        .toBe('st');
      expect(thirtyFirst)
        .toBe('st');
    });
    it('should return \'nd\' for numbers ending in 2 (except 12) and \'rd\' for numbers ending in 3 (except 13)', () => {
      const second = getOrdinalSuffix(2);
      const twentySecond = getOrdinalSuffix(22);
      const third = getOrdinalSuffix(3);
      const twentyThird = getOrdinalSuffix(23);
      expect(second)
        .toBe('nd');
      expect(twentySecond)
        .toBe('nd');
      expect(third)
        .toBe('rd');
      expect(twentyThird)
        .toBe('rd');
    });
    it('should return \'th\' for teen numbers (and 11)', () => {
      const eleventh = getOrdinalSuffix(11);
      const twelfth = getOrdinalSuffix(12);
      const thirteenth = getOrdinalSuffix(13);
      expect(eleventh)
        .toBe('th');
      expect(twelfth)
        .toBe('th');
      expect(thirteenth)
        .toBe('th');
    });
  });

  describe('isToday', () => {
    it('should return true if given date is today', () => {
      const today = new Date();
      const isTodayResult = isToday({ date: today, profileTimezone: timezone });
      expect(isTodayResult)
        .toBe(true);
    });
    it('should return false if given date is not today', () => {
      const notTodayDate = new Date('Tue Apr 25 2017 13:00:09 GMT+0000 (GMT)');
      const isTodayResult = isToday({ date: notTodayDate, profileTimezone: timezone });
      expect(isTodayResult)
        .toBe(false);
    });
  });

  describe('dateTimeToUnixTimestamp', () => {
    it('should convert date to unix timestamp', () => {
      const date = { day: 26, month: 4, year: 2017 };
      const time = { hours: 17, minutes: 42 };
      const dateTimeAsTimestamp = 1495820520;
      const timezone = 'America/Scoresbysund';
      expect(dateTimeToUnixTimestamp({ date, time, timezone }))
        .toBe(dateTimeAsTimestamp);
    });
  });
});

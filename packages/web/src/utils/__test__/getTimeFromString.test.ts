import getTimeFromString from '@utils/getTimeFromString'

describe('getTimeFromString', () => {
  it('should return time in milliseconds', () => {
    jest.useFakeTimers().setSystemTime(new Date('1970-01-01T00:00:00.000Z'))
    expect(getTimeFromString('07:00')).toBe(0)
    expect(getTimeFromString('08:00')).toBe(3600000)
    expect(getTimeFromString('09:00')).toBe(7200000)
  })
})
import checkTimePeriod from '@utils/checkTimePeriod'

describe('checkTimePeriod', () => {
  it('should return true if now is in between open and close', () => {
    jest.useFakeTimers().setSystemTime(new Date('1970-01-02T00:00:00.000Z'))
    expect(checkTimePeriod({open:"07:00", close:'07:01'})).toBe(true)
    expect(checkTimePeriod({open:"06:59", close:'07:00'})).toBe(true)
    expect(checkTimePeriod({open:"07:00", close:'07:00'})).toBe(true)
    expect(checkTimePeriod({open:"06:00", close:'06:59'})).toBe(false)
  })

  it('should return false if now is not in between open and close', () => {
    jest.useFakeTimers().setSystemTime(new Date('1970-01-02T00:00:00.000Z'))
    expect(checkTimePeriod({open:"06:00", close:'06:59'})).toBe(false)
    expect(checkTimePeriod({open:"07:01", close:'08:00'})).toBe(false)
  })
})
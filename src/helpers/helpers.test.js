import { convertMinsToTime } from './helpers';

describe('Convert Minutes to 00ч 00м time format function:', () => {
  test('should return: ', () => {
    expect(convertMinsToTime(37)).toBe('0ч 37м');
    expect(convertMinsToTime(573)).toBe('9ч 33м');
    expect(convertMinsToTime(1639)).toBe('27ч 19м');
    expect(convertMinsToTime(3711)).toBe('61ч 51м');
  });
});

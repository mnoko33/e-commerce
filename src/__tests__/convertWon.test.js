const { ExpansionPanelActions } = require('@material-ui/core');
const convertWon = require('../utils/convertWon.js');

describe('convertWon.js', () => {
  test('100 => 100', () => {
    expect(convertWon(100)).toBe('100');
  })
  test('1000 => 1,000', () => {
    expect(convertWon(1000)).toBe('1,000');
  })
  test('10000 => 10,000', () => {
    expect(convertWon(10000)).toBe('10,000');
  })
  test('100000 => 100,000', () => {
    expect(convertWon(100000)).toBe('100,000');
  })
})
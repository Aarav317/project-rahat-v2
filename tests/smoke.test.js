'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { validateMedicine } = require('../lib/medicine');

test('medicine estimate accepts valid arithmetic inputs', () => {
  const result = validateMedicine({ name: 'DEMO TABLET', dose: 1, freq: 2, qty: 20, left: 10, start: '2026-10-13' });
  assert.equal(result.error, undefined);
  assert.equal(result.value.days, 5);
});

test('medicine estimate rejects missing label and invalid quantities', () => {
  assert.ok(validateMedicine({}).error);
  assert.ok(validateMedicine({ name: 'Demo', dose: 1, freq: 2, qty: 10, left: 11 }).error);
});

test('hospital data is served from the expected JSON file', () => {
  const hospitals = require('../data/hospitals.json');
  assert.ok(Array.isArray(hospitals));
  assert.ok(hospitals.length > 0);
});

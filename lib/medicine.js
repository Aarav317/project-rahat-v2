'use strict';

// Arithmetic-only medicine supply estimate. This never recommends a dose.
function validateMedicine(body = {}) {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const dose = Number(body.dose);
  const freq = Number(body.freq);
  const qty = Number(body.qty);
  const left = Number(body.left);
  const start = typeof body.start === 'string' ? body.start.trim() : '';

  if (!name || name.length > 100) return { error: 'Enter a medicine label up to 100 characters.' };
  if (![dose, freq, qty, left].every(Number.isFinite) || dose <= 0 || freq <= 0 || qty < 0 || left < 0 || left > qty || dose > 10000 || freq > 100 || qty > 100000 || left > 100000) {
    return { error: 'Enter valid positive dose/frequency and valid remaining/total units.' };
  }
  if (start && !/^\d{4}-\d{2}-\d{2}$/.test(start)) return { error: 'Use a valid start date.' };
  const daily = dose * freq;
  return { value: { name, dose, freq, qty, left, start, daily, days: left / daily } };
}

module.exports = { validateMedicine };

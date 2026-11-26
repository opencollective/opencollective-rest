import { accountNameAndLegalName, amountAsString, formatContact } from '../../src/server/lib/formatting';

describe('formatting', () => {
  describe('amountAsString', () => {
    it('formats the amount with its currency', () => {
      expect(amountAsString({ value: 1234.5, currency: 'USD' })).toEqual('$1,234.50 USD');
    });

    it('returns an empty string without a currency, instead of throwing', () => {
      expect(amountAsString({ value: 10, currency: null })).toEqual('');
      expect(amountAsString({ value: 10 })).toEqual('');
    });

    it('treats a missing value as 0', () => {
      expect(amountAsString({ value: null, currency: 'USD' })).toEqual('$0.00 USD');
      expect(amountAsString({ currency: 'EUR' })).toEqual('€0.00 EUR');
    });
  });

  describe('accountNameAndLegalName', () => {
    it('returns an empty string without account or names', () => {
      expect(accountNameAndLegalName(null)).toEqual('');
      expect(accountNameAndLegalName(undefined)).toEqual('');
      expect(accountNameAndLegalName({ name: null, legalName: null })).toEqual('');
    });

    it('returns whichever name is set', () => {
      expect(accountNameAndLegalName({ name: 'Name', legalName: null })).toEqual('Name');
      expect(accountNameAndLegalName({ name: null, legalName: 'Legal Name' })).toEqual('Legal Name');
    });

    it('shows both names when they differ', () => {
      expect(accountNameAndLegalName({ name: 'Name', legalName: 'Legal Name' })).toEqual('Legal Name (Name)');
      expect(accountNameAndLegalName({ name: 'Same', legalName: 'Same' })).toEqual('Same');
    });
  });

  describe('formatContact', () => {
    it('formats the name and email', () => {
      expect(formatContact({ name: 'Jane', email: 'jane@example.com' })).toEqual('Jane <jane@example.com>');
    });

    it('handles a null name', () => {
      expect(formatContact({ name: null, email: 'jane@example.com' })).toEqual('<jane@example.com>');
    });
  });
});

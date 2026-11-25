import moment from 'moment';

export const amountAsString = (amount: { currency?: string | null; value?: number | null }) => {
  // The GraphQL schema allows null amounts, Intl.NumberFormat would throw without a currency
  if (!amount.currency) {
    return '';
  }

  const amountAsString = new Intl.NumberFormat('en-US', { style: 'currency', currency: amount.currency }).format(
    amount.value ?? 0,
  );

  return `${amountAsString} ${amount.currency}`;
};

export const accountNameAndLegalName = (account?: { name?: string | null; legalName?: string | null } | null) => {
  const legalName = account?.legalName;
  const name = account?.name;
  if (!legalName && !name) {
    return '';
  } else if (legalName && name && legalName !== name) {
    return `${legalName} (${name})`;
  } else {
    return legalName || name;
  }
};

export const shortDate = (date?: string | null): string => {
  if (date) {
    return moment.utc(date).format('YYYY-MM-DD');
  } else {
    return '';
  }
};

export const formatContact = (contact: { name?: string | null; email?: string | null }) =>
  `${contact.name ? `${contact.name} ` : ''}<${contact.email}>`;

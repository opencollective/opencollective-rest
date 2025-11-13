import moment from 'moment';

export const amountAsString = (amount: { currency: string; value: number }) => {
  const amountAsString = new Intl.NumberFormat('en-US', { style: 'currency', currency: amount.currency }).format(
    amount.value,
  );

  return `${amountAsString} ${amount.currency}`;
};

export const accountNameAndLegalName = (account: { name?: string; legalName?: string }) => {
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

export const shortDate = (date: string): string => {
  if (date) {
    return moment.utc(date).format('YYYY-MM-DD');
  } else {
    return '';
  }
};

export const formatContact = (contact: { name?: string; email: string }) =>
  `${contact.name ? `${contact.name} ` : ''}<${contact.email}>`;

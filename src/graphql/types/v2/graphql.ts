/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** Account orders filter (INCOMING or OUTGOING) */
export type AccountOrdersFilter = 'INCOMING' | 'OUTGOING';

export type AccountReferenceInput = {
  /** The public id identifying the account (ie: dgm9bnk8-0437xqry-ejpvzeol-jdayw5re, acc_xxxxxxxx) */
  id?: string | null | undefined;
  /**
   * The internal id of the account (ie: 580)
   * @deprecated 2026-02-25: use id
   */
  legacyId?: number | null | undefined;
  /** The slug identifying the account (ie: babel for https://opencollective.com/babel) */
  slug?: string | null | undefined;
};

/** All account types */
export type AccountType =
  'BOT' | 'COLLECTIVE' | 'EVENT' | 'FUND' | 'INDIVIDUAL' | 'ORGANIZATION' | 'PLATFORM' | 'PROJECT' | 'VENDOR';

/** Input type for an amount with the value and currency */
export type AmountInput = {
  /** The currency string */
  currency?: Currency | null | undefined;
  /** If the amount was generated from a currency conversion, this field can be used to provide details about the conversion */
  exchangeRate?: CurrencyExchangeRateInput | null | undefined;
  /** The value in plain */
  value?: number | null | undefined;
  /** The value in cents */
  valueInCents?: number | null | undefined;
};

/** Input type for an amount range with the value and currency */
export type AmountRangeInput = {
  /** The minimum amount (inclusive) */
  gte?: AmountInput | null | undefined;
  /** The maximum amount (inclusive) */
  lte?: AmountInput | null | undefined;
};

export type ContributionFrequency = 'MONTHLY' | 'ONETIME' | 'YEARLY';

/** All supported currencies */
export type Currency =
  /** UAE Dirham */
  | 'AED'
  /** Afghani */
  | 'AFN'
  /** Lek */
  | 'ALL'
  /** Armenian Dram */
  | 'AMD'
  /** Netherlands Antillean Guilder */
  | 'ANG'
  /** Kwanza */
  | 'AOA'
  /** Argentine Peso */
  | 'ARS'
  /** Australian Dollar */
  | 'AUD'
  /** Aruban Florin */
  | 'AWG'
  /** Azerbaijanian Manat */
  | 'AZN'
  /** Convertible Mark */
  | 'BAM'
  /** Barbados Dollar */
  | 'BBD'
  /** Taka */
  | 'BDT'
  /** Bulgarian Lev */
  | 'BGN'
  /** Burundi Franc */
  | 'BIF'
  /** Bermudian Dollar */
  | 'BMD'
  /** Brunei Dollar */
  | 'BND'
  /** Boliviano */
  | 'BOB'
  /** Brazilian Real */
  | 'BRL'
  /** Bahamian Dollar */
  | 'BSD'
  /** Pula */
  | 'BWP'
  /** Belarussian Ruble */
  | 'BYN'
  /** Belize Dollar */
  | 'BZD'
  /** Canadian Dollar */
  | 'CAD'
  /** Congolese Franc */
  | 'CDF'
  /** Swiss Franc */
  | 'CHF'
  /** Chilean Peso */
  | 'CLP'
  /** Yuan Renminbi */
  | 'CNY'
  /** Colombian Peso */
  | 'COP'
  /** Costa Rican Colon */
  | 'CRC'
  /** Cabo Verde Escudo */
  | 'CVE'
  /** Czech Koruna */
  | 'CZK'
  /** Djibouti Franc */
  | 'DJF'
  /** Danish Krone */
  | 'DKK'
  /** Dominican Peso */
  | 'DOP'
  /** Algerian Dinar */
  | 'DZD'
  /** Egyptian Pound */
  | 'EGP'
  /** Ethiopian Birr */
  | 'ETB'
  /** Euro */
  | 'EUR'
  /** Fiji Dollar */
  | 'FJD'
  /** Falkland Islands Pound */
  | 'FKP'
  /** Pound Sterling */
  | 'GBP'
  /** Lari */
  | 'GEL'
  /** Ghana Cedi */
  | 'GHS'
  /** Gibraltar Pound */
  | 'GIP'
  /** Dalasi */
  | 'GMD'
  /** Guinea Franc */
  | 'GNF'
  /** Quetzal */
  | 'GTQ'
  /** Guyana Dollar */
  | 'GYD'
  /** Hong Kong Dollar */
  | 'HKD'
  /** Lempira */
  | 'HNL'
  /** Kuna */
  | 'HRK'
  /** Gourde */
  | 'HTG'
  /** Forint */
  | 'HUF'
  /** Rupiah */
  | 'IDR'
  /** New Israeli Sheqel */
  | 'ILS'
  /** Indian Rupee */
  | 'INR'
  /** Iceland Krona */
  | 'ISK'
  /** Jamaican Dollar */
  | 'JMD'
  /** Yen */
  | 'JPY'
  /** Kenyan Shilling */
  | 'KES'
  /** Som */
  | 'KGS'
  /** Riel */
  | 'KHR'
  /** Comoro Franc */
  | 'KMF'
  /** Won */
  | 'KRW'
  /** Cayman Islands Dollar */
  | 'KYD'
  /** Tenge */
  | 'KZT'
  /** Kip */
  | 'LAK'
  /** Lebanese Pound */
  | 'LBP'
  /** Sri Lanka Rupee */
  | 'LKR'
  /** Liberian Dollar */
  | 'LRD'
  /** Loti */
  | 'LSL'
  /** Moroccan Dirham */
  | 'MAD'
  /** Moldovan Leu */
  | 'MDL'
  /** Malagasy Ariary */
  | 'MGA'
  /** Denar */
  | 'MKD'
  /** Kyat */
  | 'MMK'
  /** Tugrik */
  | 'MNT'
  /** Pataca */
  | 'MOP'
  /** Mauritius Rupee */
  | 'MUR'
  /** Rufiyaa */
  | 'MVR'
  /** Kwacha */
  | 'MWK'
  /** Mexican Peso */
  | 'MXN'
  /** Malaysian Ringgit */
  | 'MYR'
  /** Mozambique Metical */
  | 'MZN'
  /** Namibia Dollar */
  | 'NAD'
  /** Naira */
  | 'NGN'
  /** Cordoba Oro */
  | 'NIO'
  /** Norwegian Krone */
  | 'NOK'
  /** Nepalese Rupee */
  | 'NPR'
  /** New Zealand Dollar */
  | 'NZD'
  /** Balboa */
  | 'PAB'
  /** Nuevo Sol */
  | 'PEN'
  /** Kina */
  | 'PGK'
  /** Philippine Peso */
  | 'PHP'
  /** Pakistan Rupee */
  | 'PKR'
  /** Zloty */
  | 'PLN'
  /** Guarani */
  | 'PYG'
  /** Qatari Rial */
  | 'QAR'
  /** Romanian Leu */
  | 'RON'
  /** Serbian Dinar */
  | 'RSD'
  /** Russian Ruble */
  | 'RUB'
  /** Rwanda Franc */
  | 'RWF'
  /** Saudi Riyal */
  | 'SAR'
  /** Solomon Islands Dollar */
  | 'SBD'
  /** Seychelles Rupee */
  | 'SCR'
  /** Swedish Krona */
  | 'SEK'
  /** Singapore Dollar */
  | 'SGD'
  /** Saint Helena Pound */
  | 'SHP'
  /** Leone */
  | 'SLL'
  /** Somali Shilling */
  | 'SOS'
  /** Surinam Dollar */
  | 'SRD'
  /** Lilangeni */
  | 'SZL'
  /** Baht */
  | 'THB'
  /** Somoni */
  | 'TJS'
  /** Pa’anga */
  | 'TOP'
  /** Turkish Lira */
  | 'TRY'
  /** Trinidad and Tobago Dollar */
  | 'TTD'
  /** New Taiwan Dollar */
  | 'TWD'
  /** Tanzanian Shilling */
  | 'TZS'
  /** Hryvnia */
  | 'UAH'
  /** Uganda Shilling */
  | 'UGX'
  /** US Dollar */
  | 'USD'
  /** Peso Uruguayo */
  | 'UYU'
  /** Uzbekistan Sum */
  | 'UZS'
  /** Dong */
  | 'VND'
  /** Vatu */
  | 'VUV'
  /** Tala */
  | 'WST'
  /** CFA Franc BEAC */
  | 'XAF'
  /** East Caribbean Dollar */
  | 'XCD'
  /** CFA Franc BCEAO */
  | 'XOF'
  /** CFP Franc */
  | 'XPF'
  /** Yemeni Rial */
  | 'YER'
  /** Rand */
  | 'ZAR'
  /** Zambian Kwacha */
  | 'ZMW';

/** Fields for a currency exchange rate */
export type CurrencyExchangeRateInput = {
  /** Date of the FX rate */
  date: any;
  fromCurrency: Currency;
  /** Where does the FX rate comes from */
  source: CurrencyExchangeRateSourceType;
  toCurrency: Currency;
  /** Exchange rate value as a float (e.g 1.15 or 0.86) */
  value: number;
};

/** Where does the FX rate come from */
export type CurrencyExchangeRateSourceType =
  /** Open Collective internal system, relying on caching and 3rd party APIs */
  | 'OPENCOLLECTIVE'
  /** PayPal API */
  | 'PAYPAL'
  /** User-provided exchange rate */
  | 'USER'
  /** Wise API */
  | 'WISE';

export type ExpenseReferenceInput = {
  /** The public id identifying the expense (ie: dgm9bnk8-0437xqry-ejpvzeol-jdayw5re, ex_xxxxxxxx) */
  id?: string | null | undefined;
  /**
   * The internal id of the expense (ie: 580)
   * @deprecated 2026-02-25: use id
   */
  legacyId?: number | null | undefined;
};

/** All supported expense types */
export type ExpenseType =
  /** Credit Card Charge: Payment done using an issued (virtual) credit card issued by your Fiscal Host. */
  | 'CHARGE'
  /** Funding Request: Request funding for a project or initiative. */
  | 'FUNDING_REQUEST'
  /** Grant: Request funding for a project or initiative. */
  | 'GRANT'
  /** Invoice: Charge for your time or get paid in advance. */
  | 'INVOICE'
  /** Platform billing: expense generated by Open Collective to charge for platform subscriptions */
  | 'PLATFORM_BILLING'
  /** Receipt: Get paid back for a purchase already made. */
  | 'RECEIPT'
  /** Settlement: expense generated by Open Collective to collect money owed by Fiscal Hosts. */
  | 'SETTLEMENT'
  /** Unclassified expense */
  | 'UNCLASSIFIED';

/** All supported expense types */
export type HostFeeStructure =
  /** Custom fee for this Collective only */
  | 'CUSTOM_FEE'
  /** Use global host fees */
  | 'DEFAULT'
  /** Set a monthly retainer for this Collective */
  | 'MONTHLY_RETAINER';

export type ManualPaymentProviderReferenceInput = {
  /** The unique identifier of the manual payment provider (ie: mpp_xxxxxxxx) */
  id: string;
};

/** Possible fields you can use to order by */
export type OrderByFieldType =
  /** The financial activity of the collective (number of transactions) */
  | 'ACTIVITY'
  | 'BALANCE'
  | 'CREATED_AT'
  /** Order by end date */
  | 'ENDS_AT'
  | 'HOSTED_COLLECTIVES_COUNT'
  | 'HOST_RANK'
  | 'LAST_CHARGED_AT'
  /** Order by the date of the last transaction. Using CollectiveTransactionStats.LatestTransactionCreatedAt. */
  | 'LAST_TRANSACTION_CREATED_AT'
  | 'MEMBER_COUNT'
  /** Order by the total amount managed by the Organization on the platform */
  | 'MONEY_MANAGED'
  | 'NAME'
  | 'RANK'
  /** Order by start date */
  | 'STARTS_AT'
  | 'TOTAL_CONTRIBUTED'
  | 'TOTAL_EXPENDED'
  /** Order by the date the collective was unhosted */
  | 'UNHOSTED_AT';

/** Input to order collection */
export type OrderByInput = {
  /** Ordering direction. */
  direction: OrderDirection;
  /** Field to order by. */
  field: OrderByFieldType;
};

/** Possible directions in which to order a list of items */
export type OrderDirection = 'ASC' | 'DESC';

export type OrderReferenceInput = {
  /** The public id identifying the order (ie: dgm9bnk8-0437xqry-ejpvzeol-jdayw5re, or_xxxxxxxx) */
  id?: string | null | undefined;
  /**
   * The legacy public id identifying the order (ie: 4242)
   * @deprecated 2026-02-25: use id
   */
  legacyId?: number | null | undefined;
};

/** All order statuses */
export type OrderStatus =
  | 'ACTIVE'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'ERROR'
  | 'EXPIRED'
  | 'IN_REVIEW'
  | 'NEW'
  | 'PAID'
  | 'PAUSED'
  | 'PENDING'
  | 'PROCESSING'
  | 'REFUNDED'
  | 'REJECTED'
  | 'REQUIRE_CLIENT_CONFIRMATION';

export type PaymentMethodService = 'OPENCOLLECTIVE' | 'PAYPAL' | 'STRIPE' | 'THEGIVINGBLOCK' | 'WISE';

export type PaymentMethodType =
  | 'ADAPTIVE'
  | 'ALIPAY'
  | 'BACS_DEBIT'
  | 'BANCONTACT'
  | 'BANK_TRANSFER'
  | 'COLLECTIVE'
  | 'CREDITCARD'
  | 'CRYPTO'
  | 'DEFAULT'
  | 'GIFTCARD'
  | 'HOST'
  | 'LINK'
  | 'MANUAL'
  | 'PAYMENT'
  | 'PAYMENT_INTENT'
  | 'PAYOUT'
  | 'PREPAID'
  | 'SEPA_DEBIT'
  | 'SUBSCRIPTION'
  | 'SWISH'
  | 'US_BANK_ACCOUNT'
  | 'VIRTUAL_CARD'
  | 'adaptive'
  | 'alipay'
  | 'bacs_debit'
  | 'bancontact'
  | 'bank_transfer'
  | 'collective'
  | 'creditcard'
  | 'crypto'
  | 'default'
  | 'giftcard'
  | 'host'
  | 'link'
  | 'manual'
  | 'payment'
  | 'paymentintent'
  | 'payout'
  | 'prepaid'
  | 'sepa_debit'
  | 'subscription'
  | 'swish'
  | 'us_bank_account'
  | 'virtual_card';

export type PayoutMethodType = 'ACCOUNT_BALANCE' | 'BANK_ACCOUNT' | 'CREDIT_CARD' | 'OTHER' | 'PAYPAL' | 'STRIPE';

export type RefundKind =
  /** Transaction was refunded due to a dispute */
  | 'DISPUTE'
  /** Transaction was refunded by the platform to fix a duplicated transaction */
  | 'DUPLICATE'
  /** Transaction reversed due to an edit */
  | 'EDIT'
  /** Refund issued by the host */
  | 'REFUND'
  /** Rejection issued by the host or collective admin */
  | 'REJECT';

/** The type of a tax like GST, VAT, etc */
export type TaxType =
  /** New Zealand Good and Services Tax */
  | 'GST'
  /** European Value Added Tax */
  | 'VAT';

export type TransactionKind =
  | 'ADDED_FUNDS'
  | 'APPLICATION_FEE'
  | 'BALANCE_TRANSFER'
  | 'CONTRIBUTION'
  | 'EXPENSE'
  | 'HOST_FEE'
  | 'HOST_FEE_SHARE'
  | 'HOST_FEE_SHARE_DEBT'
  | 'PAYMENT_PROCESSOR_COVER'
  | 'PAYMENT_PROCESSOR_DISPUTE_FEE'
  | 'PAYMENT_PROCESSOR_FEE'
  | 'PLATFORM_FEE'
  | 'PLATFORM_TIP'
  | 'PLATFORM_TIP_DEBT'
  | 'PREPAID_PAYMENT_METHOD'
  | 'TAX';

/** All transaction types */
export type TransactionType = 'CREDIT' | 'DEBIT';

export type ContributorsQueryVariables = Exact<{
  slug?: string | null | undefined;
  limit?: number | null | undefined;
  offset?: number | null | undefined;
}>;

export type ContributorsQuery = {
  account:
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | {
        id: string;
        slug: string;
        members: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            isActive: boolean;
            account:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  email: string | null;
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  website: string | null;
                  location: { address: string | null; country: string | null } | null;
                  activeRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  inactiveRecurringContributions: {
                    totalCount: number | null;
                    nodes: Array<{
                      status: OrderStatus | null;
                      frequency: ContributionFrequency | null;
                      createdAt: any;
                      amount: { value: number | null; currency: Currency | null };
                      tier: { slug: string | null; name: string | null } | null;
                    } | null> | null;
                  };
                  latestContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                  firstContributions: { nodes: Array<{ createdAt: any } | { createdAt: any } | null> | null };
                }
              | null;
            totalDonations: { value: number | null; currency: Currency | null };
          } | null> | null;
        };
      }
    | null;
};

export type AccountOrdersQueryVariables = Exact<{
  slug: string;
  filter?: AccountOrdersFilter | null | undefined;
  status?: Array<OrderStatus | null | undefined> | OrderStatus | null | undefined;
  tierSlug?: string | null | undefined;
  limit?: number | null | undefined;
  offset?: number | null | undefined;
}>;

export type AccountOrdersQuery = {
  account:
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | {
        orders: {
          limit: number | null;
          offset: number | null;
          totalCount: number | null;
          nodes: Array<{
            frequency: ContributionFrequency | null;
            status: OrderStatus | null;
            createdAt: any;
            fromAccount:
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | {
                  name: string | null;
                  slug: string;
                  type: AccountType;
                  imageUrl: string | null;
                  website: string | null;
                  twitterHandle: string | null;
                }
              | null;
            amount: { value: number | null };
            tier: { slug: string | null } | null;
            totalDonations: { value: number | null };
          } | null> | null;
        };
      }
    | null;
};

export type TransactionsFragmentFragment = {
  __typename: 'TransactionCollection';
  limit: number | null;
  offset: number | null;
  totalCount: number | null;
  nodes: Array<
    | {
        id: string;
        legacyId: number;
        publicId: string;
        group: string;
        type: TransactionType;
        kind: TransactionKind | null;
        description: string | null;
        createdAt: any;
        clearedAt: any;
        isRefund: boolean | null;
        isRefunded: boolean | null;
        refundKind: RefundKind | null;
        merchantId: string | null;
        amount: { value: number | null; currency: Currency | null };
        amountInHostCurrency: { value: number | null; currency: Currency | null };
        balanceInHostCurrency: { value: number | null; currency: Currency | null } | null;
        paymentProcessorFee: { value: number | null; currency: Currency | null };
        platformFee: { value: number | null; currency: Currency | null };
        hostFee: { value: number | null; currency: Currency | null };
        netAmountInHostCurrency: { value: number | null; currency: Currency | null };
        taxAmount: { value: number | null; currency: Currency | null };
        taxInfo: { id: string; type: TaxType; rate: number; idNumber: string | null } | null;
        account:
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              email: string | null;
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | null;
        oppositeAccount:
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              email: string | null;
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | null;
        host:
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | null;
        order: {
          id: string;
          legacyId: number;
          publicId: string;
          status: OrderStatus | null;
          createdAt: any;
          frequency: ContributionFrequency | null;
          memo: string | null;
          processedAt: any;
          customData: any;
          fromAccount:
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | null;
          accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          transactionImportRow?: {
            id: string;
            publicId: string;
            sourceId: any;
            description: string;
            date: any;
            rawValue: any;
            transactionsImport: { id: string; name: any };
            amount: { value: number | null; currency: Currency | null };
          } | null;
          manualPaymentProvider: { id: string; publicId: string; name: any } | null;
        } | null;
        balanceAccountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
        paymentMethod: { service: PaymentMethodService | null; type: PaymentMethodType | null } | null;
        expense: {
          id: string;
          legacyId: number;
          publicId: string;
          type: ExpenseType;
          tags: Array<string | null>;
          createdAt: any;
          reference: string | null;
          transferReference: string | null;
          payeeLocation: { address: string | null; country: string | null } | null;
          amount: { value: number | null; currency: Currency | null } | null;
          payoutMethod: { publicId: string; type: PayoutMethodType | null } | null;
          accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          transactionImportRow?: {
            id: string;
            publicId: string;
            sourceId: any;
            description: string;
            date: any;
            rawValue: any;
            transactionsImport: { id: string; name: any };
            amount: { value: number | null; currency: Currency | null };
          } | null;
          approvedBy: Array<
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | null
          >;
          paidBy:
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | null;
          createdByAccount:
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | null;
        } | null;
        refundTransaction:
          | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
          | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
          | null;
      }
    | {
        id: string;
        legacyId: number;
        publicId: string;
        group: string;
        type: TransactionType;
        kind: TransactionKind | null;
        description: string | null;
        createdAt: any;
        clearedAt: any;
        isRefund: boolean | null;
        isRefunded: boolean | null;
        refundKind: RefundKind | null;
        merchantId: string | null;
        amount: { value: number | null; currency: Currency | null };
        amountInHostCurrency: { value: number | null; currency: Currency | null };
        balanceInHostCurrency: { value: number | null; currency: Currency | null } | null;
        paymentProcessorFee: { value: number | null; currency: Currency | null };
        platformFee: { value: number | null; currency: Currency | null };
        hostFee: { value: number | null; currency: Currency | null };
        netAmountInHostCurrency: { value: number | null; currency: Currency | null };
        taxAmount: { value: number | null; currency: Currency | null };
        taxInfo: { id: string; type: TaxType; rate: number; idNumber: string | null } | null;
        account:
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              email: string | null;
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | null;
        oppositeAccount:
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              email: string | null;
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
              parent:
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    email: string | null;
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | {
                    id: string;
                    publicId: string;
                    slug: string;
                    name: string | null;
                    legalName: string | null;
                    type: AccountType;
                  }
                | null;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | null;
        host:
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | {
              id: string;
              publicId: string;
              slug: string;
              name: string | null;
              legalName: string | null;
              type: AccountType;
            }
          | null;
        order: {
          id: string;
          legacyId: number;
          publicId: string;
          status: OrderStatus | null;
          createdAt: any;
          frequency: ContributionFrequency | null;
          memo: string | null;
          processedAt: any;
          customData: any;
          fromAccount:
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | {
                id: string;
                publicId: string;
                name: string | null;
                location: { address: string | null; country: string | null } | null;
              }
            | null;
          accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          transactionImportRow?: {
            id: string;
            publicId: string;
            sourceId: any;
            description: string;
            date: any;
            rawValue: any;
            transactionsImport: { id: string; name: any };
            amount: { value: number | null; currency: Currency | null };
          } | null;
          manualPaymentProvider: { id: string; publicId: string; name: any } | null;
        } | null;
        balanceAccountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
        paymentMethod: { service: PaymentMethodService | null; type: PaymentMethodType | null } | null;
        expense: {
          id: string;
          legacyId: number;
          publicId: string;
          type: ExpenseType;
          tags: Array<string | null>;
          createdAt: any;
          reference: string | null;
          transferReference: string | null;
          payeeLocation: { address: string | null; country: string | null } | null;
          amount: { value: number | null; currency: Currency | null } | null;
          payoutMethod: { publicId: string; type: PayoutMethodType | null } | null;
          accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          transactionImportRow?: {
            id: string;
            publicId: string;
            sourceId: any;
            description: string;
            date: any;
            rawValue: any;
            transactionsImport: { id: string; name: any };
            amount: { value: number | null; currency: Currency | null };
          } | null;
          approvedBy: Array<
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | null
          >;
          paidBy:
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | null;
          createdByAccount:
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | { publicId: string; slug: string }
            | null;
        } | null;
        refundTransaction:
          | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
          | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
          | null;
      }
    | null
  > | null;
};

export type AccountTransactionsQueryVariables = Exact<{
  accountingCategory?: Array<string | null | undefined> | string | null | undefined;
  clearedFrom?: any;
  clearedTo?: any;
  dateFrom?: any;
  dateTo?: any;
  excludeAccount?: Array<AccountReferenceInput> | AccountReferenceInput | null | undefined;
  expense?: ExpenseReferenceInput | null | undefined;
  expenseType?: Array<ExpenseType | null | undefined> | ExpenseType | null | undefined;
  fetchHostFee?: boolean | null | undefined;
  fetchPaymentProcessorFee?: boolean | null | undefined;
  fetchTax?: boolean | null | undefined;
  fullDescription?: boolean | null | undefined;
  group?: Array<string | null | undefined> | string | null | undefined;
  hasAccountingCategoryField: boolean;
  hasBalanceAccountingCategoryField: boolean;
  hasTransactionImportRowField: boolean;
  includeChildrenTransactions?: boolean | null | undefined;
  includeEditedReversedTransactions?: boolean | null | undefined;
  includeGiftCardTransactions?: boolean | null | undefined;
  includeIncognitoTransactions?: boolean | null | undefined;
  includeRegularTransactions?: boolean | null | undefined;
  isRefund?: boolean | null | undefined;
  kind?: Array<TransactionKind | null | undefined> | TransactionKind | null | undefined;
  limit?: number | null | undefined;
  maxAmount?: number | null | undefined;
  merchantId?: Array<string | null | undefined> | string | null | undefined;
  minAmount?: number | null | undefined;
  offset?: number | null | undefined;
  order?: OrderReferenceInput | null | undefined;
  manualPaymentProvider?:
    Array<ManualPaymentProviderReferenceInput> | ManualPaymentProviderReferenceInput | null | undefined;
  paymentMethodService?: Array<PaymentMethodService | null | undefined> | PaymentMethodService | null | undefined;
  paymentMethodType?: Array<PaymentMethodType | null | undefined> | PaymentMethodType | null | undefined;
  searchTerm?: string | null | undefined;
  slug?: string | null | undefined;
  type?: TransactionType | null | undefined;
}>;

export type AccountTransactionsQuery = {
  transactions: {
    __typename: 'TransactionCollection';
    limit: number | null;
    offset: number | null;
    totalCount: number | null;
    nodes: Array<
      | {
          id: string;
          legacyId: number;
          publicId: string;
          group: string;
          type: TransactionType;
          kind: TransactionKind | null;
          description: string | null;
          createdAt: any;
          clearedAt: any;
          isRefund: boolean | null;
          isRefunded: boolean | null;
          refundKind: RefundKind | null;
          merchantId: string | null;
          amount: { value: number | null; currency: Currency | null };
          amountInHostCurrency: { value: number | null; currency: Currency | null };
          balanceInHostCurrency: { value: number | null; currency: Currency | null } | null;
          paymentProcessorFee: { value: number | null; currency: Currency | null };
          platformFee: { value: number | null; currency: Currency | null };
          hostFee: { value: number | null; currency: Currency | null };
          netAmountInHostCurrency: { value: number | null; currency: Currency | null };
          taxAmount: { value: number | null; currency: Currency | null };
          taxInfo: { id: string; type: TaxType; rate: number; idNumber: string | null } | null;
          account:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          oppositeAccount:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          host:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          order: {
            id: string;
            legacyId: number;
            publicId: string;
            status: OrderStatus | null;
            createdAt: any;
            frequency: ContributionFrequency | null;
            memo: string | null;
            processedAt: any;
            customData: any;
            fromAccount:
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            manualPaymentProvider: { id: string; publicId: string; name: any } | null;
          } | null;
          balanceAccountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          paymentMethod: { service: PaymentMethodService | null; type: PaymentMethodType | null } | null;
          expense: {
            id: string;
            legacyId: number;
            publicId: string;
            type: ExpenseType;
            tags: Array<string | null>;
            createdAt: any;
            reference: string | null;
            transferReference: string | null;
            payeeLocation: { address: string | null; country: string | null } | null;
            amount: { value: number | null; currency: Currency | null } | null;
            payoutMethod: { publicId: string; type: PayoutMethodType | null } | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            approvedBy: Array<
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null
            >;
            paidBy:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
            createdByAccount:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
          } | null;
          refundTransaction:
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | null;
        }
      | {
          id: string;
          legacyId: number;
          publicId: string;
          group: string;
          type: TransactionType;
          kind: TransactionKind | null;
          description: string | null;
          createdAt: any;
          clearedAt: any;
          isRefund: boolean | null;
          isRefunded: boolean | null;
          refundKind: RefundKind | null;
          merchantId: string | null;
          amount: { value: number | null; currency: Currency | null };
          amountInHostCurrency: { value: number | null; currency: Currency | null };
          balanceInHostCurrency: { value: number | null; currency: Currency | null } | null;
          paymentProcessorFee: { value: number | null; currency: Currency | null };
          platformFee: { value: number | null; currency: Currency | null };
          hostFee: { value: number | null; currency: Currency | null };
          netAmountInHostCurrency: { value: number | null; currency: Currency | null };
          taxAmount: { value: number | null; currency: Currency | null };
          taxInfo: { id: string; type: TaxType; rate: number; idNumber: string | null } | null;
          account:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          oppositeAccount:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          host:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          order: {
            id: string;
            legacyId: number;
            publicId: string;
            status: OrderStatus | null;
            createdAt: any;
            frequency: ContributionFrequency | null;
            memo: string | null;
            processedAt: any;
            customData: any;
            fromAccount:
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            manualPaymentProvider: { id: string; publicId: string; name: any } | null;
          } | null;
          balanceAccountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          paymentMethod: { service: PaymentMethodService | null; type: PaymentMethodType | null } | null;
          expense: {
            id: string;
            legacyId: number;
            publicId: string;
            type: ExpenseType;
            tags: Array<string | null>;
            createdAt: any;
            reference: string | null;
            transferReference: string | null;
            payeeLocation: { address: string | null; country: string | null } | null;
            amount: { value: number | null; currency: Currency | null } | null;
            payoutMethod: { publicId: string; type: PayoutMethodType | null } | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            approvedBy: Array<
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null
            >;
            paidBy:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
            createdByAccount:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
          } | null;
          refundTransaction:
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | null;
        }
      | null
    > | null;
  };
};

export type HostTransactionsQueryVariables = Exact<{
  account?: Array<AccountReferenceInput> | AccountReferenceInput | null | undefined;
  accountingCategory?: Array<string | null | undefined> | string | null | undefined;
  clearedFrom?: any;
  clearedTo?: any;
  dateFrom?: any;
  dateTo?: any;
  excludeAccount?: Array<AccountReferenceInput> | AccountReferenceInput | null | undefined;
  expense?: ExpenseReferenceInput | null | undefined;
  expenseType?: Array<ExpenseType | null | undefined> | ExpenseType | null | undefined;
  fetchHostFee?: boolean | null | undefined;
  fetchPaymentProcessorFee?: boolean | null | undefined;
  fetchTax?: boolean | null | undefined;
  fullDescription?: boolean | null | undefined;
  group?: Array<string | null | undefined> | string | null | undefined;
  hasAccountingCategoryField: boolean;
  hasBalanceAccountingCategoryField: boolean;
  hasTransactionImportRowField: boolean;
  includeChildrenTransactions?: boolean | null | undefined;
  includeEditedReversedTransactions?: boolean | null | undefined;
  includeHost?: boolean | null | undefined;
  isRefund?: boolean | null | undefined;
  hasDebt?: boolean | null | undefined;
  kind?: Array<TransactionKind | null | undefined> | TransactionKind | null | undefined;
  limit?: number | null | undefined;
  maxAmount?: number | null | undefined;
  merchantId?: Array<string | null | undefined> | string | null | undefined;
  minAmount?: number | null | undefined;
  offset?: number | null | undefined;
  order?: OrderReferenceInput | null | undefined;
  manualPaymentProvider?:
    Array<ManualPaymentProviderReferenceInput> | ManualPaymentProviderReferenceInput | null | undefined;
  paymentMethodService?: Array<PaymentMethodService | null | undefined> | PaymentMethodService | null | undefined;
  paymentMethodType?: Array<PaymentMethodType | null | undefined> | PaymentMethodType | null | undefined;
  searchTerm?: string | null | undefined;
  slug?: string | null | undefined;
  type?: TransactionType | null | undefined;
}>;

export type HostTransactionsQuery = {
  transactions: {
    __typename: 'TransactionCollection';
    limit: number | null;
    offset: number | null;
    totalCount: number | null;
    nodes: Array<
      | {
          id: string;
          legacyId: number;
          publicId: string;
          group: string;
          type: TransactionType;
          kind: TransactionKind | null;
          description: string | null;
          createdAt: any;
          clearedAt: any;
          isRefund: boolean | null;
          isRefunded: boolean | null;
          refundKind: RefundKind | null;
          merchantId: string | null;
          amount: { value: number | null; currency: Currency | null };
          amountInHostCurrency: { value: number | null; currency: Currency | null };
          balanceInHostCurrency: { value: number | null; currency: Currency | null } | null;
          paymentProcessorFee: { value: number | null; currency: Currency | null };
          platformFee: { value: number | null; currency: Currency | null };
          hostFee: { value: number | null; currency: Currency | null };
          netAmountInHostCurrency: { value: number | null; currency: Currency | null };
          taxAmount: { value: number | null; currency: Currency | null };
          taxInfo: { id: string; type: TaxType; rate: number; idNumber: string | null } | null;
          account:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          oppositeAccount:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          host:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          order: {
            id: string;
            legacyId: number;
            publicId: string;
            status: OrderStatus | null;
            createdAt: any;
            frequency: ContributionFrequency | null;
            memo: string | null;
            processedAt: any;
            customData: any;
            fromAccount:
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            manualPaymentProvider: { id: string; publicId: string; name: any } | null;
          } | null;
          balanceAccountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          paymentMethod: { service: PaymentMethodService | null; type: PaymentMethodType | null } | null;
          expense: {
            id: string;
            legacyId: number;
            publicId: string;
            type: ExpenseType;
            tags: Array<string | null>;
            createdAt: any;
            reference: string | null;
            transferReference: string | null;
            payeeLocation: { address: string | null; country: string | null } | null;
            amount: { value: number | null; currency: Currency | null } | null;
            payoutMethod: { publicId: string; type: PayoutMethodType | null } | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            approvedBy: Array<
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null
            >;
            paidBy:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
            createdByAccount:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
          } | null;
          refundTransaction:
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | null;
        }
      | {
          id: string;
          legacyId: number;
          publicId: string;
          group: string;
          type: TransactionType;
          kind: TransactionKind | null;
          description: string | null;
          createdAt: any;
          clearedAt: any;
          isRefund: boolean | null;
          isRefunded: boolean | null;
          refundKind: RefundKind | null;
          merchantId: string | null;
          amount: { value: number | null; currency: Currency | null };
          amountInHostCurrency: { value: number | null; currency: Currency | null };
          balanceInHostCurrency: { value: number | null; currency: Currency | null } | null;
          paymentProcessorFee: { value: number | null; currency: Currency | null };
          platformFee: { value: number | null; currency: Currency | null };
          hostFee: { value: number | null; currency: Currency | null };
          netAmountInHostCurrency: { value: number | null; currency: Currency | null };
          taxAmount: { value: number | null; currency: Currency | null };
          taxInfo: { id: string; type: TaxType; rate: number; idNumber: string | null } | null;
          account:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          oppositeAccount:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                email: string | null;
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
                parent:
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      email: string | null;
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | {
                      id: string;
                      publicId: string;
                      slug: string;
                      name: string | null;
                      legalName: string | null;
                      type: AccountType;
                    }
                  | null;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          host:
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | {
                id: string;
                publicId: string;
                slug: string;
                name: string | null;
                legalName: string | null;
                type: AccountType;
              }
            | null;
          order: {
            id: string;
            legacyId: number;
            publicId: string;
            status: OrderStatus | null;
            createdAt: any;
            frequency: ContributionFrequency | null;
            memo: string | null;
            processedAt: any;
            customData: any;
            fromAccount:
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | {
                  id: string;
                  publicId: string;
                  name: string | null;
                  location: { address: string | null; country: string | null } | null;
                }
              | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            manualPaymentProvider: { id: string; publicId: string; name: any } | null;
          } | null;
          balanceAccountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
          paymentMethod: { service: PaymentMethodService | null; type: PaymentMethodType | null } | null;
          expense: {
            id: string;
            legacyId: number;
            publicId: string;
            type: ExpenseType;
            tags: Array<string | null>;
            createdAt: any;
            reference: string | null;
            transferReference: string | null;
            payeeLocation: { address: string | null; country: string | null } | null;
            amount: { value: number | null; currency: Currency | null } | null;
            payoutMethod: { publicId: string; type: PayoutMethodType | null } | null;
            accountingCategory?: { id: string; publicId: string; code: string; name: string } | null;
            transactionImportRow?: {
              id: string;
              publicId: string;
              sourceId: any;
              description: string;
              date: any;
              rawValue: any;
              transactionsImport: { id: string; name: any };
              amount: { value: number | null; currency: Currency | null };
            } | null;
            approvedBy: Array<
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null
            >;
            paidBy:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
            createdByAccount:
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | { publicId: string; slug: string }
              | null;
          } | null;
          refundTransaction:
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | { id: string; legacyId: number; publicId: string; refundKind: RefundKind | null }
            | null;
        }
      | null
    > | null;
  };
};

export type HostForHostedCollectivesQueryVariables = Exact<{
  hostSlug: string;
}>;

export type HostForHostedCollectivesQuery = {
  host: { id: string; legacyId: number; slug: string; name: string | null; currency: Currency } | null;
};

export type HostedCollectivesQueryVariables = Exact<{
  hostSlug: string;
  hostCurrency: Currency;
  limit: number;
  offset: number;
  sort?: OrderByInput | null | undefined;
  hostFeesStructure?: HostFeeStructure | null | undefined;
  searchTerm?: string | null | undefined;
  type?: Array<AccountType | null | undefined> | AccountType | null | undefined;
  isApproved?: boolean | null | undefined;
  isFrozen?: boolean | null | undefined;
  isUnhosted?: boolean | null | undefined;
  balance?: AmountRangeInput | null | undefined;
  consolidatedBalance?: AmountRangeInput | null | undefined;
  currencies?: Array<string | null | undefined> | string | null | undefined;
  includeYearSummary: boolean;
  lastYear: any;
  includeAllTimeSummary: boolean;
  startsAtFrom?: any;
  startsAtTo?: any;
}>;

export type HostedCollectivesQuery = {
  host: {
    id: string;
    legacyId: number;
    slug: string;
    name: string | null;
    currency: Currency;
    hostedAccounts: {
      offset: number | null;
      limit: number | null;
      totalCount: number | null;
      nodes: Array<
        | {
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            hostFeesStructure: HostFeeStructure | null;
            hostFeePercent: number | null;
            approvedAt: any;
            unfrozenAt: any;
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            host: { id: string; legacyId: number; slug: string } | null;
            hostApplication: { id: string; createdAt: any } | null;
            hostAgreements: {
              totalCount: number | null;
              nodes: Array<{
                id: string | null;
                title: string;
                attachment:
                  | { id: string; url: any; name: string | null; type: string }
                  | { id: string; url: any; name: string | null; type: string }
                  | null;
              }> | null;
            } | null;
            yearSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
            } | null;
            allTimeSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseMonthlyAverageCount: number | null;
              contributionMonthlyAverageCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
              expenseMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              contributionMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              spentTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              spentTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
            } | null;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            startsAt: any;
            endsAt: any;
            hostFeesStructure: HostFeeStructure | null;
            hostFeePercent: number | null;
            approvedAt: any;
            unfrozenAt: any;
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            host: { id: string; legacyId: number; slug: string } | null;
            hostApplication: { id: string; createdAt: any } | null;
            hostAgreements: {
              totalCount: number | null;
              nodes: Array<{
                id: string | null;
                title: string;
                attachment:
                  | { id: string; url: any; name: string | null; type: string }
                  | { id: string; url: any; name: string | null; type: string }
                  | null;
              }> | null;
            } | null;
            yearSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
            } | null;
            allTimeSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseMonthlyAverageCount: number | null;
              contributionMonthlyAverageCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
              expenseMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              contributionMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              spentTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              spentTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
            } | null;
            parent:
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | null;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            hostFeesStructure: HostFeeStructure | null;
            hostFeePercent: number | null;
            approvedAt: any;
            unfrozenAt: any;
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            host: { id: string; legacyId: number; slug: string } | null;
            hostApplication: { id: string; createdAt: any } | null;
            hostAgreements: {
              totalCount: number | null;
              nodes: Array<{
                id: string | null;
                title: string;
                attachment:
                  | { id: string; url: any; name: string | null; type: string }
                  | { id: string; url: any; name: string | null; type: string }
                  | null;
              }> | null;
            } | null;
            yearSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
            } | null;
            allTimeSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseMonthlyAverageCount: number | null;
              contributionMonthlyAverageCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
              expenseMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              contributionMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              spentTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              spentTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
            } | null;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            hostFeesStructure: HostFeeStructure | null;
            hostFeePercent: number | null;
            approvedAt: any;
            unfrozenAt: any;
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            host: { id: string; legacyId: number; slug: string } | null;
            hostApplication: { id: string; createdAt: any } | null;
            hostAgreements: {
              totalCount: number | null;
              nodes: Array<{
                id: string | null;
                title: string;
                attachment:
                  | { id: string; url: any; name: string | null; type: string }
                  | { id: string; url: any; name: string | null; type: string }
                  | null;
              }> | null;
            } | null;
            yearSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
            } | null;
            allTimeSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseMonthlyAverageCount: number | null;
              contributionMonthlyAverageCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
              expenseMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              contributionMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              spentTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              spentTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
            } | null;
            parent:
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | null;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            hostFeesStructure: HostFeeStructure | null;
            hostFeePercent: number | null;
            approvedAt: any;
            unfrozenAt: any;
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            host: { id: string; legacyId: number; slug: string } | null;
            hostApplication: { id: string; createdAt: any } | null;
            hostAgreements: {
              totalCount: number | null;
              nodes: Array<{
                id: string | null;
                title: string;
                attachment:
                  | { id: string; url: any; name: string | null; type: string }
                  | { id: string; url: any; name: string | null; type: string }
                  | null;
              }> | null;
            } | null;
            yearSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
            } | null;
            allTimeSummary?: {
              expenseCount: number | null;
              expenseDistinctPayee: number | null;
              contributionCount: number | null;
              expenseMonthlyAverageCount: number | null;
              contributionMonthlyAverageCount: number | null;
              expenseTotal: { value: number | null; currency: Currency | null } | null;
              expenseMaxValue: { value: number | null; currency: Currency | null } | null;
              contributionTotal: { value: number | null; currency: Currency | null } | null;
              contributionRefundedTotal: { value: number | null; currency: Currency | null } | null;
              hostFeeTotal: { value: number | null; currency: Currency | null } | null;
              spentTotal: { value: number | null; currency: Currency | null } | null;
              receivedTotal: { value: number | null; currency: Currency | null } | null;
              expenseMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              contributionMonthlyAverageTotal: { value: number | null; currency: Currency | null } | null;
              spentTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalMonthlyAverage: { value: number | null; currency: Currency | null } | null;
              spentTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
              receivedTotalYearlyAverage: { value: number | null; currency: Currency | null } | null;
            } | null;
            parent:
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | { id: string; slug: string; name: string | null }
              | null;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | {
            id: string;
            legacyId: number;
            name: string | null;
            legalName: string | null;
            slug: string;
            website: string | null;
            type: AccountType;
            currency: Currency;
            imageUrl: string | null;
            isFrozen: boolean;
            isHost: boolean;
            tags: Array<string | null> | null;
            settings: any;
            createdAt: any;
            unhostedAt: any;
            stats: { id: string | null; balance: { value: number | null; currency: Currency | null } } | null;
            policies: { id: string | null; COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS: boolean | null };
            admins: {
              totalCount: number | null;
              nodes: Array<{
                id: string;
                account:
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { email: string | null; id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | { id: string; name: string | null; legalName: string | null }
                  | null;
              } | null> | null;
            };
            lastExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            firstExpenseReceived: { nodes: Array<{ id: string; createdAt: any } | null> | null };
            numberOfExpenses: { totalCount: number | null };
            firstContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            lastContributionReceived: { nodes: Array<{ createdAt: any } | null> | null };
            numberOfContributions: { totalCount: number | null };
          }
        | null
      > | null;
    };
  } | null;
};

export const TransactionsFragmentFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TransactionsFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionCollection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'nodes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'description' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'dynamic' },
                      value: { kind: 'BooleanValue', value: true },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'full' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fullDescription' } },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clearedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amountInHostCurrency' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceInHostCurrency' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentProcessorFee' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchPaymentProcessorFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'platformFee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hostFee' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchHostFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'netAmountInHostCurrency' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchHostFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchPaymentProcessorFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchTax' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxAmount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchTax' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'idNumber' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parent' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'oppositeAccount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parent' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'host' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'memo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'customData' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fromAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'location' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountingCategory' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasAccountingCategoryField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionImportRow' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasTransactionImportRowField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'rawValue' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionsImport' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'manualPaymentProvider' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceAccountingCategory' },
                  directives: [
                    {
                      kind: 'Directive',
                      name: { kind: 'Name', value: 'include' },
                      arguments: [
                        {
                          kind: 'Argument',
                          name: { kind: 'Name', value: 'if' },
                          value: {
                            kind: 'Variable',
                            name: { kind: 'Name', value: 'hasBalanceAccountingCategoryField' },
                          },
                        },
                      ],
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'service' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'expense' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'transferReference' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payeeLocation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'amount' },
                        name: { kind: 'Name', value: 'amountV2' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payoutMethod' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountingCategory' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasAccountingCategoryField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionImportRow' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasTransactionImportRowField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'rawValue' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionsImport' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approvedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paidBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdByAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isRefund' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isRefunded' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refundTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refundKind' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'refundKind' } },
                { kind: 'Field', name: { kind: 'Name', value: 'merchantId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TransactionsFragmentFragment, unknown>;
export const ContributorsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Contributors' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'members' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'role' },
                      value: {
                        kind: 'ListValue',
                        values: [
                          { kind: 'EnumValue', value: 'BACKER' },
                          { kind: 'EnumValue', value: 'ATTENDEE' },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'account' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'location' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'activeRecurringContributions' },
                                    name: { kind: 'Name', value: 'orders' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'oppositeAccount' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'slug' },
                                              value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'onlyActiveSubscriptions' },
                                        value: { kind: 'BooleanValue', value: true },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'orderBy' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'field' },
                                              value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                            },
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'direction' },
                                              value: { kind: 'EnumValue', value: 'DESC' },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'nodes' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'tier' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                                  ],
                                                },
                                              },
                                              { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'inactiveRecurringContributions' },
                                    name: { kind: 'Name', value: 'orders' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'oppositeAccount' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'slug' },
                                              value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'status' },
                                        value: {
                                          kind: 'ListValue',
                                          values: [
                                            { kind: 'EnumValue', value: 'PAUSED' },
                                            { kind: 'EnumValue', value: 'CANCELLED' },
                                          ],
                                        },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'orderBy' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'field' },
                                              value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                            },
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'direction' },
                                              value: { kind: 'EnumValue', value: 'DESC' },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'nodes' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'amount' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'tier' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                                  ],
                                                },
                                              },
                                              { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'latestContributions' },
                                    name: { kind: 'Name', value: 'transactions' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'limit' },
                                        value: { kind: 'IntValue', value: '1' },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'kind' },
                                        value: { kind: 'EnumValue', value: 'CONTRIBUTION' },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'fromAccount' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'slug' },
                                              value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'orderBy' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'field' },
                                              value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                            },
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'direction' },
                                              value: { kind: 'EnumValue', value: 'DESC' },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'nodes' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'firstContributions' },
                                    name: { kind: 'Name', value: 'transactions' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'limit' },
                                        value: { kind: 'IntValue', value: '1' },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'kind' },
                                        value: { kind: 'EnumValue', value: 'CONTRIBUTION' },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'fromAccount' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'slug' },
                                              value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'orderBy' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'field' },
                                              value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                            },
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'direction' },
                                              value: { kind: 'EnumValue', value: 'ASC' },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'nodes' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'isActive' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalDonations' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ContributorsQuery, ContributorsQueryVariables>;
export const AccountOrdersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountOrders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountOrdersFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'OrderStatus' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'tierSlug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'orders' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'filter' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'status' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'tierSlug' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'tierSlug' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fromAccount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'twitterHandle' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tier' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'slug' } }],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'totalDonations' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'value' } }],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountOrdersQuery, AccountOrdersQueryVariables>;
export const AccountTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountingCategory' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clearedFrom' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clearedTo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dateFrom' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dateTo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'excludeAccount' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountReferenceInput' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expense' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExpenseReferenceInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expenseType' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExpenseType' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fullDescription' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasAccountingCategoryField' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasBalanceAccountingCategoryField' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasTransactionImportRowField' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeChildrenTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeEditedReversedTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeGiftCardTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeIncognitoTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeRegularTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'isRefund' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'kind' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionKind' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'maxAmount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'merchantId' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'minAmount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'OrderReferenceInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'manualPaymentProvider' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ManualPaymentProviderReferenceInput' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodService' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentMethodService' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodType' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentMethodType' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'account' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'slug' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountingCategory' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountingCategory' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'clearedFrom' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clearedFrom' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'clearedTo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clearedTo' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateFrom' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'dateFrom' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateTo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'dateTo' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'excludeAccount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'excludeAccount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expense' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'expense' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expenseType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'expenseType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeChildrenTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeChildrenTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeDebts' },
                value: { kind: 'BooleanValue', value: true },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeEditedReversedTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeEditedReversedTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeGiftCardTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeGiftCardTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeIncognitoTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeIncognitoTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeRegularTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeRegularTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isRefund' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'isRefund' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'kind' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'kind' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'manualPaymentProvider' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'manualPaymentProvider' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'maxAmount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'maxAmount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'merchantId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'merchantId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'minAmount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'minAmount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentMethodService' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodService' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentMethodType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchTerm' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'TransactionsFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TransactionsFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionCollection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'nodes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'description' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'dynamic' },
                      value: { kind: 'BooleanValue', value: true },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'full' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fullDescription' } },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clearedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amountInHostCurrency' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceInHostCurrency' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentProcessorFee' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchPaymentProcessorFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'platformFee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hostFee' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchHostFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'netAmountInHostCurrency' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchHostFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchPaymentProcessorFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchTax' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxAmount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchTax' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'idNumber' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parent' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'oppositeAccount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parent' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'host' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'memo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'customData' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fromAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'location' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountingCategory' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasAccountingCategoryField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionImportRow' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasTransactionImportRowField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'rawValue' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionsImport' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'manualPaymentProvider' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceAccountingCategory' },
                  directives: [
                    {
                      kind: 'Directive',
                      name: { kind: 'Name', value: 'include' },
                      arguments: [
                        {
                          kind: 'Argument',
                          name: { kind: 'Name', value: 'if' },
                          value: {
                            kind: 'Variable',
                            name: { kind: 'Name', value: 'hasBalanceAccountingCategoryField' },
                          },
                        },
                      ],
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'service' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'expense' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'transferReference' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payeeLocation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'amount' },
                        name: { kind: 'Name', value: 'amountV2' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payoutMethod' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountingCategory' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasAccountingCategoryField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionImportRow' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasTransactionImportRowField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'rawValue' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionsImport' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approvedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paidBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdByAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isRefund' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isRefunded' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refundTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refundKind' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'refundKind' } },
                { kind: 'Field', name: { kind: 'Name', value: 'merchantId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountTransactionsQuery, AccountTransactionsQueryVariables>;
export const HostTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'HostTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'account' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountReferenceInput' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountingCategory' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clearedFrom' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'clearedTo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dateFrom' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'dateTo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'excludeAccount' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountReferenceInput' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expense' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExpenseReferenceInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'expenseType' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ExpenseType' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'fullDescription' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasAccountingCategoryField' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasBalanceAccountingCategoryField' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasTransactionImportRowField' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeChildrenTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeEditedReversedTransactions' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeHost' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'isRefund' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hasDebt' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'kind' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionKind' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'maxAmount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'merchantId' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'minAmount' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'OrderReferenceInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'manualPaymentProvider' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ManualPaymentProviderReferenceInput' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodService' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentMethodService' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodType' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaymentMethodType' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionType' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'account' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'account' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountingCategory' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountingCategory' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'clearedFrom' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clearedFrom' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'clearedTo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'clearedTo' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateFrom' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'dateFrom' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dateTo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'dateTo' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'excludeAccount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'excludeAccount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expense' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'expense' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expenseType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'expenseType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'group' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'group' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'host' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'slug' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeChildrenTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeChildrenTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeDebts' },
                value: { kind: 'BooleanValue', value: true },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeEditedReversedTransactions' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeEditedReversedTransactions' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeHost' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'includeHost' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isRefund' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'isRefund' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'hasDebt' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'hasDebt' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'kind' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'kind' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'manualPaymentProvider' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'manualPaymentProvider' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'maxAmount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'maxAmount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'merchantId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'merchantId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'minAmount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'minAmount' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentMethodService' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodService' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'paymentMethodType' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'paymentMethodType' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchTerm' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'TransactionsFragment' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TransactionsFragment' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'TransactionCollection' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
          { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'nodes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'group' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'kind' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'description' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'dynamic' },
                      value: { kind: 'BooleanValue', value: true },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'full' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fullDescription' } },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'clearedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amountInHostCurrency' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceInHostCurrency' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentProcessorFee' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchPaymentProcessorFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'platformFee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hostFee' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchHostFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'netAmountInHostCurrency' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchHostFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchHostFee' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchPaymentProcessorFee' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchPaymentProcessorFee' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchTax' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxAmount' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'fetchTax' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'fetchTax' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'idNumber' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'account' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parent' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'oppositeAccount' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'parent' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                  {
                                    kind: 'InlineFragment',
                                    typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Individual' } },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'email' } }],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'host' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'frequency' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'memo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'processedAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'customData' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'fromAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'location' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountingCategory' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasAccountingCategoryField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionImportRow' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasTransactionImportRowField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'rawValue' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionsImport' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'manualPaymentProvider' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'balanceAccountingCategory' },
                  directives: [
                    {
                      kind: 'Directive',
                      name: { kind: 'Name', value: 'include' },
                      arguments: [
                        {
                          kind: 'Argument',
                          name: { kind: 'Name', value: 'if' },
                          value: {
                            kind: 'Variable',
                            name: { kind: 'Name', value: 'hasBalanceAccountingCategoryField' },
                          },
                        },
                      ],
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'service' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'expense' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'transferReference' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payeeLocation' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'amount' },
                        name: { kind: 'Name', value: 'amountV2' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'payoutMethod' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountingCategory' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasAccountingCategoryField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transactionImportRow' },
                        directives: [
                          {
                            kind: 'Directive',
                            name: { kind: 'Name', value: 'include' },
                            arguments: [
                              {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'if' },
                                value: {
                                  kind: 'Variable',
                                  name: { kind: 'Name', value: 'hasTransactionImportRowField' },
                                },
                              },
                            ],
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'rawValue' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionsImport' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'approvedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'paidBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdByAccount' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isRefund' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isRefunded' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refundTransaction' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publicId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'refundKind' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'refundKind' } },
                { kind: 'Field', name: { kind: 'Name', value: 'merchantId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HostTransactionsQuery, HostTransactionsQueryVariables>;
export const HostForHostedCollectivesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'HostForHostedCollectives' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hostSlug' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'host' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'hostSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HostForHostedCollectivesQuery, HostForHostedCollectivesQueryVariables>;
export const HostedCollectivesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'HostedCollectives' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hostSlug' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hostCurrency' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Currency' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'OrderByInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'hostFeesStructure' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'HostFeeStructure' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountType' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'isApproved' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'isFrozen' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'isUnhosted' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'balance' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AmountRangeInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'consolidatedBalance' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'AmountRangeInput' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currencies' } },
          type: { kind: 'ListType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeYearSummary' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lastYear' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'includeAllTimeSummary' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'startsAtFrom' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'startsAtTo' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DateTime' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'host' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'hostSlug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hostedAccounts' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'offset' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'searchTerm' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'searchTerm' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'hostFeesStructure' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'hostFeesStructure' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'accountType' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'isApproved' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'isApproved' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'isFrozen' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'isFrozen' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'isUnhosted' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'isUnhosted' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'balance' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'balance' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'consolidatedBalance' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'consolidatedBalance' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'currencies' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'currencies' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'startsAtFrom' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'startsAtFrom' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'startsAtTo' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'startsAtTo' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'offset' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nodes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'imageUrl' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'height' },
                                  value: { kind: 'IntValue', value: '96' },
                                },
                              ],
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'isFrozen' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'isHost' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'settings' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'unhostedAt' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'host' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'slug' },
                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'hostSlug' } },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'stats' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'balance' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'currency' },
                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'hostCurrency' } },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'policies' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'COLLECTIVE_ADMINS_CAN_SEE_PAYOUT_METHODS' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'InlineFragment',
                              typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Event' } },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
                                ],
                              },
                            },
                            {
                              kind: 'InlineFragment',
                              typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithHost' } },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'host' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'legacyId' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'hostFeesStructure' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'hostFeePercent' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'approvedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'unfrozenAt' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hostApplication' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hostAgreements' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'nodes' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'attachment' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'yearSummary' },
                                    name: { kind: 'Name', value: 'summary' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'dateFrom' },
                                        value: { kind: 'Variable', name: { kind: 'Name', value: 'lastYear' } },
                                      },
                                    ],
                                    directives: [
                                      {
                                        kind: 'Directive',
                                        name: { kind: 'Name', value: 'include' },
                                        arguments: [
                                          {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'if' },
                                            value: {
                                              kind: 'Variable',
                                              name: { kind: 'Name', value: 'includeYearSummary' },
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'expenseTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'expenseCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'expenseMaxValue' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'expenseDistinctPayee' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'contributionCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'contributionTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'contributionRefundedTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'hostFeeTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'spentTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'receivedTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    alias: { kind: 'Name', value: 'allTimeSummary' },
                                    name: { kind: 'Name', value: 'summary' },
                                    directives: [
                                      {
                                        kind: 'Directive',
                                        name: { kind: 'Name', value: 'include' },
                                        arguments: [
                                          {
                                            kind: 'Argument',
                                            name: { kind: 'Name', value: 'if' },
                                            value: {
                                              kind: 'Variable',
                                              name: { kind: 'Name', value: 'includeAllTimeSummary' },
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'expenseTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'expenseCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'expenseMaxValue' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        { kind: 'Field', name: { kind: 'Name', value: 'expenseDistinctPayee' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'contributionCount' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'contributionTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'contributionRefundedTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'hostFeeTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'spentTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'receivedTotal' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'expenseMonthlyAverageCount' },
                                          name: { kind: 'Name', value: 'expenseAverageCount' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'MONTH' },
                                            },
                                          ],
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'expenseMonthlyAverageTotal' },
                                          name: { kind: 'Name', value: 'expenseAverageTotal' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'MONTH' },
                                            },
                                          ],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'contributionMonthlyAverageCount' },
                                          name: { kind: 'Name', value: 'contributionAverageCount' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'MONTH' },
                                            },
                                          ],
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'contributionMonthlyAverageTotal' },
                                          name: { kind: 'Name', value: 'contributionAverageTotal' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'MONTH' },
                                            },
                                          ],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'spentTotalMonthlyAverage' },
                                          name: { kind: 'Name', value: 'spentTotalAverage' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'MONTH' },
                                            },
                                          ],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'receivedTotalMonthlyAverage' },
                                          name: { kind: 'Name', value: 'receivedTotalAverage' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'MONTH' },
                                            },
                                          ],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'spentTotalYearlyAverage' },
                                          name: { kind: 'Name', value: 'spentTotalAverage' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'YEAR' },
                                            },
                                          ],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          alias: { kind: 'Name', value: 'receivedTotalYearlyAverage' },
                                          name: { kind: 'Name', value: 'receivedTotalAverage' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'period' },
                                              value: { kind: 'EnumValue', value: 'YEAR' },
                                            },
                                          ],
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'admins' },
                              name: { kind: 'Name', value: 'members' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'role' },
                                  value: { kind: 'ListValue', values: [{ kind: 'EnumValue', value: 'ADMIN' }] },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'account' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                              { kind: 'Field', name: { kind: 'Name', value: 'legalName' } },
                                              {
                                                kind: 'InlineFragment',
                                                typeCondition: {
                                                  kind: 'NamedType',
                                                  name: { kind: 'Name', value: 'Individual' },
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'InlineFragment',
                              typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountWithParent' } },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'parent' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'lastExpenseReceived' },
                              name: { kind: 'Name', value: 'expenses' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'limit' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'direction' },
                                  value: { kind: 'EnumValue', value: 'RECEIVED' },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'field' },
                                        value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                      },
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'direction' },
                                        value: { kind: 'EnumValue', value: 'DESC' },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'firstExpenseReceived' },
                              name: { kind: 'Name', value: 'expenses' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'limit' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'direction' },
                                  value: { kind: 'EnumValue', value: 'RECEIVED' },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'field' },
                                        value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                      },
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'direction' },
                                        value: { kind: 'EnumValue', value: 'ASC' },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'numberOfExpenses' },
                              name: { kind: 'Name', value: 'expenses' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'direction' },
                                  value: { kind: 'EnumValue', value: 'RECEIVED' },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'firstContributionReceived' },
                              name: { kind: 'Name', value: 'orders' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'limit' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'status' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      { kind: 'EnumValue', value: 'PAID' },
                                      { kind: 'EnumValue', value: 'ACTIVE' },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'field' },
                                        value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                      },
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'direction' },
                                        value: { kind: 'EnumValue', value: 'ASC' },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'lastContributionReceived' },
                              name: { kind: 'Name', value: 'orders' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'limit' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'status' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      { kind: 'EnumValue', value: 'PAID' },
                                      { kind: 'EnumValue', value: 'ACTIVE' },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'field' },
                                        value: { kind: 'EnumValue', value: 'CREATED_AT' },
                                      },
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'direction' },
                                        value: { kind: 'EnumValue', value: 'DESC' },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'nodes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } }],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              alias: { kind: 'Name', value: 'numberOfContributions' },
                              name: { kind: 'Name', value: 'orders' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'status' },
                                  value: {
                                    kind: 'ListValue',
                                    values: [
                                      { kind: 'EnumValue', value: 'PAID' },
                                      { kind: 'EnumValue', value: 'ACTIVE' },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'totalCount' } }],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<HostedCollectivesQuery, HostedCollectivesQueryVariables>;

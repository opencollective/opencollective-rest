# Transactions v2

## URL

### Account transactions

All Transactions from a given Account:
`https://rest.opencollective.com/v2/{slug}/transactions.csv`

E.g. https://rest.opencollective.com/v2/babel/transactions.csv

### Host transactions

All Transactions accounted by a given Fiscal Host:
`https://rest.opencollective.com/v2/{slug}/hostTransactions.csv`

E.g. https://rest.opencollective.com/v2/opensource/hostTransactions.csv

### Parameters

- `limit`: default is `1000`, maximum is `10000`
- `offset`: default is `0`
- `type`: `CREDIT` or `DEBIT`
- `kind`: comma separated list of `KIND`s
- `dateFrom`: transactions after UTC date (ISO 8601)
- `dateTo`: transactions before UTC date (ISO 8601)
- `minAmount`: transactions more than the amount (warning, in cents!)
- `maxAmount`: transactions less than the amount (warning, in cents!)
- `includeIncognitoTransactions`: include incognito transactions made by the account (only for authenticated user)
- `includeChildrenTransactions`: include transactions by children of the account (Projects and Events)
- `includeGiftCardTransactions`: include transactions with Gift Cards issued by the account
- `includeRegularTransactions`: include regular transactions of the account (default to true, use to exclude)

### Authentication

Create an Api Key and pass it in the URL parameters as `apiKey`.

You can create new API Keys from the following page: https://opencollective.com/applications

### Tips

- Replace `.csv` with `.txt` to view in plain text in the browser instead of downloading

## Fields

| Name                 | GraphQL v2                       | Description                                               | Included? |
| -------------------- | -------------------------------- | --------------------------------------------------------- | --------- |
| date                 | createdAt                        | UTC date (ISO 8601)                                       |
| datetime             | createdAt                        | UTC date and time with a second precision (ISO 8601)      | Yes       |
| id                   | id                               | unique identifier for the transaction                     |
| shortId              | id                               | first 8 characters of the `id`                            | Yes       |
| legacyId             | legacyId                         | auto-increment identifier for the transaction             |
| group                | group                            | group identifier of the transaction                       |
| shortGroup           | group                            | first 8 characters of the `group`                         | Yes       |
| description          | description                      | human readable description of the transaction             | Yes       |
| type                 | type                             | `CREDIT` or `DEBIT`                                       | Yes       |
| kind                 | kind                             | `CONTRIBUTION`, `ADDED_FUNDS`, `EXPENSE`, etc ...         | Yes       |
| isRefund             | isRefund                         | `REFUND` if it's a refund, empty if not                   | Yes       |
| isRefunded           | isRefunded                       | `REFUNDED` if it was refunded, empty if not               | Yes       |
| displayAmount        | amount                           | user facing amount and currency as a string               | Yes       |
| amount               | amountInHostCurrency.value       | accounted amount                                          | Yes       |
| paymentProcessorFee  | paymentProcessorFee.value        | accounted payment processor fee                           | Yes       |
| netAmount            | netAmountInHostCurrency.value    | accounted amount after payment processor fees             | Yes       |
| currency             | netAmountInHostCurrency.currency | accounted currency                                        | Yes       |
| accountSlug          | account.slug                     | slug of the account on the main side of the transaction   | Yes       |
| accountName          | account.name                     | name of the account on the main side of the transaction   | Yes       |
| accountType          | account.type                     | type of the account on the main side of the transaction   |
| oppositeAccountSlug  | oppositeAccount.slug             | slug of the account on the opposite side                  | Yes       |
| oppositeAccountName  | oppositeAccount.name             | name of the account on the opposite side                  | Yes       |
| oppositeAccountType  | oppositeAccount.type             | type of the account on the opposite side                  |
| hostSlug             | host.slug                        | slug of the host accounting the transaction               |
| oppositeAccountName  | oppositeAccount.name             | name of the host accounting the transaction               |
| oppositeAccountType  | oppositeAccount.type             | type of the host accounting the transaction               |
| orderId              | order.id                         | unique identifier for the order                           |
| orderLegacyId        | order.legacyId                   | auto-increment identifier for the order                   |
| orderFrequency       | order.frequency                  | frequency of the order (`ONETIME`, `MONTHLY` or `YEARLY`) |
| paymentMethodService | paymentMethod.service            | service of the payment method ( `STRIPE`, etc ...)        | Yes       |
| paymentMethodType    | paymentMethod.type               | type of the payment method (`CREDITCARD`, etc ...)        | Yes       |
| expenseId            | expense.id                       | unique identifier for the expense                         |
| expenseLegacyId      | expense.legacyId                 | auto-increment identifier for the expense                 |
| expenseType          | expense.type                     | type of the expense (`INVOICE`, `RECEIPT`, etc ...)       | Yes       |
| payoutMethodType     | payoutMethod.type                | type of the payout method (`PAYPAL`, etc ...)             | Yes       |

### Adding fields

You can add a comma separated list of the fields you want to add with the `add` parameter URL.

E.g. https://rest.opencollective.com/v2/babel/transactions.csv?add=orderId,paymentMethodService,paymentMethodType

### Removing fields

You can add a comma separated list of the fields you want to remove with the `remove` parameter URL.

E.g. https://rest.opencollective.com/v2/babel/transactions.csv?remove=displayAmount,accountSlug

### Setting fields

You can define the exact fields you want to get with a comma separated list, use the `fields` parameter URL.

E.g. https://rest.opencollective.com/v2/babel/transactions.csv?fields=id,type,kind,amount,netAmount,currency

## Values for properties

### Kind

- `CONTRIBUTION`: a financial contribution using the regular Open Collective "contribute flow"
- `ADDED_FUNDS`: an amount added by Fiscal Host admins
- `EXPENSE`: an expense paid using the regular Open Collective "expense flow" or Virtual Cards
- `HOST_FEE`: the host fee charged by the Fiscal Host for a transaction
- `HOST_FEE_SHARE`: the share of host fee going to the platform as part of the revenue share scheme
- `HOST_FEE_SHARE_DEBT`: a debt transaction credited when the host fee share can not been directly taken
- `PLATFORM_TIP`: a voluntary contribution to Open Collective added on top of a regular financial contribution
- `PLATFORM_TIP_DEBT`: a debt transaction credited when the platform tip can not been directly taken
- `PREPAID_PAYMENT_METHOD`: amount re-credited to the account when creating a Prepaid Payment Method
- `PAYMENT_PROCESSOR_COVER`: amount given by Fiscal Hosts to cover payment processor fee on refunds
- `BALANCE_TRANSFER`: a contribution made to the Host or the Parent to empty the balance of an account

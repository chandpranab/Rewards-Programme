export const currencyToNumber = (amount) => Number(amount.replace(/[^0-9.-]+/g, ""));

export const numberToCurrency = (amount) => !isNaN(amount) ? `$${Number(amount).toFixed(2)}` : amount;
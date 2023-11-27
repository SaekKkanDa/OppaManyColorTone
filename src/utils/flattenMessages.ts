interface NestedMessages {
  [key: string]: string | string[] | NestedMessages;
}

const flattenMessages = (nestedMessages: NestedMessages, prefix = '') => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value });
    } else if (Array.isArray(value)) {
      value.forEach((msg, index) => {
        Object.assign(messages, { [`${prefixedKey}.${index}`]: msg });
      });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {} as Record<string, string>);
};

export default flattenMessages;

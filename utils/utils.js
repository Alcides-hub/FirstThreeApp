export function normalizeItemName(item) {
    const name = typeof item.name === 'string' ? item.name : 'defaultName';
    return {
      ...item,
      name: name.toLowerCase(),
    };
  }
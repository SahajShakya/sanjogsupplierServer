export const convertDataType = (data_type: string) => {
  switch (data_type) {
    case 'character varying':
      return 'string';
    case 'integer':
      return 'number';
    case 'date':
      return 'date';
    case 'timestamp':
      return 'timestamp';
    case 'boolean':
      return 'boolean';
    default:
      return 'string';
  }
};

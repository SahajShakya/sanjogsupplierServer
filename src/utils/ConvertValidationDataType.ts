export const ConvertValidationData = (data_type: string) => {
  switch (data_type) {
    case 'character varying':
      return 'string';
    case 'integer':
      return 'number';
    case 'date':
      return 'date';
    default:
      return 'string';
  }
};

export const ConvertTypeData = (data_type: string) => {
  switch (data_type) {
    case 'character varying':
      return 'string';
    case 'integer':
      return 'number';
    case 'date':
      return 'string';
    default:
      return 'string';
  }
};

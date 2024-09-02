export const AppropiateTypes = {
  string: 'https://en.wikipedia.org/wiki/String_(computer_science)',
  integer: 'https://en.wikipedia.org/wiki/Integer',
  float: 'https://en.wikipedia.org/wiki/Floating-point_arithmetic',
  isoDate: 'https://en.wikipedia.org/wiki/ISO_8601',
  uuid: 'https://en.wikipedia.org/wiki/Universally_unique_identifier',
};

export interface RouterValue {
  name: string;
  type: keyof typeof AppropiateTypes | ['Admin', 'User'];
  description: string;
  required?: boolean;
  example: any;
}

export interface RouterSchema {
  route: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'GET';
  description: string;
  level?: 'Admin' | 'User';
  params?: RouterValue[];
  queries?: RouterValue[];
  body?: RouterValue[];
}

type AppropiateType = 'string' | 'number' | 'float' | 'isoDate' | 'uuid';

export interface RouterValue {
  name: string;
  type: AppropiateType | string[];
  description: string;
  required?: boolean;
  example: any;
}

export interface RouterSchema {
  route: string;
  method: 'POST' | 'PUT' | 'DELETE' | 'GET';
  description: string;
  params?: RouterValue[];
  queries?: RouterValue[];
  body?: RouterValue[];
}

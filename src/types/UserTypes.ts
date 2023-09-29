export type AddUserTypes = {
  userName: string,
  email: string,
  password: string
  isActive: boolean
  userTypeId: number
};

export type UserTypes = AddUserTypes & {id: number}

export type UpdateUserTypes = AddUserTypes;

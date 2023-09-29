export type AddClassesProps = {
  name: string,
  isLast: string,
  isActive: boolean
};

export type ClassesProps = AddClassesProps & {id: number}

export type updateClassesProps = AddClassesProps;

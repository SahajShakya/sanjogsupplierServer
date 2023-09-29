export type AddClassesAssignedToProps = {
  userId: number,
  classesId: number
};

export type ClassesAssignedToProps = AddClassesAssignedToProps & {id: number}

export type updateClassesAssignedToProps = AddClassesAssignedToProps;

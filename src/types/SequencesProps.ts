export type AddSequenceProps = {
  title: string,
  type: string,
  isActive: boolean,
  behaviorId: number,

  userId: number,
  createdBy: number,

  overrideRegular: boolean,
  isRitualDisable: boolean,
};

export type NoteProps = AddSequenceProps & {id: number}

export type updateNoteProps = AddSequenceProps;

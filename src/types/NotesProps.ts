export type AddNoteProps = {
  title: string,
  notificationText: string,
  callToActionId: number,
  behaviorId: number,
  noteType: string,
  link: string,
  ordering: number,
  userId: number,
  createdBy: number,
  noteSteps: JSON

};

export type NoteProps = AddNoteProps & {id: number}

export type updateNoteProps = AddNoteProps;

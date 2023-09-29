export type AddSequenceNoteProps = {
  title: string;
  notificationText: string;
  callToActionId: number;
  behaviorId: number;
  userId: number;
  sequenceId: number;
  createdBy: number;
  noteSteps: JSON;
  noteType: string;
  link: string;
  day: number;
  time: any;
};

export type NoteProps = AddSequenceNoteProps & { id: number };

export type updateNoteProps = AddSequenceNoteProps;

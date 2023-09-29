export type ReminderType =
  | "NOTE"
  | "SEQUENCE"
  | "SYSTEM_NOTE"
  | "SYSTEM_SEQUENCE";
export type FREQUENCY =
  | "Daily"
  | "Does not repeat"
  | "Weekly"
  | "Hourly"
  | "Monthly"
  | "Yearly";

export type AddReminderProps = {
  title: string;
  isActive: boolean;
  userId: number;
  createdBy: number;
  noteId: number;
  sequenceId: number;
  reminderType: ReminderType;

  datetime: Date;
  repeat: FREQUENCY;
};

export type NoteProps = AddReminderProps & { id: number };

export type updateNoteProps = AddReminderProps;

export type AddCallsToActionProps = {
  name: string,
  isLast: boolean,
  isActive: boolean
};

export type CallsToActionProps = AddCallsToActionProps & {id: number}

export type updateCallsToActionProps = AddCallsToActionProps;

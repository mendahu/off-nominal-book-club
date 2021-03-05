import { ApiReading } from "../../types/api/apiTypes";

export enum ReadingsActionType {
  LOAD_STATE = "LOAD_STATE",
  ADD_MILESTONE = "ADD_MILESTONE",
  REMOVE_MILESTONE = "REMOVE_MILESTONE",
  UPDATE_MILESTONE = "UPDATE_MILESTONE",
  LEAVE_READING = "LEAVE_READING",
  JOIN_READING = "JOIN_READING",
}

export type ReadingsAction = {
  type: ReadingsActionType;
  payload: {
    state?: ApiReading;
    milestoneId?: string;
    milestoneLabel?: string;
    milestoneDate?: string;
    userId?: string;
  };
};

export const buildDefaultReadingsState = (id: string) => {
  return {
    id,
    host: {},
    book: {
      authors: [],
    },
    milestones: null,
    members: null,
  };
};

export const readingsReducer = (state, action: ReadingsAction) => {
  switch (action.type) {
    case ReadingsActionType.LOAD_STATE:
      return action?.payload?.state || state;
    case ReadingsActionType.ADD_MILESTONE:
    case ReadingsActionType.REMOVE_MILESTONE:
    case ReadingsActionType.UPDATE_MILESTONE:
    case ReadingsActionType.LEAVE_READING:
    case ReadingsActionType.JOIN_READING:
    default:
      return state;
  }
};

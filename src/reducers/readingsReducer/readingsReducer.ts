import { compareAsc } from "date-fns";
import {
  ApiReading,
  ApiReadingMember,
  ApiReadingMilestone,
} from "../../types/api/apiTypes";

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
    milestonePayload?: ApiReadingMilestone;
    joinPayload?: ApiReadingMember;
    milestoneId?: string;
    userId?: string;
  };
};

export const buildDefaultReadingsState = (id: string) => {
  const defaultState: ApiReading = {
    id,
    host: {
      id: null,
      name: null,
      avatar: null,
    },
    book: {
      id: null,
      title: null,
      google_id: null,
      authors: [],
    },
    milestones: null,
    members: null,
  };

  return defaultState;
};

export const readingsReducer = (
  state: ApiReading,
  action: ReadingsAction
): ApiReading => {
  switch (action.type) {
    case ReadingsActionType.LOAD_STATE:
      return action?.payload?.state || state;
    case ReadingsActionType.ADD_MILESTONE: {
      const newMilestones = [...state.milestones];
      newMilestones.push(action.payload.milestonePayload);
      const sortedMilestones = newMilestones.sort((a, b) => {
        return compareAsc(new Date(a.date), new Date(b.date));
      });
      return { ...state, milestones: sortedMilestones };
    }
    case ReadingsActionType.REMOVE_MILESTONE: {
      const newMilestones = state.milestones.filter(
        (milestone) => milestone.id !== action.payload.milestoneId
      );
      return { ...state, milestones: newMilestones };
    }
    case ReadingsActionType.UPDATE_MILESTONE:
    case ReadingsActionType.LEAVE_READING: {
      const newMembers = state.members.filter(
        (member) => member.id !== action.payload.userId
      );
      return { ...state, members: newMembers };
    }
    case ReadingsActionType.JOIN_READING: {
      const newMembers = [...state.members];
      newMembers.push(action.payload.joinPayload);
      return { ...state, members: newMembers };
    }
    default:
      return state;
  }
};
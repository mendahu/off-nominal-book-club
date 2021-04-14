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
  MILESTONE_LOADING = "MILESTONE_LOADING",
  MILESTONE_STOP_LOADING = "MILESTONE_STOP_LOADING",
  UPDATE_MILESTONE = "UPDATE_MILESTONE",
  LEAVE_READING = "LEAVE_READING",
  JOIN_READING = "JOIN_READING",
  UPDATE_READING = "UPDATE_READING",
}

export type ReadingsAction = {
  type: ReadingsActionType;
  payload: {
    description?: string;
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
    description: "",
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
    case ReadingsActionType.MILESTONE_LOADING: {
      const newMilestones = state.milestones.map((milestone) => {
        if (milestone.id === action.payload.milestoneId) {
          const updatedMilestone = {
            ...milestone,
            loading: true,
          };

          return updatedMilestone;
        } else {
          return milestone;
        }
      });
      return { ...state, milestones: newMilestones };
    }
    case ReadingsActionType.MILESTONE_STOP_LOADING: {
      const newMilestones = state.milestones.map((milestone) => {
        if (milestone.id === action.payload.milestoneId) {
          const updatedMilestone = {
            ...milestone,
            loading: false,
          };

          return updatedMilestone;
        } else {
          return milestone;
        }
      });
      return { ...state, milestones: newMilestones };
    }
    case ReadingsActionType.UPDATE_MILESTONE: {
      const newMilestones = state.milestones.map((milestone) => {
        if (milestone.id === action.payload.milestoneId) {
          const updatedMilestone = {
            ...milestone,
            label: action.payload.milestonePayload.label,
            date: action.payload.milestonePayload.date,
            loading: false,
          };

          return updatedMilestone;
        } else {
          return milestone;
        }
      });
      const sortedMilestones = newMilestones.sort((a, b) => {
        return compareAsc(new Date(a.date), new Date(b.date));
      });
      return { ...state, milestones: sortedMilestones };
    }
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
    case ReadingsActionType.UPDATE_READING: {
      return { ...state, description: action.payload.description };
    }
    default:
      return state;
  }
};

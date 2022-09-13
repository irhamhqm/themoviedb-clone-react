import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid4 } from 'uuid';

export type commentType = {
  uuid: string,
  comment: string,
  dateCreated: number,
  user: string
}

type commentState = {
  comments: {
    [movieId: string]: {
      [commentId: string]: commentType
    }
  }
}

const initialState: commentState = {
  comments: {}
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state: commentState, action: PayloadAction<{ movieId: string, comment: string }>) => {
      const commentId = uuid4();
      const { movieId, comment } = action.payload;
      const now = Date.now();
      if (!state.comments[movieId]) {
        state.comments[movieId] = {};
      }
      state.comments[movieId][commentId] = { uuid: comment, comment, dateCreated: now, user: 'User' };
    },
  }
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;

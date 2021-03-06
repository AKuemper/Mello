import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActivitiesByBoardAsync } from '../activities/activitySlice';
import api from '../api/api';

/* ------------------------------- Get lists ------------------------------ */

export const getListsAsync = createAsyncThunk(
  'lists/getListsAsync',
  async (boardId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get(`/lists/board/${boardId}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Create list ------------------------------ */

export const createListAsync = createAsyncThunk(
  'lists/createListAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.post(`/lists/board/${id}`, { title }, config);

      dispatch(getActivitiesByBoardAsync(id));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Edit list ------------------------------ */

export const editListAsync = createAsyncThunk(
  'lists/editListAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const { id, title, boardId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.put(`/lists/${id}`, { title }, config);

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Delete list ------------------------------ */

export const deleteListAsync = createAsyncThunk(
  'lists/deleteListAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const { id, boardId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.delete(
        `/lists/${id}/board/${boardId}`,
        config
      );

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Move list ------------------------------ */

export const moveListAsync = createAsyncThunk(
  'lists/moveListAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { listId, boardId } = params;

      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.put(
        `/lists/${listId}/move`,
        { boardId },
        config
      );

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Copy list ------------------------------ */

export const copyListAsync = createAsyncThunk(
  'lists/copyListAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { listId, boardId, title, cards } = params;

      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.post(
        `/lists/${listId}/copy`,
        { boardId, title, cards },
        config
      );

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Create card ------------------------------ */

export const createCardAsync = createAsyncThunk(
  'cards/createCardAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const boardId = getState().boards.currentBoard._id;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.post(`/cards/list/${id}`, { title }, config);

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Edit card ------------------------------ */

export const editCardAsync = createAsyncThunk(
  'cards/editCardAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const boardId = getState().boards.currentBoard._id;

      const { id, title, description } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.put(
        `/cards/${id}`,
        { title, description },
        config
      );

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Delete card ------------------------------ */

export const deleteCardAsync = createAsyncThunk(
  'cards/deleteCardAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const boardId = getState().boards.currentBoard._id;

      const { id } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.delete(`/cards/${id}`, config);

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Move card ------------------------------ */

export const moveCardAsync = createAsyncThunk(
  'cards/moveCardAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const boardId = getState().boards.currentBoard._id;

      const { id, listId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.put(`/cards/${id}/move`, { listId }, config);

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Copy card ------------------------------ */

export const copyCardAsync = createAsyncThunk(
  'cards/copyCardAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const boardId = getState().boards.currentBoard._id;

      const { id, listId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.post(`/cards/${id}/copy`, { listId }, config);

      dispatch(getActivitiesByBoardAsync(boardId));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Drag and drop card ------------------------------ */

export const dragAndDropCardAsync = createAsyncThunk(
  'cards/dragAndDropCardAsync',
  async (params, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token } = getState().auth;

      const boardId = getState().boards.currentBoard._id;

      const { cards, sourceListId, destinationListId, movedCard } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.put(
        `/cards/${movedCard}/draganddrop`,
        { cards, sourceListId, destinationListId },
        config
      );

      dispatch(getActivitiesByBoardAsync(boardId));

      // Updates database AFTER store is mutated, sets back to default values
      dispatch(
        dragAndDropCard({
          sorted: false,
          cards: [],
          destinationListId: null,
          sourceListId: null,
          movedCard: null,
        })
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'lists',
  initialState: {
    loading: false,
    currentLists: {},
    currentList: {},
    dnd: {
      sorted: false,
      cards: [],
      destinationListId: null,
      sourceListId: null,
      movedCard: null,
    },
  },
  reducers: {
    currentList: (state, action) => {
      state.currentList = action.payload;
    },
    clearCurrentList: (state, action) => {
      state.currentList = {};
    },
    clearCurrentLists: (state, action) => {
      state.currentLists = {};
    },
    dragAndDropCard: (state, action) => {
      const {
        cardId,
        destinationListId,
        destinationIndex,
        sourceIndex,
        sourceListId,
        sorted,
        movedCard,
      } = action.payload;

      const card = state.currentLists[sourceListId].cards.find(
        (card) => card._id === cardId
      );
      state.currentLists[sourceListId].cards.splice(sourceIndex - 1, 1);
      state.currentLists[destinationListId].cards.splice(
        destinationIndex - 1,
        0,
        card
      );

      state.currentLists[sourceListId].cards.forEach((card, i) => {
        card.index = i + 1;
      });

      state.currentLists[destinationListId].cards.forEach((card, i) => {
        card.index = i + 1;
      });

      const cards = state.currentLists[destinationListId].cards;

      state.dnd.sorted = sorted;
      state.dnd.cards = cards;
      state.dnd.destinationListId = destinationListId;
      state.dnd.sourceListId = sourceListId;
      state.dnd.movedCard = movedCard;
    },

    resetListsSlice: () => this.initialState,
  },
  extraReducers: {
    // Get lists
    [getListsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const normalizedLists = {};
      action.payload.forEach((list) => {
        normalizedLists[list._id] = list;
      });
      state.currentLists = normalizedLists;
      delete state.errors;
    },
    [getListsAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getListsAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Create list
    [createListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload._id] = { ...action.payload, cards: [] };
      state.newList = action.payload;
      delete state.errors;
    },
    [createListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Edit list
    [editListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload._id] = action.payload;
      state.editedList = action.payload;
      delete state.errors;
    },
    [editListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [editListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Delete list
    [deleteListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      delete state.currentLists[action.payload._id];
      delete state.currentList[action.payload._id];
      delete state.errors;
    },
    [deleteListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [deleteListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Move list
    [moveListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      delete state.currentLists[action.payload._id];
      delete state.errors;
    },
    [moveListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [moveListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Copy list
    [copyListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.copiedList = action.payload;
      delete state.errors;
    },
    [copyListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [copyListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Create card
    [createCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const listId = action.payload.list;
      state.currentLists[listId].cards.push(action.payload);
      delete state.errors;
    },
    [createCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Edit card
    [editCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const cardId = action.payload._id;
      const editedCardIndex = state.currentList.cards.findIndex(
        (card) => card._id === cardId
      );
      state.currentLists[action.payload.list].cards[editedCardIndex] =
        action.payload;
      state.currentList.cards[editedCardIndex] = action.payload;
      delete state.errors;
    },
    [editCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [editCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Delete card
    [deleteCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const { listId, cards } = action.payload;
      state.currentLists[listId].cards = cards;
      state.currentList.cards = cards;
      delete state.errors;
    },
    [deleteCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [deleteCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Move card
    [moveCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const movedCardIndex = state.currentList.cards.findIndex(
        (card) => card._id === action.payload.card._id
      );
      state.currentLists[action.payload.oldList].cards.splice(
        movedCardIndex,
        1
      );
      state.currentList.cards.splice(action.payload.card.index - 1, 1);
      state.currentLists[action.payload.card.list].cards.splice(
        action.payload.card.index - 1,
        0,
        action.payload.card
      );
      delete state.errors;
    },
    [moveCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [moveCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Copy card
    [copyCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload.list].cards.push(action.payload);
      delete state.errors;
    },
    [copyCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [copyCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Drag and drop card
    [dragAndDropCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      delete state.errors;
    },
    [dragAndDropCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [dragAndDropCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const {
  currentList,
  clearCurrentList,
  clearCurrentLists,
  dragAndDropCard,
  resetListsSlice,
} = slice.actions;

export default slice.reducer;

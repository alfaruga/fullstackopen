const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.payload];

    case "PLUS_ONE_LIKE": {
      const blogId = action.payload.id;
      const blogToEdit = state.find((b) => b.id === id);
      blogId.likes += 1;
      return state.map((b) => (b.id !== id ? b : blogToEdit));
    }

    default:
      return state;
  }
};

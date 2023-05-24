const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.payload];

    case "PLUS_ONE_LIKE": {
      const blogId = action.id;
      const blogToEdit = state.find((b) => b.id === id);
      blogId.likes += 1;
      return state.map((b) => (b.id !== id ? b : blogToEdit));
    }
    case "DELETE":
      const blogId = action.payload.id;
      const newState = state.filter((b) => b.id === blogId);
    default:
      return newState;
  }
};

export const createBlog = (content) => {
  return { type: "NEW_BLOG", payload: { ...content } };
};

export const likesHandler = (id) => {
  return { type: "PLUS_ONE_LIKE", payload: { id } };
};

export const deleteHandler = (id) => {
  return { type: "DELETE", payload: { id } };
};

export default blogReducer;

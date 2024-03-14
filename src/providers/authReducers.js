export const initialState = {
  isAuthenticated: false,
  userId: "",
  username: "",
  avatar: "https://cdn-icons-png.freepik.com/64/10100/10100101.png",
  error: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case "authenticate":
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        isAuthenticated: true,
      };
    case "logout":
      return initialState;
    case "rejected":
      return { ...state, error: action.payload.error };
    case "removeError":
      return { ...state, error: "" };
    default:
      throw new Error("Unknown action type");
  }
}

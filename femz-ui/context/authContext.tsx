import { createContext, useReducer } from "react";
import { decode } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

const initialAuthContext = {
  user: null,
};

const localUserToken = localStorage.getItem("user-token");

if (localUserToken) {
  const decodedToken: any = jwtDecode(localUserToken);

  const expDate = decodedToken.exp * 1000;

  if (expDate < Date.now()) {
    localStorage.removeItem("user-token");
  } else {
    initialAuthContext.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: any) => {},
  logout: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialAuthContext);

  function login(userData: any) {
    localStorage.setItem("user-token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("user-token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };

class Authentication {
    static isAuthenticated = false;

    static signIn = (callback: () => void) => {
      Authentication.isAuthenticated = true;
      setTimeout(callback(), 200); // some async action representation
    };

    static signOut = (callback: () => void) => {
      Authentication.isAuthenticated = false;
      setTimeout(callback(), 200); // some async action representation
    };
}

export default Authentication;

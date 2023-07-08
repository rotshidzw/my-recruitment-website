// Function to handle user authentication
const authenticateUser = async (email, password) => {
    try {
      // Make a POST request to the user login API endpoint
      const response = await api.post('/', { email, password });

      // Extract the authentication token from the response
      const { token } = response.data;

      // Store the token in local storage or cookies for future API requests
      // You can use libraries like localStorage or cookies to handle this

      // Return the token or any other relevant authentication data
      return token;
    } catch (error) {
      // Handle any errors during authentication
      console.error(error);
      throw new Error('Authentication failed');
    }
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    // Check if the authentication token is present in local storage or cookies
    // You can use libraries like localStorage or cookies to handle this
    // Return true if the token exists, indicating that the user is authenticated, otherwise return false

    return !!localStorage.getItem('token'); // Example using localStorage, adjust based on your implementation
  };

  export { authenticateUser, isAuthenticated };

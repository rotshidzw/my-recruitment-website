// Function to detect the user's country
const detectCountry = async () => {
    try {
      // Make a request to a geolocation API to retrieve the user's country
      const response = await axios.get('https://geolocation-api.com/json/');

      // Extract the country from the response data
      const { country } = response.data;

      // Return the detected country
      return country;
    } catch (error) {
      // Handle any errors during country detection
      console.error(error);
      throw new Error('Country detection failed');
    }
  };

  export default detectCountry;

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token'); // Retrieve the token from cookies

      // Redirect to login page if token is not found
      if (!token) {
        router.push('/login'); // Replace '/login' with your login page route
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import axios from 'axios';
import { useEffect } from 'react';

const Index = ({ token, csrf }) => {
  const tokenFromCookie = Cookies.get();

  // if any situation to fetch csrf on FE side
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get('/api/csrf-token');
  //     console.log('CSRF', data);
  //   };
  //   getCsrfToken();
  // }, []);

  console.log(csrf);

  // not getting token because http only cookie not accessible on client. only get csrf token which is not http only
  console.log('getTokenFromFE', tokenFromCookie);
  console.log('tokenFromProps', token);

  return (
    <>
      <h1 className='jumbotron text-center bg-primary square'>
        This is Next Js Authentication
      </h1>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.token || null;
  const req = context.req;
  const tokenOtherWay = req.cookies.token || null;

  // we need to pass token in headers. because cookie not accessible on server side.
  const client = new ApolloClient({
    uri: 'http://example.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // const { data } = await client.query({
  //   query: gql`
  //     query {
  //       // your query here
  //     }
  //   `,
  // });

  const response = await fetch('http://localhost:3000/api/csrf-token');
  const csrf = await response.json();

  console.log('getTokenUsingLibrary', token);
  console.log('getTokenWithoutLibrary', tokenOtherWay);

  return {
    props: {
      token,
      csrf,
    },
  };
}

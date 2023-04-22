import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const Index = ({ token }) => {
  const tokenFromCookie = Cookies.get();

  console.log(tokenFromCookie);
  console.log('token', token);
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

  console.log(token);
  console.log('tokenOtherWay', tokenOtherWay);

  return {
    props: {
      token,
    },
  };
}

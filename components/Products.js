import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 4rem;
  margin: 4rem 0;
`;

const PageHeader = styled.header`
  margin-bottom: 6rem;
  text-align: center;
  h1 {
    font-size: 5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, var(--black), var(--red));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 1.8rem;
    color: var(--grey);
    max-width: 600px;
    margin: 0 auto;
  }
`;

export default function Products({ page = 1 }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <PageHeader>
        <h1>Featured Collection</h1>
        <p>Discover our curated selection of vintage-inspired essentials, crafted for timeless style and modern comfort.</p>
      </PageHeader>
      <ProductsListStyles>
        {data?.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}

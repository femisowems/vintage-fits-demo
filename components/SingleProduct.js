import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/FormatMoney';
import AddToCart from './AddToCart';

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 600px;
  max-width: var(--maxWidth);
  gap: 5rem;
  margin: 4rem auto;
  align-items: center;
  background: white;
  padding: 4rem;
  box-shadow: var(--bs);
  border-radius: 8px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .image-container {
    width: 100%;
    height: 600px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    img {
      object-fit: cover;
    }
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    .breadcrumb {
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--grey);
      margin-bottom: 2rem;
      display: block;
      &:hover {
        color: var(--red);
      }
    }

    h2 {
      font-size: 4.5rem;
      font-weight: 900;
      margin: 0;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: -2px;
    }

    .price {
      font-size: 3rem;
      font-weight: 700;
      color: var(--red);
      margin: 2rem 0;
    }

    p {
      font-size: 1.8rem;
      line-height: 2;
      color: var(--grey);
      margin-bottom: 4rem;
    }

    .actions {
      display: flex;
      gap: 2rem;
      @media (max-width: 1000px) {
        justify-content: center;
      }
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
      user {
        id
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  
  const { Product } = data;
  
  return (
    <ProductStyles>
      <Head>
        <title>Vin Fits | {Product.name}</title>
      </Head>
      <div className="image-container">
        <Image
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.photo.altText}
          layout="fill"
        />
      </div>
      <div className="details">
        <Link href="/products" className="breadcrumb">← Back to Shop</Link>
        <h2>{Product.name}</h2>
        <div className="price">{formatMoney(Product.price)}</div>
        <p>{Product.description}</p>
        <div className="actions">
          <AddToCart id={Product.id} />
        </div>
      </div>
    </ProductStyles>
  );
}

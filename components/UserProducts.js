import styled from 'styled-components';
import Link from 'next/link';
import { useUser } from './User';
import formatMoney from '../lib/FormatMoney';

const UserProductsStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  h3 {
    font-size: 2.5rem;
    border-bottom: 2px solid var(--red);
    display: inline-block;
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }
  .item {
    background: white;
    border: 1px solid var(--offWhite);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    box-shadow: var(--bs);
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.02);
    }
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }
    .details {
      flex: 1;
      h4 {
        margin: 0;
        font-size: 1.8rem;
      }
      p {
        margin: 0;
        font-size: 1.4rem;
        color: var(--grey);
      }
    }
    .price {
      font-weight: 600;
      color: var(--red);
      font-size: 1.6rem;
    }
  }
  .empty {
    padding: 4rem;
    background: white;
    border: 1px dashed var(--grey);
    text-align: center;
    color: var(--grey);
  }
`;

export default function UserProducts() {
  const me = useUser();
  if (!me) return null;

  const products = me.products || [];

  return (
    <UserProductsStyles>
      <h3>Your Active Listings</h3>
      {products.length === 0 ? (
        <div className="empty">
          <p>You haven't listed any products yet.</p>
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="item">
            <img
              src={product.photo?.image?.publicUrlTransformed}
              alt={product.name}
            />
            <div className="details">
              <h4>{product.name}</h4>
              <p>{product.description?.substring(0, 50)}...</p>
            </div>
            <div className="price">{formatMoney(product.price)}</div>
          </div>
        ))
      )}
    </UserProductsStyles>
  );
}

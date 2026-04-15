import Head from 'next/head';
import styled from 'styled-components';
import { useUser } from '../components/User';
import CartItem from '../components/CartItem';
import formatMoney from '../lib/FormatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import Link from 'next/link';
import Checkout from '../components/Checkout';

const CartPageStyles = styled.div`
  padding: 2rem;
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  margin-top: 4rem;
  
  h2 {
    border-bottom: 5px solid var(--black);
    display: inline-block;
    padding: 0 1rem;
    margin-bottom: 4rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .summary {
    border-top: 10px double var(--black);
    margin-top: 4rem;
    padding-top: 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4rem;

    p {
      font-size: 3rem;
      font-weight: 900;
      margin: 0;
    }

    button {
      background: var(--red);
      color: white;
      font-weight: 500;
      border: 0;
      border-radius: 0;
      text-transform: uppercase;
      font-size: 2rem;
      padding: 1rem 2rem;
      transform: skew(-2deg);
      display: inline-block;
      transition: all 0.5s;
      cursor: pointer;
      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      &:hover {
        background: black;
      }
    }
  }

  .empty-state {
    padding: 10rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    svg {
      width: 100px;
      height: 100px;
      color: var(--lightGray);
    }

    p {
      font-size: 2rem;
    }
  }
`;

export default function CartPage() {
  const me = useUser();
  if (!me) return <p>Please sign in to view your cart.</p>;

  const cartItems = me.cart || [];
  const hasItems = cartItems.length > 0;

  return (
    <CartPageStyles>
      <Head>
        <title>Your Cart | Vin Fits</title>
      </Head>
      <h2>Shopping Cart</h2>
      {!hasItems && (
        <div className="empty-state">
           <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
           <p>Your cart is currently empty.</p>
           <Link href="/products">Go shopping →</Link>
        </div>
      )}
      {hasItems && (
        <>
          <ul>
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>
          <div className="summary">
            <p>Total: {formatMoney(calcTotalPrice(cartItems))}</p>
            <Checkout />
          </div>
        </>
      )}
    </CartPageStyles>
  );
}

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import Image from 'next/image';
import ErrorMessage from '../components/ErrorMessage';
import formatMoney from '../lib/FormatMoney';
import OrderCardStyles from '../components/styles/OrderCardStyles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders(sortBy: createdAt_DESC) {
      id
      charge
      total
      createdAt
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 4rem;
  padding: 0;
  margin-top: 4rem;
`;

function countItemsInOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} completed orders</h2>
      {allOrders.length === 0 && (
        <div style={{ padding: '4rem', background: 'white', border: '1px solid var(--lightGray)', textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ fontSize: '2rem' }}>You haven't placed any orders yet!</p>
          <Link href="/products">Shop for products →</Link>
        </div>
      )}
      <OrderUl>
        {allOrders.map((order) => (
          <OrderCardStyles key={order.id}>
            <div className="order-header">
              <span className="order-id">Order ID: {order.id.split('-')[0]}...</span>
              <span>{order.createdAt ? formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true }) : 'Recently'}</span>
            </div>
            <div className="order-summary">
              <div>
                <span className="label">Items</span>
                <span className="value">{countItemsInOrder(order)}</span>
              </div>
              <div>
                <span className="label">Products</span>
                <span className="value">{order.items.length}</span>
              </div>
              <div>
                <span className="label">Total</span>
                <span className="value">{formatMoney(order.total)}</span>
              </div>
            </div>
            <div className="images">
              {order.items.map((item) => (
                <div key={`image-${item.id}`} className="image-container">
                  <Image
                    src={item.photo?.image?.publicUrlTransformed}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
            <Link href={`/order/${order.id}`}>
              <div className="view-link">View Order Details →</div>
            </Link>
          </OrderCardStyles>
        ))}
      </OrderUl>
    </div>
  );
}
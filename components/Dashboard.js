import styled from 'styled-components';
import Link from 'next/link';
import { useUser } from './User';

const DashboardStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
`;

const DashCard = styled.div`
  background: white;
  border: 1px solid var(--lightGray);
  box-shadow: var(--bs);
  padding: 3rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: var(--black);
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 2.5rem;
    font-family: 'Outfit', sans-serif;
    color: var(--black);
  }

  p {
    font-size: 1.6rem;
    color: var(--grey);
    line-height: 1.6;
  }

  .stat {
    font-size: 4rem;
    font-weight: 700;
    color: var(--black);
    margin: 1rem 0;
  }

  .link {
    margin-top: auto;
    font-weight: 600;
    text-decoration: underline;
    color: var(--black);
    display: inline-block;
    padding-top: 1.5rem;
    cursor: pointer;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--black);

  .avatar {
    width: 60px;
    height: 60px;
    background: var(--black);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 3.5rem;
    margin: 0;
    font-family: 'Outfit', sans-serif;
  }
`;

export default function Dashboard() {
  const user = useUser();

  if (!user) return null;

  const orderCount = user.orders?.length || 0;
  const cartItemCount = user.cart?.length || 0;

  return (
    <div>
      <ProfileHeader>
        <div className="avatar">{user.name[0].toUpperCase()}</div>
        <h2>{user.name}’s Dashboard</h2>
      </ProfileHeader>

      <DashboardStyles>
        <DashCard>
          <h3>Orders</h3>
          <p>View your purchase history and track active shipments.</p>
          <div className="stat">{orderCount}</div>
          <Link href="/orders">
            <span className="link">View All Orders →</span>
          </Link>
        </DashCard>

        <DashCard>
          <h3>My Cart</h3>
          <p>You have items waiting in your cart. Ready to checkout?</p>
          <div className="stat">{cartItemCount}</div>
          <Link href="/cart">
            <span className="link">Go to Checkout →</span>
          </Link>
        </DashCard>

        <DashCard>
          <h3>Account Settings</h3>
          <p>Manage your email preferences and security settings.</p>
          <div className="stat">Active</div>
          <div className="link">Update Profile →</div>
        </DashCard>
      </DashboardStyles>
    </div>
  );
}

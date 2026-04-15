import styled from 'styled-components';
import Link from 'next/link';
import SignIn from '../components/SignIn';
import { useUser } from '../components/User';

const SignedInStyles = styled.div`
  padding: 4rem;
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  text-align: center;
  margin-top: 4rem;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    border-bottom: 5px solid var(--black);
    display: inline-block;
    padding: 0 1rem;
  }
  
  p {
    font-size: 1.8rem;
    color: var(--grey);
    margin-bottom: 3rem;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 2rem;
    
    a {
      background: var(--red);
      color: white;
      padding: 1rem 2rem;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 1.5rem;
      transform: skew(-2deg);
      transition: all 0.5s;
      &:hover {
        background: black;
      }
    }
    
    .secondary {
      background: var(--lightGray);
      color: var(--black);
      &:hover {
        background: var(--grey);
        color: white;
      }
    }
  }
`;

export default function SignInPage() {
  const user = useUser();
  
  if (user) {
    return (
      <SignedInStyles>
        <h2>Welcome back, {user.name}!</h2>
        <p>You are already signed into your account.</p>
        <div className="actions">
          <Link href="/products">Shop Products</Link>
          <Link href="/account" className="secondary">View My Profile</Link>
        </div>
      </SignedInStyles>
    );
  }
  
  return (
    <div>
      <SignIn />
    </div>
  );
}

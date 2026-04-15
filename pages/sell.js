import styled from 'styled-components';
import CreateProduct from '../components/CreateProduct';
import UserProducts from '../components/UserProducts';

const SellPageStyles = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 4rem;
  align-items: start;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  .form-section {
    position: sticky;
    top: 2rem;
    h2 {
      font-size: 3rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -1px;
      margin-bottom: 2rem;
    }
  }
`;

export default function SellPage() {
  return (
    <SellPageStyles>
      <div className="form-section">
        <h2>List a New Item</h2>
        <CreateProduct />
      </div>
      <UserProducts />
    </SellPageStyles>
  );
}

import styled from 'styled-components';

const OrderCardStyles = styled.li`
  box-shadow: var(--bs);
  list-style: none;
  padding: 0;
  border: 1px solid var(--lightGray);
  border-radius: 12px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    border-color: var(--black);
  }

  .order-header {
    background: var(--black);
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Outfit', sans-serif;

    span {
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      opacity: 0.8;
    }

    .order-id {
      font-weight: 700;
      font-size: 1.4rem;
    }
  }

  .order-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    padding: 2rem;
    background: #fafafa;
    border-bottom: 1px solid var(--lightGray);
    text-align: center;

    .label {
      display: block;
      font-size: 1.1rem;
      text-transform: uppercase;
      color: var(--grey);
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .value {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--black);
    }
  }

  .images {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    padding: 2rem;

    .image-container {
      width: 100%;
      height: 80px;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid #eee;
    }
  }

  .view-link {
    display: block;
    padding: 1.5rem;
    text-align: center;
    background: white;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--black);
    border-top: 1px solid #efefef;
    cursor: pointer;

    &:hover {
      background: #fdfdfd;
      color: var(--red);
    }
  }
`;

export default OrderCardStyles;

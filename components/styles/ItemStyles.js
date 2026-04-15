import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  border-radius: 8px;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.08);
    }
  }

  .image-container {
    overflow: hidden;
    height: 400px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  p {
    line-height: 1.8;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
    color: var(--grey);
  }

  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightGray);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: var(--lightGray);
    & > * {
      background: white;
      border: 0;
      font-size: 1.2rem;
      padding: 1.5rem;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      &:hover {
        background: var(--lightGray);
      }
    }
  }
`;

export default Item;

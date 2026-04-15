import Link from 'next/link';
import Image from 'next/image';
import formatMoney from '../lib/FormatMoney';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';

import AddToCart from './AddToCart';
import { useUser } from './User';

export default function Product({ product }) {
  const me = useUser();
  return (
    <ItemStyles>
      <div className="image-container">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product?.photo?.image?.publicUrlTransformed}
            alt={product.name}
            width={600}
            height={600}
          />
        </Link>
      </div>

      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        {me && (
          <>
            <Link
              href={{
                pathname: '/update',
                query: {
                  id: product.id,
                },
              }}
            >
              Edit ✏️
            </Link>
            <AddToCart id={product.id} />
          </>
        )}
        {me && me.id === product.user?.id && (
          <button type="button">Delete ❌</button>
        )}
      </div>
    </ItemStyles>
  );
}

import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Product_Component = ({ product, onClick, cartQuantity }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (cartQuantity > 0) {
            setQuantity(cartQuantity);
        }
    }, [cartQuantity]);

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAdd = () => {
        onClick({ ...product, quantity });
    };

    const handleGoToCart = () => {
        navigate('/cart');
    };

    const isInCart = cartQuantity > 0;

    return (
        <div className="product-item">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <Rating value={product.rating} precision={0.1} readOnly />
            <p>{product.price} грн</p>

            <div className='block-add-to-cart'>
                <div className='block-quantity'>
                    <Button
                        size="small"
                        onClick={decrease}
                        disabled={isInCart}
                        sx={{ minWidth: 32 }}
                    >
                        −
                    </Button>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        disabled={isInCart}
                        onChange={(e) =>
                            setQuantity(Math.max(1, Number(e.target.value)))
                        }
                        style={{
                            width: 40,
                            textAlign: 'center',
                            border: 'none',
                            outline: 'none'
                        }}
                    />

                    <Button
                        size="small"
                        onClick={increase}
                        disabled={isInCart}
                        sx={{ minWidth: 32 }}
                    >
                        +
                    </Button>
                </div>

                {isInCart ? (
                    <Button
                        variant="contained"
                        onClick={handleGoToCart}
                        sx={{ backgroundColor: '#157e2f', '&:hover': { backgroundColor: '#116727' } }}>
                        В корзині ({cartQuantity})
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#ff5722', '&:hover': { backgroundColor: '#ae3712' } }}
                        onClick={handleAdd}
                    >
                        Додати в корзину
                    </Button>
                )}
            </div>
        </div>
    );
};

export default memo(Product_Component);

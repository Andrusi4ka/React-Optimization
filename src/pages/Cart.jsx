import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import emptyCartImg from '../assets/cart_is_empty.png';
import success from '../assets/success.png';
import Cart_Component from '../components/Cart_Component';
import { useMemo, useState } from "react";

const Cart = ({ items, onRemoveItem, onIncrease, onDecrease, onClearCart }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    const formattedTotal = useMemo(
        () =>
            new Intl.NumberFormat('uk-UA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(totalPrice),
        [totalPrice]
    );

    const handleClearWithSuccess = () => {
        onClearCart();
        setShowSuccess(true);
    };

    if (items.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, gap: 2 }}>
                <Box
                    component="img"
                    src={showSuccess ? success : emptyCartImg}
                    alt="Cart state"
                    sx={{ maxWidth: 300, width: '100%' }}
                />
                <Box sx={{ fontSize: 18, color: '#777' }}>
                    {showSuccess ? 'Дякуємо за покупку!' : 'Корзина порожня'}
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <h1>Корзина</h1>

            {items.map((item, index) => (
                <Cart_Component
                    key={item.id}
                    index={index}
                    item={item}
                    onRemove={onRemoveItem}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, pt: 2, fontWeight: 600 }}>
                <Box>Кількість товарів: {totalCount}</Box>
                <Box>Загальна сума: {formattedTotal} грн</Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={onClearCart}
                >
                    Очистити все
                </Button>

                <Button
                    color="success"
                    variant="contained"
                    onClick={handleClearWithSuccess}
                >
                    Завершити покупку
                </Button>
            </Box>
        </Box>
    );
};

export default Cart;

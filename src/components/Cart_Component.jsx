import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { memo } from 'react';

const Cart_Component = ({ index, item, onRemove, onIncrease, onDecrease }) => {
    console.log('Render Cart item:', item.id);
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2, borderBottom: '1px solid #ddd' }}>
            <Box sx={{ width: 30, textAlign: 'center', fontWeight: 600 }}>
                {index + 1}.
            </Box>

            <Box
                component="img"
                src={item.thumbnail}
                alt={item.title}
                sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
            />

            <Box sx={{ flex: 2 }}>{item.title}</Box>
            <Box sx={{ flex: 1 }}>{item.price} грн</Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity === 1}
                >
                    −
                </Button>

                <Box sx={{ minWidth: 24, textAlign: 'center' }}>
                    {item.quantity}
                </Box>

                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onIncrease(item.id)}
                >
                    +
                </Button>
            </Box>

            <Button
                color="error"
                variant="outlined"
                onClick={() => onRemove(item.id)}
            >
                Видалити
            </Button>
        </Box>
    );
};

export default memo(Cart_Component);

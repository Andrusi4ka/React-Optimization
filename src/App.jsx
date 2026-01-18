import { useReducer, useEffect, useCallback } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function App() {

  const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'add-to-cart': {
        const existingItem = state.items.find(
          item => item.id === action.payload.id
        );

        if (existingItem) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                : item
            )
          };
        }

        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload, quantity: action.payload.quantity || 1 }
          ]
        };
      }

      case 'remove-item': {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        };
      }

      case 'clear-cart': {
        return {
          ...state,
          items: []
        };
      }

      case 'decrease-quantity': {
        return {
          ...state,
          items: state.items
            .map(item =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)
        };
      }

      case 'increase-quantity': {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  const handleAddToCart = useCallback((product) => {
    dispatch({ type: 'add-to-cart', payload: product });
  }, []);

  const handleRemoveItem = useCallback((id) => {
    dispatch({ type: 'remove-item', payload: id });
  }, []);

  const handleIncrease = useCallback((id) => {
    dispatch({ type: 'increase-quantity', payload: id });
  }, []);

  const handleDecrease = useCallback((id) => {
    dispatch({ type: 'decrease-quantity', payload: id });
  }, []);

  const handleClearCart = () => {
    dispatch({ type: 'clear-cart' });
  };

  const totalItemsCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Box sx={{ backgroundColor: '#FF5722', color: '#fff', boxShadow: '0 0 10px #686868' }}>
        <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 2, py: 2, display: 'flex', gap: 2 }}>
          <Button component={NavLink} to="/" color="inherit">Головна</Button>
          <Button component={NavLink} to="/cart" color="inherit">
            Корзина{totalItemsCount > 0 && ` (${totalItemsCount})`}
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: 2, py: 3 }}>
        <Routes>
          <Route path="/" element={<Home onAddProduct={handleAddToCart} cartItems={state.items} />} />
          <Route
            path="/cart"
            element={
              <Cart
                items={state.items}
                onRemoveItem={handleRemoveItem}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onClearCart={handleClearCart} />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;

import { useState, useEffect, useRef, useMemo } from "react";
import Product_Component from "../components/Product_Component";

const Home = ({ onAddProduct, cartItems }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProducts(data.products);
    };

    getAllProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const getCartQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <h1>Головна</h1>
      <input className="input-search"
        name="search"
        ref={inputRef}
        type="text"
        placeholder="Пошук товару..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="all-products">
        {filteredProducts.map(product => (
          <Product_Component
            key={product.id}
            product={product}
            onClick={onAddProduct}
            cartQuantity={getCartQuantity(product.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

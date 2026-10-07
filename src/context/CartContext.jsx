import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState(null); 

  // Cart-e item add kora (product & variant shoh)
  const addToCart = (product, selectedVariant, qty = 1) => {
    const variantToUse = selectedVariant ||
      product.variants?.[0] || {
        id: product.id,
        title: product.name,
        price: product.price,
      };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.variantId === variantToUse.id,
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      return [
        ...prevItems,
        {
          productId: product.id,
          variantId: variantToUse.id,
          name: product.name,
          variantTitle: variantToUse.title,
          price: variantToUse.price,
          image: product.image,
          quantity: qty,
        },
      ];
    });
  };

  // Quantity barano/komano
  const updateQuantity = (variantId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.variantId === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  // Item remove kora
  const removeFromCart = (variantId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.variantId !== variantId),
    );
  };

  // Cart clear kora
  const clearCart = () => setCartItems([]);

  // Total Item count & Total Price calculation
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Order Complete Handler (Order ID গ্রহণ করা এবং Modal ওপেন করা)
  const triggerOrderSuccess = (newOrderId = null) => {
    if (newOrderId) {
      setOrderId(newOrderId);
    }
    setIsCartOpen(false);
    setShowSuccessModal(true);
    clearCart();

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 7000); // Modal দেখার সুবিধার্থে সময় একটু বাড়িয়ে ৭ সেকেন্ড করা হলো
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItemsCount,
        subtotal,
        showSuccessModal,
        setShowSuccessModal,
        orderId,
        triggerOrderSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
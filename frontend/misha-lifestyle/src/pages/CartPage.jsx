import Header from "../components/layout/Header";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQty } = useCart();

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-medium mb-8">Your Cart</h1>

        {cart.length === 0 && (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        <div className="space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b pb-6"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-24 h-32 sm:h-24 object-cover"
              />

              {/* Product Info */}
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.price}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.qty - 1))
                    }
                    className="border w-8 h-8 flex items-center justify-center"
                  >
                    −
                  </button>

                  <span className="text-sm">{item.qty}</span>

                  <button
                    onClick={() =>
                      updateQty(item.id, item.qty + 1)
                    }
                    className="border w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm underline self-start sm:self-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CartPage;

import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = localStorage.getItem("maisha_wishlist");
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    // Update local storage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem("maisha_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            // Check if already in wishlist
            if (prev.find((item) => item.id === product.id)) {
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

import shopInfo from "./constants/shop"
import { useState } from "react";


function Shop() {
    const [shopItems, setShopItems] = useState(shopInfo);
    const [isVisible, setVisibility] = useState(true);
    const [inputValue, setInputValue] = useState('')

    const handleAddingItems = (id) => {
        let newShopItems = shopItems.map(item => {
            if (id === item.id) {
                item.selectedCount++;
            }
            return item;
        });
        setShopItems(newShopItems);
    };

    const handleDecrement = (id) => {
        let newShopItems = shopItems.map(item => {
            if (id === item.id) {
                if (item.selectedCount >= 1) {
                    item.selectedCount--;
                }
            }
            return item;
        });
        setShopItems(newShopItems);
    };

    const emptyCart = () => {
        let newShopItems = shopItems.map(item => {
            item.selectedCount = 0
            return item
        })
        setShopItems(newShopItems)
    };

    const closeCart = () => {
        setVisibility(false);
    };

    const handleCartAppear = () => {
        setVisibility(true);
    };



    const getTotalPrice = () => {
        let totalPrice = 0;
        shopItems.forEach(item => {
            totalPrice += item.selectedCount * item.price

        })
        return totalPrice
    }

    const handleSorting = () => {
        const sortResults = shopInfo.sort((a,b) => a.price > b.price ? 1 : -1)
        setShopItems(sortResults)
    }
    const handleSearching = () => {
        const searchResults = shopInfo.filter(item => item.itemName.toLowerCase().includes(inputValue.toLowerCase()))
        setShopItems(searchResults)
        setInputValue('')
    }

    return (
        <>
            <h2 className='shopHeader'>JUVENTUS UNOFFICIAL ONLINE STORE</h2>
            <img className='juveLogo' src="https://store.juventus.com/pics/layout/logo-j.svg" alt="Juventus Logo" />
            <select className='handlingSorting' name="Sort" id="">
                <option value="Sort">Sort</option>
                <option onClick={() => handleSorting()} value="Price">Price</option>
                <option value="Size">Size</option>
                <option value="Name">Name</option>
            </select>
            <div>
                <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='searchBar' placeholder='Search...' type="text"/>
                <button onClick={() => handleSearching()} className='searchButton'>Search</button>
            </div>
            <div className="shop-images">
                {shopItems.map(item => (
                    <div  key={item.id} className="imageContainer">
                        <img
                            className='images'
                            src={item.imgUrl}
                            alt="shop-items"
                        />
                        <img
                            className='adidas'
                            src={item.adidas}
                            alt="Adidas Logo" />
                        <div className='itemName'>
                            {item.itemName}
                        </div>
                        <div className='price'>
                            {`Price: €${item.price}`}
                        </div>
                        <div className={item.availability ? 'InStock' : 'OutStock'}>
                            {item.availability ? 'In Stock' : 'Out of Stock'}
                        </div>
                        <div>{item.buy} {item.selectedCount}
                            <button className="button" disabled={!item.availability} onClick={() => handleDecrement(item.id)}>-</button>
                            <button className="button" disabled={!item.availability} onClick={() => handleAddingItems(item.id)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            {isVisible && (
                <div className='cart'>
                    {shopItems.find(item => item.selectedCount > 0) ? (
                        <>
                            <div className="cartItems">
                                You have chosen:
                                {shopItems.filter(item => item.selectedCount > 0).map(item => (
                                    <div key={item.id}>{item.itemName}: <p className='itemsInCart'>{item.selectedCount} items: €{item.price * item.selectedCount}</p> </div>
                                ))}
                            </div>
                            <div className='totalPrice'>
                                Total Price: ${getTotalPrice()}
                            </div>

                            <button className='finishShopping'>✔️</button>
                            <button className='emptyCart' onClick={emptyCart}>🗑️</button>
                        </>
                    ) : (
                        'Your cart is empty 🛒'
                    )}
                    <button onClick={closeCart} className='closeCart'>-</button>
                </div>
            )}
            <button onClick={handleCartAppear} className='cartAppear'>🛒</button>
        </>
    );
}

export default Shop;

import React, { useState, useEffect } from 'react';

// --- MOCK PRODUCT DATA ---
// In a real application, this would come from a backend API.
const products = [
    // Branding
    {
        productId: 'brand_shirt_001',
        name: 'Custom Crewneck T-Shirt',
        category: 'Branding',
        subcategory: 'Shirts',
        imageUrl: '/images/branded-shirt-001.jpg',
        price: 25.00,
        description_short: 'High-quality custom cotton t-shirt.',
        description: 'Our custom crewneck t-shirts are made from 100% premium cotton, offering both comfort and durability. Perfect for company branding, events, or personal style. Use our high-quality screen printing or DTG for vibrant, long-lasting designs.',
        attributes: {
            material: ['100% Cotton', 'Polyester Blend', 'Tri-Blend'],
            size: ['S', 'M', 'L', 'XL', 'XXL'],
            color: ['White', 'Black', 'Navy Blue', 'Red', 'Heather Grey'],
            printMethod: ['Screen Print', 'Embroidery', 'DTG'],
            designPlacement: ['Front Center', 'Back Center', 'Left Chest', 'Right Sleeve'],
        }
    },
    {
        productId: 'brand_hoodie_001',
        name: 'Custom Pullover Hoodie',
        category: 'Branding',
        subcategory: 'Hoods',
        imageUrl: '/images/brand-hoodie-001.jpg',
        price: 45.00,
        description_short: 'Warm and comfortable custom hoodie.',
        description: 'Stay warm and stylish with our custom pullover hoodies. Made from a soft cotton-poly blend, they are perfect for showcasing your brand during colder months. Available with high-quality embroidery or screen printing.',
        attributes: {
            material: ['Cotton/Poly Blend', 'Fleece'],
            size: ['S', 'M', 'L', 'XL', 'XXL'],
            color: ['Black', 'Charcoal', 'Maroon'],
            printMethod: ['Embroidery', 'Screen Print'],
            designPlacement: ['Front Center', 'Back Center', 'Left Chest'],
        }
    },
    {
        productId: 'brand_mug_001',
        name: 'Ceramic Coffee Mug',
        category: 'Branding',
        subcategory: 'Mugs',
        imageUrl: '/images/brand-mug-001.jpg',
        price: 15.00,
        description_short: 'Durable 11oz ceramic mug.',
        description: 'A classic 11oz ceramic mug, perfect for promotional giveaways or corporate gifts. Your logo or design will be printed with sublimation for a vibrant, dishwasher-safe finish.',
        attributes: {
            size: ['11oz', '15oz'],
            color: ['White', 'Black (logo only)'],
            printMethod: ['Sublimation'],
            designPlacement: ['Full Wrap', 'One Side'],
        }
    },
    {
        productId: 'brand_cap_001',
        name: 'Classic Baseball Cap',
        category: 'Branding',
        subcategory: 'Caps',
        imageUrl: '/images/branded-cap-001.jpg',
        price: 20.00,
        description_short: 'Embroidered baseball cap.',
        description: 'Our classic baseball caps are a great way to show off your brand. Made from durable cotton twill with an adjustable strap, they are perfect for teams, companies, and events. Embroidery provides a premium, textured look.',
         attributes: {
            material: ['Cotton Twill', 'Mesh Back'],
            color: ['Black', 'Navy', 'Khaki', 'White'],
            printMethod: ['Embroidery'],
            designPlacement: ['Front', 'Back'],
        }
    },
    // Graphic and Design
    {
        productId: 'graphic_logo_001',
        name: 'Custom Logo Design',
        category: 'Graphic and Design',
        subcategory: 'Designed from Scratch',
        imageUrl: 'https://placehold.co/600x600/4A5568/E2E8F0?text=Logo+Design',
        price: 150.00,
        description_short: 'Professional logo design service.',
        description: 'Get a unique, professional logo designed from scratch by our expert designers. We work with you to create a visual identity that represents your brand perfectly. Includes multiple concepts and revisions.',
        attributes: {
            designType: ['Logo Design'],
            complexityLevel: ['Basic', 'Standard', 'Premium'],
            fileFormatsProvided: ['JPG, PNG, SVG, AI'],
            revisionLimit: ['2 Rounds', '4 Rounds', 'Unlimited'],
            turnaroundTime: ['5-7 Business Days', '3-5 Business Days', '2-3 Business Days'],
        }
    },
    {
        productId: 'graphic_own_001',
        name: 'Print Your Own Graphic',
        category: 'Graphic and Design',
        subcategory: 'Own Graphics',
        imageUrl: 'https://placehold.co/600x600/4A5568/E2E8F0?text=Your+Graphic',
        price: 10.00,
        description_short: 'We print your provided design.',
        description: 'Have a design ready to go? We can print it for you on a variety of materials. This service is for customers who can provide print-ready artwork. Price is a base setup fee; final cost depends on the printed product.',
        attributes: {
            uploadRequirement: ['Vector file preferred (AI, EPS, SVG)', 'High-resolution (300 DPI) PNG/JPG'],
        }
    },
    // Printing
    {
        productId: 'print_wedding_001',
        name: 'Elegant Wedding Invitation',
        category: 'Printing',
        subcategory: 'Wedding & Invitation',
        imageUrl: 'https://placehold.co/600x600/E2E8F0/4A5568?text=Invitation',
        price: 1.20,
        description_short: 'Premium cardstock with custom text.',
        description: 'Set the tone for your special day with our elegant wedding invitations. Printed on premium, heavy cardstock with a variety of finishes available. Fully customizable with your details.',
        attributes: {
            paperType: ['Matte Cardstock', 'Glossy Cardstock', 'Linen Texture'],
            finish: ['Uncoated', 'UV Coated', 'Foil Stamping'],
            quantityOptions: ['50', '100', '150', '200', '250+'],
            dimensions: ['5x7 inches', 'A5'],
            doubleSided: [true, false],
            customTextInputs: ['Names', 'Date & Time', 'Venue Address', 'RSVP Details'],
        }
    },
    {
        productId: 'print_eulogy_001',
        name: 'Funeral Program (Eulogy)',
        category: 'Printing',
        subcategory: 'Eulogy',
        imageUrl: 'https://placehold.co/600x600/E2E8F0/4A5568?text=Eulogy',
        price: 2.50,
        description_short: 'A respectful tribute for a loved one.',
        description: 'Create a beautiful and respectful funeral program to honor the memory of a loved one. Our high-quality printing ensures a dignified tribute. We handle your order with care and sensitivity.',
        attributes: {
            paperType: ['Premium Paper', 'Light Cardstock'],
            size: ['A4 folded to A5', 'US Letter folded'],
            quantityOptions: ['25', '50', '100', '150+'],
            photoUploadOption: [true],
            customTextInputs: ['Full Name', 'Dates of Life', 'Order of Service', 'Obituary'],
        }
    },
    {
        productId: 'print_bizcard_001',
        name: 'Professional Business Cards',
        category: 'Printing',
        subcategory: 'Business Cards',
        imageUrl: 'https://placehold.co/600x600/E2E8F0/4A5568?text=Business+Card',
        price: 0.50,
        description_short: 'Make a great first impression.',
        description: 'High-quality business cards that make you stand out. Choose from a wide range of paper types, finishes, and design options to create a card that truly represents your brand.',
        attributes: {
            paperType: ['Standard Matte', 'Premium Glossy', 'Recycled Paper', 'Linen'],
            finish: ['Uncoated', 'Spot UV', 'Embossed', 'Soft Touch Lamination'],
            quantityOptions: ['100', '250', '500', '1000'],
            dimensions: ['3.5x2 inches (Standard US)', '85x55 mm (Standard EU)'],
            doubleSided: [true, false],
        }
    },
];

// --- UTILITY FUNCTIONS ---

/**
 * Gets a specified number of random items from a given array.
 * @param {Array} arr - The array to pick from.
 * @param {number} num - The number of random items to return.
 * @returns {Array} An array of random items.
 */
const getRandomItems = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};


// --- REACT COMPONENTS ---

/**
 * Header Component
 * Displays the logo, navigation, and cart icon.
 * @param {Object} props - Component props.
 * @param {Function} props.setView - Function to change the current view.
 * @param {number} props.cartItemCount - Number of items in the cart.
 */
const Header = ({ setView, cartItemCount }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div 
                    className="text-2xl font-bold text-gray-800 cursor-pointer"
                    onClick={() => setView({ name: 'home' })}
                >
                    <img src="images/company-logo.jpg" alt="Logo" className='w-40 h-25'/>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#" className="text-gray-600 hover:text-blue-600" onClick={() => setView({ name: 'category', category: 'Branding' })}>Branding</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600" onClick={() => setView({ name: 'category', category: 'Graphic and Design' })}>Graphic & Design</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600" onClick={() => setView({ name: 'category', category: 'Printing' })}>Printing</a>
                </div>

                {/* Cart Icon */}
                <div className="flex items-center">
                    <button onClick={() => setView({ name: 'cart' })} className="relative text-gray-600 hover:text-blue-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItemCount > 0 && (
                             <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{cartItemCount}</span>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
};

/**
 * Product Card Component
 * A reusable card to display product summary.
 * @param {Object} props - Component props.
 * @param {Object} props.product - The product object to display.
 * @param {Function} props.setView - Function to change the current view.
 */
const ProductCard = ({ product, setView }) => {
    return (
        <div 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer group"
            onClick={() => setView({ name: 'product', productId: product.productId })}
        >
            <div className="relative h-64">
                <img className="absolute h-full w-full object-cover" src={product.imageUrl} alt={product.name} />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1 truncate">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description_short}</p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                    <span className="text-sm font-medium text-white bg-blue-600 py-1 px-3 rounded-full group-hover:bg-blue-700 transition-colors">
                        View Details
                    </span>
                </div>
            </div>
        </div>
    );
};

/**
 * Home Page Component
 * Displays a hero section and random products from each category.
 * @param {Object} props - Component props.
 * @param {Function} props.setView - Function to change the current view.
 */
const HomePage = ({ setView }) => {
    // Select one random product from each main category
    const brandingProducts = products.filter(p => p.category === 'Branding');
    const graphicProducts = products.filter(p => p.category === 'Graphic and Design');
    const printingProducts = products.filter(p => p.category === 'Printing');

    const randomProducts = [
        ...getRandomItems(brandingProducts, 1),
        ...getRandomItems(graphicProducts, 1),
        ...getRandomItems(printingProducts, 1),
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-blue-600 text-white">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">Your Vision, Branded & Printed</h1>
                    <p className="mt-4 text-lg md:text-xl text-blue-200">From custom apparel to professional printing, we bring your ideas to life.</p>
                    <button 
                        onClick={() => setView({ name: 'category', category: 'All' })}
                        className="mt-8 bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition-colors"
                    >
                        Browse All Products
                    </button>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {randomProducts.map(product => (
                            <ProductCard key={product.productId} product={product} setView={setView} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

/**
 * Category Page Component
 * Displays all products within a specific category or all products.
 * @param {Object} props - Component props.
 * @param {string} props.category - The category to display.
 * @param {Function} props.setView - Function to change the current view.
 */
const CategoryPage = ({ category, setView }) => {
    const productsToShow = category === 'All' 
        ? products 
        : products.filter(p => p.category === category);
    
    // Create subcategory groups
    const subcategories = productsToShow.reduce((acc, product) => {
        (acc[product.subcategory] = acc[product.subcategory] || []).push(product);
        return acc;
    }, {});


    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{category}</h1>
            <p className="text-gray-600 mb-10">Browse our wide selection of {category.toLowerCase()} services.</p>
            
            {Object.entries(subcategories).map(([subcategoryName, subcategoryProducts]) => (
                <div key={subcategoryName} className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-200 pb-2 mb-6">{subcategoryName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {subcategoryProducts.map(product => (
                            <ProductCard key={product.productId} product={product} setView={setView} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * Product Page Component
 * Displays detailed information for a single product and handles customization.
 * @param {Object} props - Component props.
 * @param {string} props.productId - The ID of the product to display.
 * @param {Function} props.addToCart - Function to add an item to the cart.
 */
const ProductPage = ({ productId, addToCart }) => {
    const product = products.find(p => p.productId === productId);
    
    // State to hold user's customization choices
    const [customizations, setCustomizations] = useState({});
    const [quantity, setQuantity] = useState(1);
    
    // Initialize customization state when product loads
    useEffect(() => {
        const initialCustomizations = {};
        if (product && product.attributes) {
            Object.keys(product.attributes).forEach(attrKey => {
                 if (attrKey === 'customTextInputs') {
                    initialCustomizations[attrKey] = {};
                 } else if (Array.isArray(product.attributes[attrKey])) {
                    initialCustomizations[attrKey] = product.attributes[attrKey][0];
                 }
            });
        }
        setCustomizations(initialCustomizations);
    }, [product]);

    // Handler for changing a customization option
    const handleCustomizationChange = (attribute, value) => {
        setCustomizations(prev => ({ ...prev, [attribute]: value }));
    };
    
    const handleTextChange = (field, value) => {
        setCustomizations(prev => ({
            ...prev,
            customTextInputs: {
                ...prev.customTextInputs,
                [field]: value
            }
        }));
    };

    if (!product) {
        return <div className="text-center py-20">Product not found!</div>;
    }

    const handleAddToCart = () => {
        // Create a unique ID for the cart item based on product and customizations
        const cartItemId = `${product.productId}-${JSON.stringify(customizations)}`;
        const itemToAdd = {
            ...product,
            quantity,
            customizations,
            cartItemId // Add unique ID to the item
        };
        addToCart(itemToAdd);
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Product Image Gallery */}
                <div>
                    <img className="w-full rounded-lg shadow-lg" src={product.imageUrl} alt={product.name} />
                </div>

                {/* Product Details & Customization */}
                <div className="p-4">
                    {/* FIX: Replaced '>' with {' > '} to be valid JSX */}
                    <p className="text-sm font-semibold text-blue-600">{product.category} {'>'} {product.subcategory}</p>
                    <h1 className="text-4xl font-bold text-gray-800 mt-2">{product.name}</h1>
                    <p className="text-3xl font-light text-gray-900 mt-4">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>
                    
                    {/* Customization Options */}
                    <div className="mt-8 space-y-6">
                        {product.attributes && Object.entries(product.attributes).map(([key, value]) => {
                            if (key === 'customTextInputs') {
                                return (
                                    <div key={key}>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                                        {value.map(field => (
                                            <div key={field} className="mb-2">
                                                 <label className="block text-sm font-medium text-gray-600 mb-1">{field}</label>
                                                 <input 
                                                    type="text"
                                                    onChange={(e) => handleTextChange(field, e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                 />
                                            </div>
                                        ))}
                                    </div>
                                );
                            }
                            if(key === 'photoUploadOption' || key === 'uploadRequirement') {
                                return (
                                    <div key={key}>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                                         <p className="text-sm text-gray-500 mb-2">{Array.isArray(value) ? value.join(', ') : value}</p>
                                         <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                    </div>
                                )
                            }
                            return(
                                <div key={key}>
                                    <label className="block text-lg font-semibold text-gray-700 capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</label>
                                    <select 
                                        value={customizations[key]}
                                        onChange={(e) => handleCustomizationChange(key, e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {Array.isArray(value) && value.map(option => (
                                            <option key={option.toString()} value={option.toString()}>{option.toString()}</option>
                                        ))}
                                    </select>
                                </div>
                            )
                        })}
                    </div>

                     {/* Quantity and Add to Cart */}
                    <div className="mt-8 flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold">-</button>
                            <span className="px-4 py-2">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-bold">+</button>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            className="flex-grow bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

/**
 * Cart Page Component
 * Displays items in the cart and handles checkout via WhatsApp.
 * @param {Object} props - Component props.
 * @param {Array} props.cartItems - Array of items in the cart.
 * @param {Function} props.updateQuantity - Function to update an item's quantity.
 * @param {Function} props.removeFromCart - Function to remove an item from the cart.
 */
const CartPage = ({ cartItems, updateQuantity, removeFromCart }) => {
    const whatsAppNumber = "15551234567"; // IMPORTANT: Replace with your WhatsApp number in international format

    const handleCheckout = () => {
        let message = "Hello! I would like to place an order for the following items:\n\n";

        cartItems.forEach(item => {
            message += `*Product:* ${item.name}\n`;
            message += `*Quantity:* ${item.quantity}\n`;
            message += `*Price:* $${item.price.toFixed(2)} each\n`;

            if(item.customizations) {
                message += "*Customizations:*\n";
                Object.entries(item.customizations).forEach(([key, value]) => {
                    if (key === 'customTextInputs' && typeof value === 'object') {
                       Object.entries(value).forEach(([field, text]) => {
                           if(text) message += ` - ${field}: ${text}\n`;
                       })
                    } else if (value) {
                       const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                       message += ` - ${formattedKey}: ${value}\n`;
                    }
                });
            }
            message += "----------\n\n";
        });
        
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `*Subtotal:* $${subtotal.toFixed(2)}\n\n`;
        message += "Please let me know the next steps. Thank you!";
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container mx-auto px-6 py-12 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 py-10">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map(item => (
                            <div key={item.cartItemId} className="flex bg-white p-4 rounded-lg shadow items-start">
                                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex-grow ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {item.customizations && Object.entries(item.customizations).map(([key, value]) => {
                                             if (key === 'customTextInputs' && typeof value === 'object') {
                                               return Object.entries(value).map(([field, text]) => 
                                                 text ? <p key={field}>{field}: {text}</p> : null
                                               );
                                             }
                                             if (typeof value !== 'object' && value) {
                                                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                                return <p key={key}>{formattedKey}: {value}</p>;
                                             }
                                             return null;
                                        })}
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-gray-200 rounded">
                                            <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-3 py-1">-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-3 py-1">+</button>
                                        </div>
                                        <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-400 hover:text-red-500 ml-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow h-fit">
                        <h2 className="text-2xl font-semibold border-b pb-4">Order Summary</h2>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="font-semibold">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-600">Shipping & Taxes</p>
                            <p className="text-sm">Calculated at next step</p>
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between items-center">
                            <p className="text-lg font-bold">Total</p>
                            <p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
                        </div>
                        <button 
                            onClick={handleCheckout} 
                            className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-10.8-94-31.5l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-22.7-36.5-34.9-79.2-34.9-123.1 0-108.4 88.1-196.5 196.5-196.5 54.2 0 104.5 21.1 142.8 59.5 38.2 38.3 59.5 88.7 59.5 142.9 0 108.5-88.1 196.5-196.6 196.5zm88.3-154.2c-4.4-2.2-26.2-12.9-30.3-14.3-4.1-1.4-7.1-2.2-10.1 2.2-3 4.4-11.4 14.3-14 17.3-2.6 3-5.2 3.3-9.6 1.1-4.4-2.2-18.6-6.8-35.4-21.8-13.1-11.7-21.9-26.2-24.5-30.8-2.6-4.6-.3-7.1 2-9.2 2-1.8 4.4-4.7 6.6-7 2.2-2.3 2.9-3.9 4.4-6.5 1.5-2.6.7-4.9-1-7-1.1-2.2-10.1-24.3-13.8-33.2-3.6-8.8-7.3-7.5-10.1-7.7-2.6-.2-5.6-.2-8.6-.2-3 0-7.8 1.1-11.9 5.6-4.1 4.4-15.5 15.1-15.5 36.8 0 21.7 15.9 42.6 18.1 45.6 2.2 3 31.1 47.2 75.4 66.5 10.5 4.6 18.7 7.4 25.2 9.5 11.2 3.6 21.4 3 29.5 1.8 8.8-1.2 26.2-10.8 29.9-21.3 3.7-10.5 3.7-19.5 2.6-21.3-1.1-1.8-4.1-2.9-8.6-5.1z"/></svg>
                             <span>Checkout via WhatsApp</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


/**
 * Footer Component
 */
const Footer = ({ setView }) => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-10">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     <div>
                        <h3 className="text-lg font-bold mb-4">Jonel's Printing</h3>
                        <p className="text-gray-400">Your vision, branded and printed with quality and care.</p>
                     </div>
                     <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li><a href="#" onClick={() => setView({ name: 'home' })} className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="#" onClick={() => setView({ name: 'category', category: 'All' })} className="text-gray-400 hover:text-white">All Products</a></li>
                        </ul>
                     </div>
                     <div>
                        <h3 className="text-lg font-bold mb-4">Categories</h3>
                        <ul>
                            <li><a href="#" onClick={() => setView({ name: 'category', category: 'Branding' })} className="text-gray-400 hover:text-white">Branding</a></li>
                            <li><a href="#" onClick={() => setView({ name: 'category', category: 'Graphic and Design' })} className="text-gray-400 hover:text-white">Graphic & Design</a></li>
                            <li><a href="#" onClick={() => setView({ name: 'category', category: 'Printing' })} className="text-gray-400 hover:text-white">Printing</a></li>
                        </ul>
                     </div>
                      <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <p className="text-gray-400">123 Print Street, Nairobi</p>
                        <p className="text-gray-400">contact@jonels.com</p>
                     </div>
                 </div>
                 <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; 2025 Jonel's Printing & Branding. All rights reserved.</p>
                 </div>
            </div>
        </footer>
    );
};


// --- Main App Component ---
export default function App() {
    // State for managing the current view (page) of the application
    const [view, setView] = useState({ name: 'home' }); // e.g., { name: 'product', productId: 'abc' }
    
    // State for the shopping cart items
    const [cartItems, setCartItems] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    // Load cart from localStorage on initial render
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('shoppingCart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Could not parse cart from localStorage:", error);
            setCartItems([]);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add an item to the cart
    const addToCart = (itemToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.cartItemId === itemToAdd.cartItemId);
            if (existingItem) {
                // If item with same customizations exists, update its quantity
                return prevItems.map(item =>
                    item.cartItemId === itemToAdd.cartItemId
                        ? { ...item, quantity: item.quantity + itemToAdd.quantity }
                        : item
                );
            } else {
                // Otherwise, add as a new item
                return [...prevItems, itemToAdd];
            }
        });
        
        // Show notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    // Function to update the quantity of a cart item
    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(cartItemId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };
    
    // Function to remove an item from the cart
    const removeFromCart = (cartItemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    };

    // Function to render the correct page based on the 'view' state
    const renderView = () => {
        switch (view.name) {
            case 'home':
                return <HomePage setView={setView} />;
            case 'category':
                return <CategoryPage category={view.category} setView={setView} />;
            case 'product':
                return <ProductPage productId={view.productId} addToCart={addToCart} />;
            case 'cart':
                return <CartPage cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />;
            default:
                return <HomePage setView={setView} />;
        }
    };
    
    const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-white font-sans">
            <Header setView={setView} cartItemCount={cartItemCount} />
            <main>
                {renderView()}
            </main>
            <Footer setView={setView}/>
            
            {/* "Added to Cart" Notification */}
            {showNotification && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg animate-bounce">
                    Item added to cart!
                </div>
            )}
        </div>
    );
}

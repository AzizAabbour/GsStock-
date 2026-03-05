import { useState, useEffect } from 'react';

export const useStock = () => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('gsstoke_products');
        if (saved) return JSON.parse(saved);
        return [
            {
                name: "Premium Analog Watch",
                reference: "WCH-001",
                image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=400&auto=format&fit=crop",
                quantity: 12
            },
            {
                name: "Wireless Headphones",
                reference: "HDP-002",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
                quantity: 8
            },
            {
                name: "Mechanical Keyboard",
                reference: "KBD-003",
                image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&auto=format&fit=crop",
                quantity: 0
            }
        ];
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('gsstoke_history');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('gsstoke_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('gsstoke_history', JSON.stringify(history));
    }, [history]);

    const addProduct = (product) => {
        // S'assurer que la référence est unique
        if (products.find(p => p.reference === product.reference)) {
            throw new Error('La référence du produit doit être unique');
        }
        setProducts([...products, { ...product, quantity: parseInt(product.quantity) || 0 }]);
    };

    const updateStock = (reference, amount, type, location) => {
        setProducts(prev => prev.map(p => {
            if (p.reference === reference) {
                const newQty = type === 'in' ? p.quantity + amount : p.quantity - amount;
                if (newQty < 0) throw new Error('Stock insuffisant');

                // Ajouter à l'historique
                setHistory(h => [{
                    id: Date.now(),
                    reference,
                    name: p.name,
                    amount,
                    type,
                    location: location || 'Non spécifié',
                    date: new Date().toISOString()
                }, ...h]);

                return { ...p, quantity: newQty };
            }
            return p;
        }));
    };

    const deleteProduct = (reference) => {
        setProducts(prev => prev.filter(p => p.reference !== reference));
    };

    const getDailyStats = () => {
        const today = new Date().toISOString().split('T')[0];
        const todaysMovements = history.filter(h => h.date.startsWith(today));

        return {
            entries: todaysMovements.filter(m => m.type === 'in').reduce((acc, m) => acc + m.amount, 0),
            exits: todaysMovements.filter(m => m.type === 'out').reduce((acc, m) => acc + m.amount, 0)
        };
    };

    return {
        products,
        history,
        addProduct,
        updateStock,
        deleteProduct,
        getDailyStats
    };
};

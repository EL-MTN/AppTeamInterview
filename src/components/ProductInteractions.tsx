'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCartContext } from '@/context/CartContext';

interface ProductInteractionsProps {
	plantId: number;
	plantName: string;
	plantImage: string;
	price?: number;
}

export default function ProductInteractions({ 
	plantId, 
	plantName, 
	plantImage, 
	price = 350 
}: ProductInteractionsProps) {
	const { addToCart } = useCartContext();
	const [selectedSize, setSelectedSize] = useState('S');
	const [quantity, setQuantity] = useState(1);
	const [isAdding, setIsAdding] = useState(false);

	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

	const handleAddToCart = async () => {
		setIsAdding(true);
		addToCart({
			id: plantId,
			name: plantName,
			image: plantImage,
			price: price,
			size: selectedSize,
		}, quantity);
		
		// Reset quantity after adding to cart
		setQuantity(1);
		
		// Brief loading state for visual feedback
		setTimeout(() => {
			setIsAdding(false);
		}, 500);
	};

	return (
		<>
			{/* Size Selection */}

			<h3 className="text-gray-500 mb-2">Size</h3>
			<div className="flex gap-2">
				{['S', 'M', 'L'].map((size) => (
					<button
						key={size}
						onClick={() => setSelectedSize(size)}
						className={`px-4 py-2 border-1 ${
							selectedSize === size
								? ' border-black bg-primary text-white'
								: ' '
						}`}
					>
						{size}
					</button>
				))}
			</div>

			{/* Add to Cart and Quantity */}
			<div className="mb-2">
				<div className="flex items-end gap-4">
					{/* Add to Cart */}
					<button 
						onClick={handleAddToCart}
						disabled={isAdding}
						className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
					>
						{isAdding ? 'ADDING...' : 'ADD TO CART'}
					</button>

					{/* Quantity Section */}
					<div className="flex flex-col">
						<h3 className="text-gray-500 mb-2">Quantity</h3>
						<div className="flex items-center py-3 border-1 border-black rounded-xl">
							<button
								onClick={decrementQuantity}
								className="px-2"
							>
								<Minus className="w-4 h-4" />
							</button>
							<span className="font-medium min-w-[2.5rem] text-center">
								{quantity}
							</span>
							<button
								onClick={incrementQuantity}
								className="px-2"
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

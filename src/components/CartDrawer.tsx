'use client';

import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCartContext } from '@/context/CartContext';

export default function CartDrawer() {
	const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } =
		useCartContext();

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-[#333E34CC] transition-opacity duration-300 ${
					isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsCartOpen(false)}
			/>

			{/* Drawer */}
			<div className={`fixed right-0 top-0 h-full w-[800px] bg-white z-50 shadow-2xl flex flex-col border-l-2 border-gray-300 transform transition-transform duration-300 ease-out ${
				isCartOpen ? 'translate-x-0' : 'translate-x-full'
			}`}>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-xl font-semibold">My Cart</h2>
					<button
						onClick={() => setIsCartOpen(false)}
						className="p-1 hover:bg-gray-100 rounded"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Cart Items */}
				<div className="flex-1 overflow-y-auto p-4">
					{cart.items.length === 0 ? (
						<div className="text-center text-gray-500 mt-8">
							Your cart is empty
						</div>
					) : (
						<div className="space-y-4">
							{cart.items.map((item) => (
								<div
									key={`${item.id}-${item.size}`}
									className="flex gap-4 p-4 rounded-lg"
								>
									{/* Product Image */}
									<div className="w-40 h-30 flex-shrink-0">
										<Image
											src={item.image}
											alt={item.name}
											width={160}
											height={120}
											className="w-full h-full object-cover rounded"
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.src =
													'https://via.placeholder.com/160x120?text=Plant';
											}}
										/>
									</div>

									{/* Product Info */}
									<div className="flex-1 flex flex-col">
										<div className="flex justify-between items-start mb-2">
											<div>
												<h3 className="font-poppins text-xl font-medium">
													{item.name}
												</h3>
												<p className="text-lg text-gray-700">{item.size}</p>
											</div>
											<p className="font-semibold text-lg">${item.price}</p>
										</div>

										<div className="flex justify-between items-end mt-auto">
											{/* Quantity Controls */}
											<div className="flex flex-col">
												<span className="text-sm text-gray-500 mb-1">
													Quantity
												</span>
												<div className="flex items-center border rounded-xl">
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																item.size,
																item.quantity - 1
															)
														}
														className="px-4"
													>
														<Minus className="w-4 h-4" />
													</button>
													<span className="p-1 text-sm text-center">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															updateQuantity(
																item.id,
																item.size,
																item.quantity + 1
															)
														}
														className="px-4"
													>
														<Plus className="w-4 h-4" />
													</button>
												</div>
											</div>

											{/* Remove Button */}
											<button
												onClick={() => removeFromCart(item.id, item.size)}
												className="p-2 hover:bg-gray-500 rounded"
											>
												<Trash2 className="w-5 h-5" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{cart.items.length > 0 && (
					<div className="border-t p-4">
						<div className="flex justify-between items-center mb-4">
							<span className="text-lg text-gray-500">Subtotal</span>
							<span className="text-lg font-semibold">
								${cart.total.toFixed(2)}
							</span>
						</div>
						<button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
							CHECKOUT
						</button>
					</div>
				)}
			</div>
		</>
	);
}

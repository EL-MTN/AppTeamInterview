'use client';

import { Handbag, Search } from 'lucide-react';
import { useCartContext } from '@/context/CartContext';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
	const { cart, setIsCartOpen } = useCartContext();
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	// Debounced search effect
	useEffect(() => {
		// Clear any existing timer
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}

		// Set up new timer for debounced search
		if (searchQuery.trim()) {
			debounceTimer.current = setTimeout(() => {
				router.push(
					`/products?search=${encodeURIComponent(searchQuery.trim())}`
				);
			}, 500);
		}

		// Cleanup function
		return () => {
			if (debounceTimer.current) {
				clearTimeout(debounceTimer.current);
			}
		};
	}, [searchQuery, router]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		// Clear any pending debounce timer
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}
		// Navigate immediately on form submit
		if (searchQuery.trim()) {
			router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<div>
			{/* HEADER */}
			<div className="p-2 bg-primary font-sans flex items-center justify-end text-white relative">
				<div className="font-semibold absolute left-1/2 transform -translate-x-1/2">
					FREE SHIPPING ON ALL FULL SUN PLANTS! FEB. 25–28.
				</div>
				<div className="flex gap-4 mr-8">
					<div className="font-normal">USD</div>
					<div className="font-bold">Support</div>
				</div>
			</div>
			{/* NAV */}
			<div className="p-4 font-sans flex items-center justify-between shadow-lg relative">
				<div className="font-poppins text-xl font-semibold ml-4">
					<span className="text-primary">Green</span>&nbsp;Thumb
				</div>
				<div className="absolute left-1/2 transform -translate-x-1/2 flex gap-16">
					<Link href="/">Home</Link>
					<Link href="/products">Product</Link>
					<Link href="/about">About Us</Link>
					<Link href="/contact">Contact Us</Link>
				</div>
				<div className="flex mr-4 gap-4 items-center">
					<form
						onSubmit={handleSearch}
						className="flex items-center rounded"
					>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search"
							className="bg-transparent px-3 py-1 text-sm w-48 focus:outline-none"
							style={{ textAlign: 'right' }}
						/>
						<button type="submit" className="px-2 py-1 rounded-r">
							<Search />
						</button>
					</form>
					<div className="h-8 w-px bg-secondary"></div>
					<button
						className="flex items-center gap-2 cursor-pointer"
						onClick={() => setIsCartOpen(true)}
					>
						<Handbag />
						<span>{cart.itemCount}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

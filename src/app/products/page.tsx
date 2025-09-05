'use client';

import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import PlantCard from '@/components/PlantCard';
import PlantGridSkeleton from '@/components/PlantGridSkeleton';
import PaginationControls from '@/components/PaginationControls';
import { useEffect, useState } from 'react';

interface Plant {
	id: number;
	common_name: string;
	genus: string;
	default_image: {
		regular_url: string;
	};
}

export default function Home() {
	const [plants, setPlants] = useState<Plant[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalPlants, setTotalPlants] = useState(0);
	const [loading, setLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState('');

	useEffect(() => {
		const fetchPlants = async () => {
			setLoading(true);
			try {
				const orderParam = sortOrder ? `&order=${sortOrder}` : '';
				const response = await fetch(
					`/api/plants?page=${currentPage}&per_page=9${orderParam}`
				);
				if (!response.ok) {
					throw new Error('Failed to fetch plants');
				}
				const data = await response.json();

				setPlants(data.data);
				setTotalPages(data.last_page);
				setTotalPlants(data.total);
			} catch (error) {
				console.error('Error fetching plants:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPlants();
	}, [currentPage, sortOrder]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortOrder(event.target.value);
		setCurrentPage(1); // Reset to first page when sorting changes
	};

	const startIndex = (currentPage - 1) * 9 + 1;
	const endIndex = Math.min(currentPage * 9, totalPlants);

	return (
		<div>
			<Hero title="Shop" blurb="Find the perfect plant for your space" />
			<div className="p-16 pt-32 flex gap-24 bg-gray-50">
				{/* Sidebar */}
				<FilterSidebar />

				{/* Main Content */}
				<div className="flex-1">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div className="text-gray-600">
							{totalPlants > 0 && (
								<>
									Showing {startIndex}-{endIndex} of {totalPlants} Products
								</>
							)}
						</div>
						<div className="flex items-center gap-4">
							<label className="text-sm text-gray-600">Sort by:</label>
							<select 
								className="border border-gray-300 rounded px-3 py-1 text-sm"
								value={sortOrder}
								onChange={handleSortChange}
							>
								<option value="">Default</option>
								<option value="asc">Name: A to Z</option>
								<option value="desc">Name: Z to A</option>
							</select>
						</div>
					</div>

					{/* Product Grid */}
					{loading ? (
						<PlantGridSkeleton />
					) : (
						<div className="grid grid-cols-3 gap-8">
							{plants.map((plant) => (
								<PlantCard key={plant.id} plant={plant} />
							))}
						</div>
					)}

					{/* Pagination */}
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
}
import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import Image from 'next/image';
import { getAllPlants } from '@/lib/perenual';
import Link from 'next/link';

export default async function Home() {
	const { data: plants } = await getAllPlants();

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
							Showing {plants.length} Products
						</div>
						<div className="flex items-center gap-4">
							<select className="border border-gray-300 rounded px-3 py-1 text-sm">
								<option>Popular</option>
								<option>Price: Low to High</option>
								<option>Price: High to Low</option>
							</select>
						</div>
					</div>

					{/* Product Grid */}
					<div className="grid grid-cols-3 gap-8">
						{plants.map((plant) => (
							<div key={plant.id} className="bg-white rounded-lg shadow-lg">
								{/* Product Image */}
								<div className="flex items-center justify-center p-4 pb-0">
									<div
										style={{
											width: '250px',
											height: '175px',
											overflow: 'hidden',
											borderRadius: 8,
										}}
									>
										<Image
											src={
												plant.default_image
													? plant.default_image.regular_url
													: 'https://picsum.photos/250/175'
											}
											alt={plant.common_name}
											width={250}
											height={175}
										/>
									</div>
								</div>

								{/* Product Info */}
								<div className="p-4">
									<h3 className="font-bold">{plant.common_name}</h3>
									<div className="text-lg mb-2">$ {350}</div>
									<Link href={`/${plant.id}`}>
										<button className="w-full bg-primary text-white p-4 rounded-lg font-bold cursor-pointer">
											Buy
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

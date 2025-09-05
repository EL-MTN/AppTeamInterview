import Hero from '@/components/Hero';
import CareInformation from '@/components/CareInformation';
import ProductInteractions from '@/components/ProductInteractions';
import { getGuideById, getPlantById, getAllPlants } from '@/lib/perenual';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PlantPageProps {
	params: Promise<{ id: string }>;
}

export default async function Plant({ params }: PlantPageProps) {
	const { id } = await params;

	// Fetch all data server-side
	const [plantDetails, careGuidesResponse, allPlantsResponse] =
		await Promise.all([getPlantById(id), getGuideById(id), getAllPlants()]);

	const careGuides = careGuidesResponse.data[0] || {};
	const relatedPlants = allPlantsResponse.data.slice(0, 4);

	return (
		<div>
			<Hero title="Plant Details" blurb={plantDetails.common_name} />

			{/* Main Product Section */}
			<div className="py-16 px-18">
				{/* Back to Search */}
				<Link
					href="/"
					className="flex items-center gap-2 text-secondary mb-8 hover:text-primary transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Search
				</Link>

				<div className="flex gap-16">
					{/* Product Images */}
					<div className="flex-1">
						<div className="grid grid-cols-2 gap-4 max-w-[520px]">
							{/* Four Images in 2x2 grid */}
							{[1, 2, 3, 4].map((index) => (
								<div key={index}>
									<Image
										src={
											plantDetails.default_image?.regular_url ||
											'/placeholder-plant.jpg'
										}
										alt={`${plantDetails.common_name} ${index}`}
										width={250}
										height={250}
										style={{
											objectFit: 'cover',
											maxWidth: '250px',
											maxHeight: '250px',
										}}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div className="flex-1">
						<h1 className="text-3xl font-bold font-poppins">
							{plantDetails.common_name}
						</h1>
						<p className="text-gray-500 mb-4">$350</p>

						<p className="mb-6">
							{plantDetails.description ||
								`LOREM IPSUM NO DESCRIPTION`}
						</p>

						<ProductInteractions />

						<p className="text-sm text-gray-500">Free standard shipping</p>
					</div>
				</div>
			</div>

			{/* Care Information Section */}
			<CareInformation careGuides={careGuides} />

			{/* Recommendations Section */}
			<div className="my-24 px-18">
				<h2 className="text-5xl font-semibold font-poppins">
					<span className="text-primary">You&apos;ll love</span> these too...
				</h2>
				<hr className='m-8 mx-0' />

				<div className="grid grid-cols-4 gap-6">
					{relatedPlants.map(
						(plant: {
							id: number;
							common_name: string;
							default_image?: { regular_url: string };
						}) => (
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
						)
					)}
				</div>
			</div>
		</div>
	);
}

import Image from 'next/image';
import Link from 'next/link';

interface Plant {
	id: number;
	common_name: string;
	default_image?: {
		regular_url: string;
	};
}

interface PlantCardProps {
	plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg">
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
	);
}
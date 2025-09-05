export default function PlantGridSkeleton() {
	return (
		<div className="grid grid-cols-3 gap-8">
			{[...Array(9)].map((_, index) => (
				<div key={index} className="bg-white rounded-lg shadow-lg animate-pulse">
					{/* Skeleton Image */}
					<div className="flex items-center justify-center p-4 pb-0">
						<div
							className="bg-gray-200 rounded"
							style={{
								width: '250px',
								height: '175px',
							}}
						/>
					</div>
					
					{/* Skeleton Product Info */}
					<div className="p-4">
						<div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
						<div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
						<div className="h-12 bg-gray-200 rounded w-full"></div>
					</div>
				</div>
			))}
		</div>
	);
}
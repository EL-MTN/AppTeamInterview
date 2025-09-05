interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function PaginationControls({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationControlsProps) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex justify-center items-center mt-8 gap-2">
			{/* Previous Button */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`px-3 py-2 rounded ${
					currentPage === 1
						? 'bg-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer'
				}`}
			>
				Previous
			</button>

			{/* Page Numbers */}
			<div className="flex gap-1">
				{/* First page */}
				<button
					onClick={() => onPageChange(1)}
					className={`px-3 py-2 rounded ${
						currentPage === 1
							? 'bg-primary text-white'
							: 'bg-white border border-gray-300 hover:bg-gray-50'
					}`}
				>
					1
				</button>

				{/* Ellipsis if needed */}
				{currentPage > 3 && <span className="px-2 py-2">...</span>}

				{/* Middle pages */}
				{Array.from({ length: totalPages }, (_, i) => i + 1)
					.filter((page) => {
						if (page === 1 || page === totalPages) return false;
						return page >= currentPage - 1 && page <= currentPage + 1;
					})
					.map((page) => (
						<button
							key={page}
							onClick={() => onPageChange(page)}
							className={`px-3 py-2 rounded ${
								currentPage === page
									? 'bg-primary text-white'
									: 'bg-white border border-gray-300 hover:bg-gray-50'
							}`}
						>
							{page}
						</button>
					))}

				{/* Ellipsis if needed */}
				{currentPage < totalPages - 2 && (
					<span className="px-2 py-2">...</span>
				)}

				{/* Last page */}
				{totalPages > 1 && (
					<button
						onClick={() => onPageChange(totalPages)}
						className={`px-3 py-2 rounded ${
							currentPage === totalPages
								? 'bg-primary text-white'
								: 'bg-white border border-gray-300 hover:bg-gray-50'
						}`}
					>
						{totalPages}
					</button>
				)}
			</div>

			{/* Next Button */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`px-3 py-2 rounded ${
					currentPage === totalPages
						? 'bg-gray-200 text-gray-400 cursor-not-allowed'
						: 'bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer'
				}`}
			>
				Next
			</button>
		</div>
	);
}
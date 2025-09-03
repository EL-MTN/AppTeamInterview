'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const includes = [
	{ name: 'Planter', checked: false },
	{ name: 'Flowers', checked: false },
	{ name: 'Care', checked: false },
	{ name: 'Heat pack', checked: false },
];

export default function FilterSidebar() {
	const [expandedSections, setExpandedSections] = useState({
		categories: true,
		indoorPlants: true,
		outdoorPlants: false,
		sunRequirements: false,
		price: false,
		include: true,
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	return (
		<div className="w-64 space-y-6 text-[#343434]">
			{/* All Categories Sidebar */}
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<div
					className="flex items-center cursor-pointer"
					onClick={() => toggleSection('categories')}
				>
					<span className="transform transition-transform mr-2">
						{expandedSections.categories ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)}
					</span>
					<div>
						<h3 className="text-xl">All Categories</h3>
						<div className="text-sm font-normal">Plants on sale</div>
					</div>
				</div>

				{expandedSections.categories && (
					<>
						<ul className="space-y-2 ml-2">
							{/* Indoor Plants */}
							<li>
								<div
									className="flex items-center justify-between py-1 cursor-pointer"
									onClick={() => toggleSection('indoorPlants')}
								>
									<div className="flex items-center">
										<span className="mr-2 transform transition-transform">
											{expandedSections.indoorPlants ? (
												<ChevronDown size={16} />
											) : (
												<ChevronRight size={16} />
											)}
										</span>
										<span className="font-semibold">Indoor Plants</span>
									</div>
								</div>
								{expandedSections.indoorPlants && (
									<ul className="ml-6 mt-2 space-y-2">
										<li>Alocasia</li>
										<li>Hoya</li>
										<li>Sansevieria</li>
										<li>Syngonium</li>
										<div
											className="pt-1 text-sm flex items-center font-bold"
											onClick={() => toggleSection('categories')}
										>
											Show More <ChevronDown size={14} className="ml-1" />
										</div>
									</ul>
								)}
							</li>

							{/* Outdoor Plants */}
							<li>
								<div
									className="flex items-center justify-between py-1 cursor-pointer"
									onClick={() => toggleSection('outdoorPlants')}
								>
									<div className="flex items-center">
										<span className="mr-2 transform transition-transform">
											{expandedSections.outdoorPlants ? (
												<ChevronDown size={16} />
											) : (
												<ChevronRight size={16} />
											)}
										</span>
										<span className="font-semibold">Outdoor plants</span>
									</div>
								</div>
							</li>

							{/* Sun Requirements */}
							<li>
								<div
									className="flex items-center justify-between py-1 cursor-pointer"
									onClick={() => toggleSection('sunRequirements')}
								>
									<div className="flex items-center">
										<span className="mr-2 transform transition-transform">
											{expandedSections.sunRequirements ? (
												<ChevronDown size={16} />
											) : (
												<ChevronRight size={16} />
											)}
										</span>
										<span className="font-semibold">Sun requirements</span>
									</div>
								</div>
							</li>
						</ul>
					</>
				)}
			</div>

			{/* Price Filter */}
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<div
					className="flex items-center justify-between cursor-pointer"
					onClick={() => toggleSection('price')}
				>
					<h3 className="font-semibold text-lg">Price</h3>
					<span className="transform transition-transform">
						{expandedSections.price ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)}
					</span>
				</div>
				{expandedSections.price && (
					<div className="mt-4 p-4 border border-gray-200 rounded">
						<div className="text-sm">Price range controls would go here</div>
					</div>
				)}
			</div>

			{/* Include Filter */}
			<div className="bg-white p-4 rounded-lg border border-gray-200">
				<div
					className="flex items-center justify-between cursor-pointer"
					onClick={() => toggleSection('include')}
				>
					<h3 className="font-semibold text-lg">Include</h3>
					<span className="transform transition-transform">
						{expandedSections.include ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)}
					</span>
				</div>
				{expandedSections.include && (
					<ul className="space-y-3">
						{includes.map((item, index) => (
							<li key={index} className="flex items-center">
								<input
									type="checkbox"
									className="mr-3 rounded border-gray-300"
									checked={item.checked}
									readOnly
								/>
								<span className="text-sm">{item.name}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

'use client';

import { GuideDetails } from '@/lib/perenual';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function CareInformation({
	careGuides,
}: {
	careGuides: GuideDetails;
}) {
	// Get the first care guide section as default, or use 'originStory' if no sections
	const defaultSection = careGuides?.section?.[0]?.type || 'originStory';
	const [activeSection, setActiveSection] = useState<string>(defaultSection);
	const [isPlantCareExpanded, setIsPlantCareExpanded] = useState(true);

	// Get care guide sections for sidebar
	const careGuideSections = careGuides?.section || [];

	const toggleSection = (section: string) => {
		if (section === 'plantCare') {
			setIsPlantCareExpanded(!isPlantCareExpanded);
		} else {
			setActiveSection(section);
			// Ensure plant care is expanded when selecting a care guide subsection
			const careGuideTypes = careGuideSections.map((s) => s.type);
			if (careGuideTypes.includes(section)) {
				setIsPlantCareExpanded(true);
			}
		}
	};

	return (
		<div className="bg-accent p-8 px-24">
			<div className="flex gap-16">
				{/* Navigation Sidebar */}
				<div>
					{/* Plant Care Main Section */}
					{careGuideSections.length > 0 && (
						<div>
							<div
								className="flex items-center cursor-pointer p-2"
								onClick={() => toggleSection('plantCare')}
							>
								<span className="transform transition-transform mr-2">
									{isPlantCareExpanded ? (
										<ChevronDown size={16} />
									) : (
										<ChevronRight size={16} />
									)}
								</span>
								<span className="text-xl">Plant care</span>
							</div>
							{isPlantCareExpanded && (
								<div className="ml-4">
									{careGuideSections.map((section) => (
										<div
											key={section.id}
											className={`px-8 py-1 cursor-pointer ${
												activeSection === section.type
													? 'font-semibold'
													: 'hover:text-gray-600'
											}`}
											onClick={() => toggleSection(section.type)}
										>
											{section.type.charAt(0).toUpperCase() +
												section.type.slice(1)}
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* Origin Story */}
					<div
						className="flex items-center cursor-pointer p-2"
						onClick={() => toggleSection('originStory')}
					>
						<span className="transform transition-transform mr-2">
							<ChevronRight size={16} />
						</span>
						<span className="font-semibold">Origin Story</span>
					</div>

					{/* Scientific Data */}
					<div
						className="flex items-center cursor-pointer p-2"
						onClick={() => toggleSection('scientificData')}
					>
						<span className="transform transition-transform mr-2">
							<ChevronRight size={16} />
						</span>
						<span className="font-semibold">Scientific Data</span>
					</div>
				</div>

				{/* Content Area */}
				<div className="flex-1 relative">
					{/* Dynamic Care Guide Content */}
					{careGuideSections.map((section) => (
						<div
							key={section.id}
							className={`absolute inset-0 transition-all duration-300 ease-in-out ${
								activeSection === section.type
									? 'opacity-100 translate-x-0'
									: 'opacity-0 translate-x-4 pointer-events-none'
							}`}
						>
							<h2 className="text-3xl font-bold font-poppins mb-4">
								{section.type.charAt(0).toUpperCase() +
									section.type.slice(1)}
							</h2>
							<div className="space-y-4 text-black leading-relaxed">
								<p>{section.description}</p>
							</div>
						</div>
					))}
					{/* Origin Story */}
					<div
						className={`absolute inset-0 transition-all duration-300 ease-in-out ${
							activeSection === 'originStory'
								? 'opacity-100 translate-x-0'
								: 'opacity-0 translate-x-4 pointer-events-none'
						}`}
					>
						<h2 className="text-3xl font-bold font-poppins mb-4">
							Origin Story
						</h2>
						<div className="space-y-4 text-black leading-relaxed">
							Origin story here
						</div>
					</div>

					{/* Scientific Data */}
					<div
						className={`absolute inset-0 transition-all duration-300 ease-in-out ${
							activeSection === 'scientificData'
								? 'opacity-100 translate-x-0'
								: 'opacity-0 translate-x-4 pointer-events-none'
						}`}
					>
						<h2 className="text-3xl font-bold font-poppins mb-4">
							Scientific Data
						</h2>
						<div className="space-y-4 text-black leading-relaxed">
							Scientific data here
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const key = process.env.PERENUAL_API_KEY;

interface Plant {
	id: number;
	common_name: string;
	genus: string;
	default_image: {
		regular_url: string;
	};
}

export async function getAllPlants(): Promise<{ data: Plant[] }> {
	// TODO: DISABLE REVALIDATION FOR PRODUCTION
	const response = await fetch(
		`https://perenual.com/api/v2/species-list?key=${key}&per_page=30`,
		{ next: { revalidate: 3600 } }
	);
	if (!response.ok) {
		throw new Error('Failed to fetch plants');
	}
	return response.json();
}

export interface PlantDetails {
	id: number;
	description: string;
	common_name: string;
	genus: string;
	default_image: {
		regular_url: string;
	};
	other_images: [
		{
			regular_url: string;
		}
	];
}
export async function getPlantById(id: string): Promise<PlantDetails> {
	const detailsResponse = await fetch(
		`https://perenual.com/api/v2/species/details/${id}?key=${key}`,
		{ next: { revalidate: 3600 } }
	);
	if (!detailsResponse.ok) {
		throw new Error('Failed to fetch plant');
	}

	return detailsResponse.json();
}

export interface GuideDetails {
	id: number;
	common_name: string;
	section: Array<{
		id: number;
		type: string;
		description: string;
	}>;
}
export async function getGuideById(
	id: string
): Promise<{ data: GuideDetails[] }> {
	const guideResponse = await fetch(
		`https://perenual.com/api/species-care-guide-list?species_id=${id}&key=${key}`,
		{ next: { revalidate: 3600 } }
	);
	if (!guideResponse.ok) {
		throw new Error('Failed to fetch plant care guide');
	}

	return guideResponse.json();
}

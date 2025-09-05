const key = process.env.PERENUAL_API_KEY;
const isDevelopment = process.env.NODE_ENV === 'development';
const PERENUAL_PER_PAGE = 30;

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
		isDevelopment ? { next: { revalidate: 3600 } } : {}
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
		isDevelopment ? { next: { revalidate: 3600 } } : {}
	);
	if (!guideResponse.ok) {
		throw new Error('Failed to fetch plant care guide');
	}

	return guideResponse.json();
}

interface PaginatedPlantsParams {
	clientPage: number;
	perPage: number;
	order?: string;
	query?: string;
}

interface PaginatedPlantsResponse {
	data: PlantDetails[];
	to: number;
	per_page: number;
	current_page: number;
	from: number;
	last_page: number;
	total: number;
}

export async function getPaginatedPlants({
	clientPage,
	perPage,
	order = '',
	query = '',
}: PaginatedPlantsParams): Promise<PaginatedPlantsResponse> {
	// Calculate the range of items we need
	const startIndex = (clientPage - 1) * perPage;
	const endIndex = startIndex + perPage;

	// Calculate which Perenual API pages we need to fetch
	const startPerenualPage = Math.floor(startIndex / PERENUAL_PER_PAGE) + 1;
	const endPerenualPage = Math.floor((endIndex - 1) / PERENUAL_PER_PAGE) + 1;

	let allPlants: PlantDetails[] = [];
	let totalPlants = 0;

	// Fetch all required Perenual pages
	for (let page = startPerenualPage; page <= endPerenualPage; page++) {
		const orderParam = order ? `&order=${order}` : '';
		const queryParam = query ? `&q=${encodeURIComponent(query)}` : '';
		const response = await fetch(
			`https://perenual.com/api/v2/species-list?key=${key}&page=${page}${orderParam}${queryParam}`,
			isDevelopment ? { next: { revalidate: 3600 } } : {}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch plants from Perenual API');
		}

		const data = await response.json();
		allPlants = allPlants.concat(data.data);
		totalPlants = data.total;
	}

	// Calculate the correct offset for slicing
	const offsetInCombined =
		startIndex - (startPerenualPage - 1) * PERENUAL_PER_PAGE;

	// Slice the combined data to return only the requested items
	const slicedData = allPlants.slice(
		offsetInCombined,
		offsetInCombined + perPage
	);

	// Calculate the actual total pages based on our custom per_page value
	const actualTotalPages = Math.ceil(totalPlants / perPage);

	// Return modified response with our pagination
	return {
		data: slicedData,
		to: Math.min(startIndex + perPage, totalPlants),
		per_page: perPage,
		current_page: clientPage,
		from: startIndex + 1,
		last_page: actualTotalPages,
		total: totalPlants,
	};
}

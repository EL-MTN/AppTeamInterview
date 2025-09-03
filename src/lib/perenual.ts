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
		`https://perenual.com/api/v2/species-list?key=${key}`,
		{ next: { revalidate: 3600 } }
	);
	if (!response.ok) {
		throw new Error('Failed to fetch plants');
	}
	return response.json();
}

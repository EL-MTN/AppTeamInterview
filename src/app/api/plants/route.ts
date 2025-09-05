import { PlantDetails } from '@/lib/perenual';
import { NextResponse } from 'next/server';

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_PER_PAGE = 30;

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const clientPage = parseInt(searchParams.get('page') || '1');
		const perPage = parseInt(searchParams.get('per_page') || '9');
		const order = searchParams.get('order') || ''; // 'asc' or 'desc' for alphabetical sorting

		// Calculate the range of items we need
		const startIndex = (clientPage - 1) * perPage;
		const endIndex = startIndex + perPage;

		// Calculate which Perenual API pages we need to fetch
		const startPerenualPage = Math.floor(startIndex / PERENUAL_PER_PAGE) + 1;
		const endPerenualPage = Math.floor((endIndex - 1) / PERENUAL_PER_PAGE) + 1;

		let allPlants: PlantDetails[] = [];
		let totalPlants = 0;

		// Fetch all required Perenual pages
		// TODO: Disable caching on production
		for (let page = startPerenualPage; page <= endPerenualPage; page++) {
			const orderParam = order ? `&order=${order}` : '';
			const response = await fetch(
				`https://perenual.com/api/v2/species-list?key=${PERENUAL_API_KEY}&page=${page}${orderParam}`,
				{ next: { revalidate: 3600 } }
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
		return NextResponse.json({
			data: slicedData,
			to: Math.min(startIndex + perPage, totalPlants),
			per_page: perPage,
			current_page: clientPage,
			from: startIndex + 1,
			last_page: actualTotalPages,
			total: totalPlants,
		});
	} catch (error) {
		console.error('Error fetching plants:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch plants' },
			{ status: 500 }
		);
	}
}

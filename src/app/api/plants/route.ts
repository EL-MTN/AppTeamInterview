import { getPaginatedPlants } from '@/lib/perenual';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const clientPage = parseInt(searchParams.get('page') || '1');
		const perPage = parseInt(searchParams.get('per_page') || '9');
		const order = searchParams.get('order') || '';
		const query = searchParams.get('q') || '';

		const result = await getPaginatedPlants({
			clientPage,
			perPage,
			order,
			query,
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error('Error fetching plants:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch plants' },
			{ status: 500 }
		);
	}
}

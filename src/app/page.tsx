import PlantCard from '@/components/PlantCard';
import { getAllPlants } from '@/lib/perenual';
import { ArrowRight, Leaf, Truck, Shield, Sun } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
	const { data: plants } = await getAllPlants();
	const featuredPlants = plants.slice(0, 4);

	return (
		<div>
			{/* Hero Section */}
			<div className="relative h-[600px] bg-gradient-to-r from-green-50 to-green-100">
				<div className="container mx-auto px-16 h-full flex items-center">
					<div className="flex-1">
						<h1 className="text-6xl font-bold text-gray-900 mb-6">
							Bring Nature
							<span className="text-primary block">Into Your Home</span>
						</h1>
						<p className="text-xl text-gray-600 mb-8 max-w-lg">
							Discover the perfect plants for your space. From low-maintenance succulents 
							to vibrant tropical plants, we have everything you need to green up your life.
						</p>
						<div className="flex gap-4">
							<Link href="/products">
								<button className="bg-primary text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition">
									Shop All Plants
									<ArrowRight className="w-5 h-5" />
								</button>
							</Link>
							<Link href="#featured">
								<button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition">
									View Featured
								</button>
							</Link>
						</div>
					</div>
					<div className="flex-1 relative h-full flex items-center justify-center">
						<div className="relative">
							<div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
							<Leaf className="w-96 h-96 text-primary/30 relative" />
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="py-16 bg-white">
				<div className="container mx-auto px-16">
					<div className="grid grid-cols-4 gap-8">
						<div className="text-center">
							<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Truck className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Free Delivery</h3>
							<p className="text-gray-600 text-sm">On orders over $50</p>
						</div>
						<div className="text-center">
							<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Shield className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Healthy Guarantee</h3>
							<p className="text-gray-600 text-sm">30-day plant health promise</p>
						</div>
						<div className="text-center">
							<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Sun className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Care Guides</h3>
							<p className="text-gray-600 text-sm">Expert tips for every plant</p>
						</div>
						<div className="text-center">
							<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Leaf className="w-8 h-8 text-primary" />
							</div>
							<h3 className="font-bold mb-2">Eco Friendly</h3>
							<p className="text-gray-600 text-sm">Sustainable growing practices</p>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Plants Section */}
			<div id="featured" className="py-24 bg-gray-50">
				<div className="container mx-auto px-16">
					<div className="text-center mb-12">
						<h2 className="text-5xl font-bold mb-4">
							<span className="text-primary">Featured</span> Plants
						</h2>
						<p className="text-gray-600 text-lg">
							Hand-picked favorites perfect for beginners and experts alike
						</p>
					</div>
					<div className="grid grid-cols-4 gap-6 mb-12">
						{featuredPlants.map((plant) => (
							<PlantCard key={plant.id} plant={plant} />
						))}
					</div>
					<div className="text-center">
						<Link href="/products">
							<button className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition">
								View All Plants
							</button>
						</Link>
					</div>
				</div>
			</div>

			{/* Categories Section */}
			<div className="py-24 bg-white">
				<div className="container mx-auto px-16">
					<h2 className="text-5xl font-bold text-center mb-12">
						Shop by <span className="text-primary">Category</span>
					</h2>
					<div className="grid grid-cols-3 gap-8">
						<Link href="/products" className="group">
							<div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg overflow-hidden">
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
								<div className="relative h-full flex items-center justify-center flex-col text-white">
									<Leaf className="w-16 h-16 mb-4" />
									<h3 className="text-2xl font-bold">Indoor Plants</h3>
									<p className="text-sm mt-2">Perfect for your home</p>
								</div>
							</div>
						</Link>
						<Link href="/products" className="group">
							<div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
								<div className="relative h-full flex items-center justify-center flex-col text-white">
									<Sun className="w-16 h-16 mb-4" />
									<h3 className="text-2xl font-bold">Outdoor Plants</h3>
									<p className="text-sm mt-2">For gardens & patios</p>
								</div>
							</div>
						</Link>
						<Link href="/products" className="group">
							<div className="relative h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg overflow-hidden">
								<div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
								<div className="relative h-full flex items-center justify-center flex-col text-white">
									<Shield className="w-16 h-16 mb-4" />
									<h3 className="text-2xl font-bold">Low Maintenance</h3>
									<p className="text-sm mt-2">Easy care options</p>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="py-24 bg-gradient-to-r from-green-50 to-green-100">
				<div className="container mx-auto px-16 text-center">
					<h2 className="text-5xl font-bold mb-6">
						Ready to <span className="text-primary">Grow</span>?
					</h2>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Join thousands of plant parents who have transformed their spaces 
						with our carefully selected collection of plants.
					</p>
					<Link href="/products">
						<button className="bg-primary text-white px-12 py-5 rounded-lg font-bold text-lg hover:bg-green-700 transition flex items-center gap-2 mx-auto">
							Start Shopping
							<ArrowRight className="w-6 h-6" />
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
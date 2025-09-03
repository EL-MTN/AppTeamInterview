import { Handbag, Search } from 'lucide-react';

export default function Header() {
	return (
		<div>
			{/* HEADER */}
			<div className="p-2 bg-primary font-sans flex items-center justify-end text-white relative">
				<div className="font-semibold absolute left-1/2 transform -translate-x-1/2">
					FREE SHIPPING ON ALL FULL SUN PLANTS! FEB. 25–28.
				</div>
				<div className="flex gap-4 mr-8">
					<div className="font-normal">USD</div>
					<div className="font-bold">Support</div>
				</div>
			</div>
			{/* NAV */}
			<div className="p-4 font-sans flex items-center justify-between shadow-lg relative">
				<div className="font-poppins text-xl font-semibold ml-4">
					<span className="text-primary">Green</span>&nbsp;Thumb
				</div>
				<div className="absolute left-1/2 transform -translate-x-1/2 flex gap-16">
					<div>Home</div>
					<div>Product</div>
					<div>About Us</div>
					<div>Contact Us</div>
				</div>
				<div className="flex mr-4 gap-4 items-center">
					<div className="flex items-center gap-2 text-secondary">
						Search
						<Search className='text-black h-[22px] w-[22px]' />
					</div>
					<div className="h-8 w-px bg-secondary"></div>
					<div className="flex items-center gap-2">
						<Handbag />2
					</div>
				</div>
			</div>
		</div>
	);
}

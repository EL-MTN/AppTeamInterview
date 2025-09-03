import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="bg-accent">
			<div className="mx-auto py-4">
				<nav className="flex flex-wrap justify-center gap-8 mb-8 font-medium text-sm">
					<div>Products</div>
					<div>Returns</div>
					<div>FAQ</div>
					<div>Shipping</div>
					<div>About us</div>
					<div>Contact us</div>
				</nav>

				<div className="flex justify-center gap-4 mb-4">
					<Youtube />
					<Facebook />
					<Twitter />
					<Instagram />
					<Linkedin />
				</div>
			</div>

			<div className="bg-primary text-white text-center py-4">
				<p className="text-md">COPYRIGHT GREEN THUMB. ALL RIGHTS RESERVED</p>
			</div>
		</footer>
	);
}

export default function Hero({
	title,
	blurb,
}: {
	title: string;
	blurb: string;
}) {
	return (
		<div className="bg-accent p-12">
			<div className="flex gap-4 items-baseline ml-12">
				<div className="text-7xl font-poppins">{title}</div>
				<div className="h-12 w-px bg-black"></div>
				<div className="text-xl">{blurb}</div>
			</div>
		</div>
	);
}

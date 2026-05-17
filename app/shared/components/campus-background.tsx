export function CampusBackground() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			<div
				className="mask-fade-to-bottom absolute inset-0 scale-105 bg-center bg-cover"
				style={{ backgroundImage: "url('/campus-bg.jpg')", viewTransitionName: "campus-bg" }}
			/>
			<div
				className="mask-fade-to-top absolute inset-0 scale-105 bg-center bg-cover blur-campus-overlay"
				style={{ backgroundImage: "url('/campus-bg.jpg')" }}
			/>
			<div className="noise-overlay absolute inset-0" />
		</div>
	);
}

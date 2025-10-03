"use client";

import { useEffect, useRef, useState } from "react";

interface NutrientInstance {
	// Add methods and properties as needed based on your NutrientViewer instance
	[key: string]: any;
}

declare global {
	interface Window {
		instance: NutrientInstance;
	}
}

interface ViewerProps {
	document: string | ArrayBuffer;
}

export default function ViewerXFDF({ document }: ViewerProps) {
	const containerRef = useRef(null);
	const [xfdf, setXfdf] = useState<string | null>(null);

	useEffect(() => {
		fetch("/documents/xfa-example_widgets.xfdf")
			.then((res) => res.text())
			.then((data) => setXfdf(data));
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		const { NutrientViewer } = window;
		if (container && NutrientViewer && xfdf) {
			console.log("xfdf: ", xfdf);
			NutrientViewer.load({
				container,
				document: document,
				// XFDF: xfdf,
			})
				.then((instance) => {
					window.instance = instance;
				})
				.catch((error) => {
					console.error("Error loading document: ", error);
				});
		}
		return () => {
			NutrientViewer?.unload(container);
		};
	}, [document, xfdf]);

	// You must set the container height and width
	return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}

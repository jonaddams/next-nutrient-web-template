"use client";

import { useEffect, useRef } from "react";

interface ViewerProps {
	document: string | ArrayBuffer;
}

export default function Viewer({ document }: ViewerProps) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;

		const { NutrientViewer } = window;
		if (container && NutrientViewer) {
			NutrientViewer.load({
				container,
				document: document,
			});
		}

		return () => {
			NutrientViewer?.unload(container);
		};
	}, [document]);

	// You must set the container height and width
	return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}

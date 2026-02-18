"use client";
import { useEffect, useMemo, useState } from "react";

export default function BreathingExercise() {
	const phases = useMemo(() => ["Inhale", "Hold", "Exhale", "Hold"] as const, []);
	const durationsMs = useMemo(() => [4000, 2000, 4000, 2000], []);
	const [phaseIndex, setPhaseIndex] = useState(0);
	const phase = phases[phaseIndex];

	useEffect(() => {
		let idx = 0;
		let timer: number | undefined;
		const tick = () => {
			timer = window.setTimeout(() => {
				idx = (idx + 1) % phases.length;
				setPhaseIndex(idx);
				tick();
			}, durationsMs[idx]);
		};
		setPhaseIndex(0);
		tick();
		return () => {
			if (timer) window.clearTimeout(timer);
		};
	}, [durationsMs, phases]);

	
	const targetScale = phase === "Inhale" ? 1.1 : phase === "Exhale" ? 0.92 : 1.0;
	const duration = durationsMs[phaseIndex];
	const transition = `transform ${duration}ms cubic-bezier(0.45, 0, 0.55, 1), opacity ${duration}ms ease-in-out`;

	return (
		<div className="relative flex items-center justify-center">
			
			<div className="pointer-events-none fixed inset-0 -z-10">
				<div
					className="absolute left-1/2 top-1/2 h-[160vmin] w-[160vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl"
					style={{ transform: `translate(-50%, -50%) scale(${targetScale})`, transition }}
				/>
			</div>

			
			<div className="relative h-[70vmin] w-[70vmin] max-h-[800px] max-w-[800px]">
				<div className="absolute inset-0 flex items-center justify-center">
					
					<div className="rounded-full bg-cyan-500/12" style={{ width: '55%', height: '55%', transform: `scale(${targetScale})`, transition }} />
					<div className="absolute rounded-full bg-teal-500/12" style={{ width: '65%', height: '65%', transform: `scale(${targetScale * 1.03})`, transition }} />
					<div className="absolute rounded-full bg-cyan-600/10" style={{ width: '75%', height: '75%', transform: `scale(${targetScale * 1.06})`, transition }} />

					
					<div className="absolute rounded-full bg-teal-400/8" style={{ width: '45%', height: '45%', transform: `scale(${targetScale * 0.975})`, transition }} />
					<div className="absolute rounded-full bg-cyan-400/6" style={{ width: '40%', height: '40%', transform: `scale(${targetScale * 0.94})`, transition }} />
					<div className="absolute rounded-full bg-teal-300/5" style={{ width: '35%', height: '35%', transform: `scale(${targetScale * 0.9})`, transition }} />
				</div>

				
				<div
					className="absolute left-1/2 top-1/2 rounded-full bg-cyan-300/35 blur-2xl"
					style={{ width: '32%', height: '32%', transform: `translate(-50%, -50%) scale(${targetScale})`, transition }}
				/>

				
				<div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
					<div key={phase} className="transition-opacity duration-500 ease-in-out opacity-100">
						<span className="select-none text-2xl font-semibold text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
							{phase}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

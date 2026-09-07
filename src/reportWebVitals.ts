import type { MetricType } from 'web-vitals';

/**
 * web-vitals v5 dropped FID — it was replaced by INP as a Core Web Vital — and
 * renamed every getter from `getX` to `onX`, so this is the v5 shape of the
 * metric set rather than a straight rename of the old one.
 */
const reportWebVitals = (onPerfEntry?: (metric: MetricType) => void) => {
	if (!onPerfEntry || typeof onPerfEntry !== 'function') return;

	import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
		onCLS(onPerfEntry);
		onFCP(onPerfEntry);
		onINP(onPerfEntry);
		onLCP(onPerfEntry);
		onTTFB(onPerfEntry);
	});
};

export default reportWebVitals;

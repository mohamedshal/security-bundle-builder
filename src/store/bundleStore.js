import { create } from "zustand";
import productsData from "../data/products.json";

const STORAGE_KEY = "wyze-bundle-system";

function buildInitialQuantities() {
	const quantities = {};
	productsData.products.forEach(product => {
		if (product.hasVariants) {
			product.variants.forEach(v => {
				quantities[v.id] = 0;
			});
		}
		quantities[product.id] = 0;
	});
	return quantities;
}

function applyInitialOverrides(quantities) {
	const q = { ...quantities };
	productsData.products.forEach(product => {
		if (product.initialQuantities) {
			Object.entries(product.initialQuantities).forEach(([key, val]) => {
				q[key] = val;
			});
		}
	});
	return q;
}

function loadSavedState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

function getActiveVariant(product, quantities) {
	if (!product.hasVariants || product.variants.length === 0) return null;
	for (const v of product.variants) {
		if ((quantities[v.id] || 0) > 0) return v.id;
	}
	return product.variants[0].id;
}

function calcProductQuantity(product, quantities) {
	if (product.hasVariants && product.variants.length > 0) {
		return product.variants.reduce((sum, v) => sum + (quantities[v.id] || 0), 0);
	}
	return quantities[product.id] || 0;
}

function calcStepSelectedCount(stepId, quantities) {
	const stepProducts = productsData.products.filter(p => p.stepId === stepId);
	return stepProducts.reduce((count, p) => {
		const q = calcProductQuantity(p, quantities);
		return count + (q > 0 ? 1 : 0);
	}, 0);
}

function calcSelectedItems(quantities) {
	const items = [];
	productsData.products.forEach(product => {
		if (product.hasVariants && product.variants.length > 0) {
			product.variants.forEach(v => {
				const q = quantities[v.id] || 0;
				if (q > 0) {
					items.push({
						productId: product.id,
						variantId: v.id,
						name: product.name,
						variantName: v.name,
						variantColor: v.color,
						quantity: q,
						price: product.price,
						comparePrice: product.comparePrice,
						image: v.image || product.image,
						category: productsData.steps.find(s => s.id === product.stepId)?.category || "",
						stepId: product.stepId,
					});
				}
			});
		} else {
			const q = quantities[product.id] || 0;
			if (q > 0) {
				items.push({
					productId: product.id,
					variantId: product.id,
					name: product.name,
					variantName: null,
					variantColor: null,
					quantity: q,
					price: product.price,
					comparePrice: product.comparePrice,
					image: product.image,
					category: productsData.steps.find(s => s.id === product.stepId)?.category || "",
					stepId: product.stepId,
				});
			}
		}
	});
	return items;
}

function calcTotal(quantities) {
	const items = calcSelectedItems(quantities);
	return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calcTotalCompare(quantities) {
	const items = calcSelectedItems(quantities);
	return items.reduce((sum, item) => {
		const cp = item.comparePrice || item.price;
		return sum + cp * item.quantity;
	}, 0);
}

function calcSavings(quantities) {
	return calcTotalCompare(quantities) - calcTotal(quantities);
}

const saved = loadSavedState();

const defaultQuantities = applyInitialOverrides(buildInitialQuantities());

const initialQuantities = saved ? { ...defaultQuantities, ...saved.quantities } : defaultQuantities;

export const useBundleStore = create((set, get) => ({
	activeStep: saved?.activeStep || 1,
	activeVariants: saved?.activeVariants || {},
	quantities: initialQuantities,

	setActiveStep: step => set({ activeStep: step }),

	nextStep: () =>
		set(state => ({
			activeStep: Math.min(state.activeStep + 1, 4),
		})),

	setActiveVariant: (productId, variantId) =>
		set(state => ({
			activeVariants: { ...state.activeVariants, [productId]: variantId },
		})),

	switchVariant: (productId, variantId) =>
		set(state => ({
			activeVariants: { ...state.activeVariants, [productId]: variantId },
		})),

	getActiveVariantId: productId => {
		const state = get();
		if (state.activeVariants[productId]) return state.activeVariants[productId];
		const product = productsData.products.find(p => p.id === productId);
		if (!product || !product.hasVariants) return productId;
		return getActiveVariant(product, state.quantities) || product.variants[0]?.id;
	},

	increaseQuantity: variantId =>
		set(state => ({
			quantities: { ...state.quantities, [variantId]: (state.quantities[variantId] || 0) + 1 },
		})),

	decreaseQuantity: variantId =>
		set(state => ({
			quantities: {
				...state.quantities,
				[variantId]: Math.max(0, (state.quantities[variantId] || 0) - 1),
			},
		})),

	increaseProductQuantity: productId =>
		set(state => {
			const product = productsData.products.find(p => p.id === productId);
			if (!product) return state;
			if (product.hasVariants && product.variants.length > 0) {
				const activeVar = getActiveVariant(product, state.quantities) || product.variants[0].id;
				return {
					quantities: {
						...state.quantities,
						[activeVar]: (state.quantities[activeVar] || 0) + 1,
					},
				};
			}
			return {
				quantities: {
					...state.quantities,
					[productId]: (state.quantities[productId] || 0) + 1,
				},
			};
		}),

	decreaseProductQuantity: productId =>
		set(state => {
			const product = productsData.products.find(p => p.id === productId);
			if (!product) return state;
			if (product.hasVariants && product.variants.length > 0) {
				const activeVar = getActiveVariant(product, state.quantities) || product.variants[0].id;
				return {
					quantities: {
						...state.quantities,
						[activeVar]: Math.max(0, (state.quantities[activeVar] || 0) - 1),
					},
				};
			}
			return {
				quantities: {
					...state.quantities,
					[productId]: Math.max(0, (state.quantities[productId] || 0) - 1),
				},
			};
		}),

	saveSystem: () => {
		const state = get();
		const payload = {
			activeStep: state.activeStep,
			activeVariants: state.activeVariants,
			quantities: state.quantities,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
	},

	restoreSystem: () => {
		const s = loadSavedState();
		if (s) {
			set({
				activeStep: s.activeStep || 1,
				activeVariants: s.activeVariants || {},
				quantities: { ...defaultQuantities, ...s.quantities },
			});
		}
	},

	resetSystem: () => {
		localStorage.removeItem(STORAGE_KEY);
		set({
			activeStep: 1,
			activeVariants: {},
			quantities: defaultQuantities,
		});
	},
}));

function getProductsForStep(stepId) {
	return productsData.products.filter(p => p.stepId === stepId);
}

function getStepById(stepId) {
	return productsData.steps.find(s => s.id === stepId);
}

export {
	productsData,
	calcSelectedItems,
	calcStepSelectedCount,
	calcTotal,
	calcTotalCompare,
	calcSavings,
	calcProductQuantity,
	getProductsForStep,
	getStepById,
};

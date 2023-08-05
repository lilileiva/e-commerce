import { useReducer } from 'react';
import GlobalStateContext from './globalStateContext';

const initialState = {
	totalProducts: 0,
	totalPrice: 0,
	cartProducts: []
};

const stateReducer = (state, action) => {
	let productIndex = state.cartProducts.findIndex((p) => p.id === action.payload.id);
	const products = state.cartProducts.filter((p) => p.id !== action.payload.id);

	switch (action.type) {
		case 'ADD_PRODUCT':
			if (productIndex === -1) {
				const newProduct = { ...action.payload, quantity: 1 };
				return {
					...state,
					totalProducts: state.totalProducts + 1,
					totalPrice: state.totalPrice + Number(newProduct.price),
					cartProducts: [...state.cartProducts, newProduct]
				};
			} else {
				const updatedProduct = { ...state.cartProducts[productIndex] };
				updatedProduct.quantity += 1;
				return {
					...state,
					totalProducts: state.totalProducts + 1,
					totalPrice: state.totalPrice + Number(updatedProduct.price),
					cartProducts: [...products, updatedProduct]
				};
			}
		case 'REMOVE_PRODUCT':
			if (productIndex !== -1) {
				const updatedProduct = { ...state.cartProducts[productIndex] };
				updatedProduct.quantity -= 1;

				if (updatedProduct.quantity <= 0) {
					return {
						...state,
						totalProducts: state.totalProducts > 1 ? state.totalProducts - 1 : 0,
						cartProducts: state.cartProducts.filter((p) => p.id !== action.payload.id)
					};
				} else {
					return {
						...state,
						totalProducts: state.totalProducts - 1,
						cartProducts: [...products, updatedProduct]
					};
				}
			}
			return state;
		default:
			return state;
	}
};

const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(stateReducer, initialState);

	return (
		<GlobalStateContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStateContext.Provider>
	);
};

export default GlobalStateProvider;
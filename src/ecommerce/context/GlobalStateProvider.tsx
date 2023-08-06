import { useReducer } from 'react';
import GlobalStateContext from './globalStateContext';

const initialState = {
	totalProducts: 0,
	totalPrice: 0,
	cartProducts: []
};

const stateReducer = (state, action) => {
	
	switch (action.type) {
		case 'ADD_PRODUCT':
			let productIndex = state.cartProducts.findIndex((p) => p.id === action.payload.id);
			let products = state.cartProducts.filter((p) => p.id !== action.payload.id);
			if (productIndex === -1) {
				const newProduct = { ...action.payload, quantity: 1 };
				newProduct.totalPrice = Number(action.payload.price);
				return {
					...state,
					totalProducts: state.totalProducts + 1,
					totalPrice: state.totalPrice + Number(newProduct.price),
					cartProducts: [...state.cartProducts, newProduct]
				};
			} else {
				const updatedProduct = { ...state.cartProducts[productIndex] };
				updatedProduct.quantity += 1;
				updatedProduct.totalPrice += Number(action.payload.price);				
				return {
					...state,
					totalProducts: state.totalProducts + 1,
					totalPrice: state.totalPrice + Number(updatedProduct.price),
					cartProducts: [...products, updatedProduct]
				};
			}
		case 'REMOVE_PRODUCT':
			let productIndexR = state.cartProducts.findIndex((p) => p.id === action.payload.id);
			const productsR = state.cartProducts.filter((p) => p.id !== action.payload.id);
			if (productIndexR !== -1) {
				const updatedProduct = { ...state.cartProducts[productIndexR] };
				updatedProduct.quantity -= 1;
				updatedProduct.totalPrice -= Number(action.payload.price);

				if (updatedProduct.quantity <= 0) {
					return {
						...state,
						totalProducts: state.totalProducts > 1 ? state.totalProducts - 1 : 0,
						totalPrice: state.totalPrice - Number(action.payload.price),
						cartProducts: state.cartProducts.filter((p) => p.id !== action.payload.id)
					};
				} else {
					return {
						...state,
						totalProducts: state.totalProducts - 1,
						totalPrice: state.totalPrice - Number(action.payload.price),
						cartProducts: [...productsR, updatedProduct]
					};
				}
			}
			return state;
		case 'CLEAN':
			return {
				...state,
				totalProducts: 0,
				totalPrice: 0,
				cartProducts: []
			}
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
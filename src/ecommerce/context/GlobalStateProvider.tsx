import { useReducer } from 'react';
import GlobalStateContext from './globalStateContext';

const initialState = {
	cartProducts: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
	currentPage: 0
};

const stateReducer = (state, action) => {
	
	switch (action.type) {
		case 'SET_PAGE':
			return {
				...state,
				currentPage: action.payload
			}
		case 'ADD_PRODUCT':			
			let productIndex = state.cartProducts.findIndex((p) => p.id === action.payload.id);
			let products = state.cartProducts.filter((p) => p.id !== action.payload.id);
			if (productIndex === -1) {
				const newProduct = { ...action.payload, quantity: 1 };				
				return {
					...state,
					cartProducts: [...state.cartProducts, newProduct]
				};
			} else {
				const updatedProduct = { ...state.cartProducts[productIndex] };
				updatedProduct.quantity += 1;		
				return {
					...state,
					cartProducts: [...products, updatedProduct]
				};
			}
		case 'REMOVE_PRODUCT':			
			let productIndexR = state.cartProducts.findIndex((p) => p.id === action.payload.id);
			const productsR = state.cartProducts.filter((p) => p.id !== action.payload.id);
			if (productIndexR !== -1) {
				const updatedProduct = { ...state.cartProducts[productIndexR] };
				updatedProduct.quantity -= 1;				

				if (updatedProduct.quantity <= 0) {					
					return {
						...state,
						cartProducts: state.cartProducts.filter((p) => p.id !== action.payload.id)
					};
				} else {					
					return {
						...state,						
						cartProducts: [...productsR, updatedProduct]
					};
				}
			}
			return state;
		case 'CLEAN':
			return {
				...state,				
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
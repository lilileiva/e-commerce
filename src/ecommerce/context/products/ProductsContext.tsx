import { createContext } from 'react';
import { Product } from '../../interfaces/interfaces';

interface ProductsContextProps {
    data: Array<Product>;
}

export const ProductsContext = createContext<ProductsContextProps>({} as ProductsContextProps)
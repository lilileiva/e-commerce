import { createContext } from 'react';
import { Category } from '../../interfaces/interfaces';

interface CategoriesContextProps {
    data: Array<Category>;
}

export const CategoriesContext = createContext<CategoriesContextProps>({} as CategoriesContextProps)
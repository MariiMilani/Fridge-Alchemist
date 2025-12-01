import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const API_URL = '/api';

const fetchRecipe = async (): Promise<string> => {
    const response = await axios.get(API_URL + '/generate');

    if (typeof response.data === 'string') {
        return response.data;
    }

    if (response.data && typeof response.data === 'object') {
        return JSON.stringify(response.data)
    }

    return "Não foi possivel obter a receita";
}

export function useRecipe() {
    const query =
        useQuery({
            queryFn: fetchRecipe,
            queryKey: ['recipe'],
            enabled: false,
            refetchOnWindowFocus: false,
        });

    return {
        ...query,
        recipe: query.data,
        fetchRecipe: query.refetch
    }
}
import axios, {type AxiosPromise} from "axios";
import type {FoodData} from "../../interface/FoodData.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const API_URL = '/api';

const deleteData = async (data: FoodData): AxiosPromise => {
    if (!data.id){
        throw new Error('No ID found!')
    }
    return axios.delete(API_URL + '/food/' + data.id);
}

export function useFoodDataDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    });

    return mutate;
}
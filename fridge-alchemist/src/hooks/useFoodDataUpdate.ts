import axios, {type AxiosPromise} from "axios";
import type {FoodData} from "../interface/FoodData.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const API_URL = '/api';

const updatedData = async (data: FoodData & {id: number}): AxiosPromise => {
    if (!data.id){
        throw new Error('No ID found!')
    }
    return axios.put(API_URL + '/food/' + data.id, data);
}

export function useFoodDataUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: updatedData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    });

    return mutate;
}
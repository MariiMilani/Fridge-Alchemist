import axios, {type AxiosPromise} from "axios";
import type {FoodData} from "../../interface/FoodData.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const API_URL = '/api';

const postData = async (data: FoodData): AxiosPromise => {
    return axios.post(API_URL + '/food', data);
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['food-data']})
        }
    });

    return mutate;
}
import axios, {type AxiosPromise} from "axios";
import type {FoodData} from "../interface/FoodData.ts";
import {useQuery} from "@tanstack/react-query";

const API_URL = '/api';

const fetchData = async (): AxiosPromise<FoodData[]> => {
    return axios.get(API_URL + '/food');
}

export function useFoodData() {
    const query =
        useQuery({
            queryFn: fetchData,
            queryKey: ['food-data'],
            retry: 2
        });

    return {
        ...query,
        data: query.data?.data
    }
}
import {useEffect, useState} from 'react';
import type {FoodData} from '../../interface/FoodData';

import "./modal.css";
import {useFoodDataUpdate} from "../../hooks/useFoodDataUpdate.ts";

interface InputProps {
    label: string,
    value: string | number,

    updateValue(value: unknown): void
}

interface ModalProps {
    closeModal(): void;
    id: number;
    currentData: FoodData;
}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function UpdateModal({closeModal, id, currentData}: ModalProps) {
    const [name, setName] = useState(currentData.name);
    const [quant, setQuant] = useState(currentData.quant);
    const [category, setCategory] = useState(currentData.category);
    const [expiration, setExpiration] = useState(currentData.expiration);

    const {mutate, isSuccess, isPending} = useFoodDataUpdate();

    const submit = () => {
        const foodData: FoodData & {id: number} = {
            id,
            name,
            quant: Number(quant),
            category,
            expiration
        }
        mutate(foodData)
    }

    useEffect(() => {
        if (!isSuccess) return
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="name" value={name} updateValue={setName}/>
                    <Input label="quant" value={quant} updateValue={setQuant}/>
                    <Input label="category" value={category} updateValue={setCategory}/>
                    <Input label="expiration" value={expiration} updateValue={setExpiration}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'atualizando...' : 'atualizar'}
                </button>
            </div>
        </div>
    )
}
import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import type {FoodData} from '../../interface/FoodData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [name, setName] = useState("");
    const [quant, setQuant] = useState(0);
    const [category, setCategory] = useState("");
    const [expiration, setExpiration] = useState("");
    const { mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            name,
            quant,
            category,
            expiration
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])

    return(
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
                    {isPending ? 'postando...' : 'postar'}
                </button>
            </div>
        </div>
    )
}
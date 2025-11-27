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

interface SelectProps {
    label: string,
    value: string,

    updateValue(value: string): void,

    options: { value: string, label: string }[]
}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

const Select = ({label, value, updateValue, options}: SelectProps) => {
    return (
        <>
            <label>{label}</label>
            <select value={value} onChange={event => updateValue(event.target.value)}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}

export function UpdateModal({closeModal, id, currentData}: ModalProps) {
    const [name, setName] = useState(currentData.name);
    const [quant, setQuant] = useState(currentData.quant);
    const [category, setCategory] = useState(currentData.category);
    const [expiration, setExpiration] = useState(currentData.expiration);

    const {mutate, isSuccess, isPending} = useFoodDataUpdate();

    const categoryOptions = [
        {value: 'PROTEIN', label: 'Proteínas'},
        {value: 'FRUIT_VEGETABLE', label: 'Frutas ou Vegetais'},
        {value: 'FAT_OIL', label: 'Oleosos'},
        {value: 'DAIRY', label: 'Laticínios'},
        {value: 'CARBOHYDRATE', label: 'Carboidratos'}
    ];

    const submit = () => {
        const foodData: FoodData & { id: number } = {
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
                <div className="modal-header">
                    <h2>Cadastre um novo item no cardápio</h2>
                    <button onClick={closeModal} className="btn-close-modal">X</button>
                </div>
                <form className="input-container">
                    <Input label="Nome" value={name} updateValue={setName}/>
                    <Input label="Quantidade" value={quant} updateValue={setQuant}/>
                    <Select
                        label="Categoria"
                        value={category}
                        updateValue={setCategory}
                        options={categoryOptions}
                    />
                    <Input label="Validade" value={expiration} updateValue={setExpiration}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'atualizando...' : 'atualizar'}
                </button>
            </div>
        </div>
    )
}
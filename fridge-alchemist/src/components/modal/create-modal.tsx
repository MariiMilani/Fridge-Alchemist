import {useEffect, useState} from 'react';
import {useFoodDataMutate} from '../../hooks/useFoodDataMutate';
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

export function CreateModal({closeModal}: ModalProps) {
    const [name, setName] = useState("");
    const [quant, setQuant] = useState(0);
    const [category, setCategory] = useState("");
    const [expiration, setExpiration] = useState("");
    const {mutate, isSuccess, isPending} = useFoodDataMutate();

    const categoryOptions = [
        {value: 'PROTEIN', label: 'Proteínas'},
        {value: 'FRUIT_VEGETABLE', label: 'Frutas ou Vegetais'},
        {value: 'FAT_OIL', label: 'Gordura e óleos'},
        {value: 'DAIRY', label: 'Laticínios'},
        {value: 'CARBOHYDRATE', label: 'Carboidratos'}
    ];

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
                    {isPending ? 'postando...' : 'postar'}
                </button>
            </div>
        </div>
    )
}
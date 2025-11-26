import './card.css'
import {useFoodDataDelete} from "../../hooks/useFoodDataDelete.ts";
import {UpdateModal} from "../modal/update-modal.tsx";
import {useState} from "react";

interface CardProps {
    id: number;
    name: string,
    quant: number,
    category: string,
    expiration: string
}

export function Card({id, name, quant, category, expiration}: CardProps) {

    const deleteMutation = useFoodDataDelete();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        if (id) {
            deleteMutation.mutate({id, name, quant, category, expiration});
        }
    }

    const handleUpdate = () => {
        if (id) {
            setIsModalOpen(prev => !prev);
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2>{name}</h2>
                <div className="card-header-buttons">
                    {isModalOpen && <UpdateModal
                        closeModal={handleUpdate}
                        id={id}
                        currentData={{name, quant, category, expiration}}/>}
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="card-bottom">
                <span>Quantity: {quant}</span>
                <span>Expiration date: {expiration}</span>
            </div>
        </div>

    )

}



import './card.css'
import {useFoodDataDelete} from "../../hooks/useFoodDataDelete.ts";

interface CardProps {
    id: number;
    name: string,
    quant: number,
    category: string,
    expiration: string
}

export function Card({id, name, quant, category, expiration}: CardProps) {

    const deleteMutation = useFoodDataDelete();

    const handleDelete = () => {
        if(id){
            deleteMutation.mutate({id, name, quant, category, expiration});
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2>{name}</h2>
                <div className="card-header-buttons">
                    <button>Update</button>
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



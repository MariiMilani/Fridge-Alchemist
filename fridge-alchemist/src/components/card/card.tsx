import './card.css'

interface CardProps {
    name: string,
    quant: number,
    expiration: string
}

export function Card({name, quant, expiration} : CardProps) {
    return (
        <div className="card">
            <div className="card-header">
                <h2>{name}</h2>
                <div className="card-header-buttons">
                    {/*<button>Update</button>
                    <button>Delete</button>*/}
                </div>
            </div>
            <div className="card-bottom">
                <span>Quantity:  {quant}</span>
                <span>Expiration date:  {expiration}</span>
            </div>
        </div>

    )
}
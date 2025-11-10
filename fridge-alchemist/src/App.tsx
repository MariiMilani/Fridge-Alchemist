import './App.css'
import {Card} from "./components/card/card.tsx";
import {useFoodData} from "./hooks/useFoodData.ts";
import {useState} from "react";
import {CreateModal} from "./components/create-modal/create-modal.tsx";

function App() {
    const {data} = useFoodData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    }

    return (
        <div className="container">
            <h1>Fridge Alchemist</h1>
            <div className="card-grid">
                {data?.map(foodData =>
                    <Card
                        name={foodData.name}
                        quant={foodData.quant}
                        expiration={foodData.expiration}
                    />
                )}
            </div>
            {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
            <button onClick={handleOpenModal}>Novo item</button>
        </div>

    )
}

export default App

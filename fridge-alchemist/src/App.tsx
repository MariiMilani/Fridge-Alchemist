import './App.css'
import {Card} from "./components/card/card.tsx";
import {useFoodData} from "./hooks/useFoodData.ts";
import {useState} from "react";
import {CreateModal} from "./components/modal/create-modal.tsx";

function App() {
    const {data} = useFoodData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    }

    const dataByCategory = data?.reduce((acc, foodData) => {

        let category;

        if (foodData.category === "PROTEIN") {
            category = "Proteínas";
        } else if (foodData.category === "FRUIT_VEGETABLE") {
            category = "Frutas e Vegetais";
        } else if (foodData.category === "FAT_OIL") {
            category = "Gorduras e óleos";
        } else if (foodData.category === "DAIRY") {
            category = "Laticínios";
        } else {
            category = "Carboidratos";
        }


        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(foodData);
        return acc;
    }, {} as Record<string, typeof data>);

    return (
        <div className="container">
            <h1>Fridge Alchemist</h1>
            <div className="content-container">
                <div className="content">
                    {Object.entries(dataByCategory || {}).map(([category, categoryData]) => (
                        <div key={category}>
                            <div className="category-header">
                                <h2>{category}</h2>
                            </div>
                            <div className="card-grid">
                                {categoryData.map(foodData =>
                                    <Card
                                        key={foodData.id}
                                        id={foodData.id!}
                                        name={foodData.name}
                                        category={foodData.category}
                                        quant={foodData.quant}
                                        expiration={foodData.expiration}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="aside-grid">
                    <div>Teste: Esta é uma receita
                        <br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
                <button className="button-new-item" onClick={handleOpenModal}>Novo item</button>
            </div>
        </div>

    )
}

export default App

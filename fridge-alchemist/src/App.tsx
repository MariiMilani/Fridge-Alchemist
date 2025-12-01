import './App.css'
import {Card} from "./components/card/card.tsx";
import {useFoodData} from "./hooks/foodData/useFoodData.ts";
import {useState} from "react";
import {CreateModal} from "./components/modal/create-modal.tsx";
import {useRecipe} from "./hooks/recipe/useRecipe.ts";
import {Aside} from "./components/aside/aside.tsx";

function App() {
    const {data} = useFoodData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {recipe, fetchRecipe, isLoading, isError, error} = useRecipe();

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev);
    }

    const handleGenerateRecipe = async () => {
        try {
            await fetchRecipe();
        } catch (err) {
            console.error("Erro ao gerar receita: ", err);
        }
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
                    <div>
                        {isLoading && <p>Gerando receita...</p>}
                        {isError && <p>Erro ao gerar a receita: {error?.message}</p>}
                        {recipe && <Aside recipe={recipe}/>}
                        <br/>
                        <button onClick={handleGenerateRecipe} disabled={isLoading}>
                            {isLoading ? 'Gerando...' : 'Gerar receita'}
                        </button>
                    </div>
                </div>
                {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
                <button className="button-new-item" onClick={handleOpenModal}>Novo item</button>
            </div>
        </div>

    )
}

export default App

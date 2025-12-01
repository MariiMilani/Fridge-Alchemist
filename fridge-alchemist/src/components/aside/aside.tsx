interface AsideProps {
    recipe: string
}

export function Aside({recipe}: AsideProps) {
    return (
        <div className="recipe-container">
            <h3>Receita sugerida:</h3>
            <div className="recipe-content">
                {recipe.split('/').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    )
}
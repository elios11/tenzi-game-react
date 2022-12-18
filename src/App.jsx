import { useState } from "react"
import Die from "./components/Die/Die"

export default function App() {
    function generateDice() {
        let randomDiceArray = []
        for (let i = 0; i < 10; i++) {
            randomDiceArray.push(Math.ceil(Math.random() * 6))
        }
        return randomDiceArray;
    }

    const [dice, setDice] = useState(() => generateDice())
    const diceElements = dice.map((die, index) => {
        return <Die key={index} value={die} />
    })

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
        </main>
    )
}
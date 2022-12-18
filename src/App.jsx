import { useState } from "react"
import Die from "./components/Die/Die"

export default function App() {
    const [dice, setDice] = useState(() => generateDice())

    function generateDice() {
        let randomDiceArray = []
        for (let i = 0; i < 10; i++) {
            randomDiceArray.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return randomDiceArray;
    }

    function reRollDice() {
        setDice(generateDice())
    }

    const diceElements = dice.map((die, index) => {
        return <Die key={index} value={die.value} />
    })

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button type="button" className="roll-button" onClick={reRollDice}>
                Roll
            </button>
        </main>
    )
}
import { useState } from "react"
import Die from "./components/Die/Die"
import { nanoid } from "nanoid"

export default function App() {
    const [dice, setDice] = useState(() => generateDice())

    function generateDice() {
        let randomDiceArray = []
        for (let i = 0; i < 10; i++) {
            randomDiceArray.push({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return randomDiceArray;
    }

    function reRollDice() {
        setDice(generateDice())
    }

    const diceElements = dice.map(die => {
        return <Die key={die.id}
                    value={die.value}
                    isHeld={die.isHeld}
                />
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
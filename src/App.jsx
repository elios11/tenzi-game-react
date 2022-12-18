import { useEffect, useState } from "react"
import Die from "./components/Die/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import WindowSize from "./components/WindowSize"

export default function App() {
    const [dice, setDice] = useState(() => generateDice())
    const [tenzi, setTenzi] = useState(false)
    const { width, heigth } = WindowSize()

    useEffect(() => {
        let allHeld = true
        let allEquals = true

        dice.map(die => {
            if (die.value !== dice[0].value) {
                allEquals = false
            }
            if (!die.isHeld) {
                allHeld = false
            }
        })

        if (allHeld && allEquals) {
            setTenzi(true)
        }
    }, [dice])


    function createNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    function generateDice() {
        let randomDiceArray = []
        for (let i = 0; i < 10; i++) {
            randomDiceArray.push(createNewDie())
        }
        return randomDiceArray;
    }

    function rerollDice() {
        setDice(prevDice => (
            prevDice.map(die => {
                return die.isHeld
                    ? die
                    : createNewDie()
            })
        ))
    }

    function holdDice(id) {
        setDice(prevDice => (
            prevDice.map(die => {
                return die.id === id
                    ? {...die, isHeld: !die.isHeld}
                    : die
            })
        ))
    }

    function resetGame() {
        setDice(generateDice())
        setTenzi(false)
    }

    const diceElements = dice.map(die => {
        return <Die key={die.id}
                    id={die.id}
                    value={die.value}
                    holdDice={holdDice}
                    isHeld={die.isHeld}
                />
    })

    return (
        <main>
            {tenzi && <Confetti width={width} height={heigth} />}
            <h1 className="game-title">Tenzi</h1>
            <p className="game-instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button type="button" 
                    className="roll-button"
                    onClick={tenzi ? resetGame : rerollDice}
            >
                {tenzi ? "New Game" : "Roll"}
            </button>
        </main>
    )
}
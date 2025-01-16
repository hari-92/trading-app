'use client'
import useGameLogic from "@/hooks/puzzle/useGameLogic";
import {useEffect} from "react";
import GameHeader from "@/components/game/puzzle/GameHeader";
import {GameBoard} from "@/components/game/puzzle/GameBoard";
import GameControls from "@/components/game/puzzle/GameControls";

export const PlayGame = () => {
    const {
        board,
        score,
        gameOver,
        initGame,
        moveUp,
        moveDown,
        moveLeft,
        moveRight
    } = useGameLogic()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!gameOver) {
                switch (event.key) {
                    case 'ArrowUp': moveUp(); break
                    case 'ArrowDown': moveDown(); break
                    case 'ArrowLeft': moveLeft(); break
                    case 'ArrowRight': moveRight(); break
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [board, gameOver])

    const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
        switch (direction) {
            case 'up': moveUp(); break
            case 'down': moveDown(); break
            case 'left': moveLeft(); break
            case 'right': moveRight(); break
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <GameHeader score={score} onNewGame={initGame} />
            <GameBoard board={board} />
            <GameControls onMove={handleMove} />

            {gameOver && (
                <div className="mt-4 text-xl font-bold text-red-500">
                    Game Over!
                </div>
            )}
        </div>
    )
}
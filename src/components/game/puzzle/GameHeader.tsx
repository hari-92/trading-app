interface GameHeaderProps {
    score: number
    onNewGame: () => void
}

const GameHeader = ({ score, onNewGame }: GameHeaderProps) => {
    return (
        <div className="mb-4 flex justify-between w-full max-w-md">
            <div className="text-2xl font-bold">2048</div>
            <div className="flex gap-4">
                <div className="bg-gray-200 p-2 rounded">
                    <div className="text-sm">Score</div>
                    <div className="font-bold">{score}</div>
                </div>
                <button
                    onClick={onNewGame}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    New Game
                </button>
            </div>
        </div>
    )
}

export default GameHeader

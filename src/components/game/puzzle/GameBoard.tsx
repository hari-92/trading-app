interface GameBoardProps {
    board: number[][]
}

export const GameBoard = ({board}: GameBoardProps) => {
    const getTileColor = (value: number): string => {
        const colors: {[key: number]: string} = {
            2: 'bg-gray-200',
            4: 'bg-gray-300',
            8: 'bg-orange-200',
            16: 'bg-orange-300',
            32: 'bg-orange-400',
            64: 'bg-orange-500',
            128: 'bg-yellow-200',
            256: 'bg-yellow-300',
            512: 'bg-yellow-400',
            1024: 'bg-yellow-500',
            2048: 'bg-yellow-600',
        }
        return colors[value] || 'bg-gray-100'
    }

    const getTextColor = (value: number): string => {
        return value <= 4 ? 'text-gray-700' : 'text-white'
    }

    const getTextSize = (value: number): string => {
        return value >= 1000 ? 'text-2xl' : 'text-3xl'
    }

    return (
        <div className="bg-gray-300 p-4 rounded-lg">
            <div className="grid grid-cols-4 gap-4">
                {board.map((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`
                                w-20 h-20 
                                flex items-center justify-center 
                                rounded-lg
                                ${getTileColor(cell)}
                                ${getTextColor(cell)}
                                font-bold
                                transition-all duration-100
                                ${cell === 0 ? 'bg-gray-400' : ''}
                            `}
                        >
                            <span className={getTextSize(cell)}>
                                {cell !== 0 ? cell : ''}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
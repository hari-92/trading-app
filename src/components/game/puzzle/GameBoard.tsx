interface GameBoardProps {
    board: number[][]
}

export const GameBoard = ({board}: GameBoardProps) => {
    const size = board.length;

    const getTileSize = () => {
        const sizes: { [key: number]: string } = {
            4: 'w-20 h-20',
            5: 'w-16 h-16',
            6: 'w-14 h-14',
            7: 'w-12 h-12',
            8: 'w-11 h-11',
            9: 'w-10 h-10',
            10: 'w-9 h-9'
        };
        return sizes[size] || 'w-8 h-8';
    }

    const getFontSize = (value: number): string => {
        if (size <= 4) return value >= 1000 ? 'text-2xl' : 'text-3xl';
        if (size <= 6) return value >= 1000 ? 'text-xl' : 'text-2xl';
        if (size <= 8) return value >= 1000 ? 'text-lg' : 'text-xl';
        return value >= 1000 ? 'text-sm' : 'text-base';
    }

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

    return (
        <div className="bg-gray-300 p-4 rounded-lg">
            <div className={`grid gap-2`}
                 style={{
                     gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                 }}>
                {board.map((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`
                                ${getTileSize()}
                                flex items-center justify-center 
                                rounded-lg
                                ${getTileColor(cell)}
                                ${getTextColor(cell)}
                                font-bold
                                transition-all duration-100
                                ${cell === 0 ? 'bg-gray-400' : ''}
                            `}
                        >
                            <span className={getFontSize(cell)}>
                                {cell !== 0 ? cell : ''}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
interface GameControlsProps {
    onMove: (direction: 'up' | 'down' | 'left' | 'right') => void
}

const GameControls = ({ onMove }: GameControlsProps) => {
    return (
        <div className="md:hidden mt-8 grid grid-cols-3 gap-2">
            <div></div>
            <button
                onClick={() => onMove('up')}
                className="bg-gray-200 p-4 rounded"
            >
                ↑
            </button>
            <div></div>
            <button
                onClick={() => onMove('left')}
                className="bg-gray-200 p-4 rounded"
            >
                ←
            </button>
            <button
                onClick={() => onMove('down')}
                className="bg-gray-200 p-4 rounded"
            >
                ↓
            </button>
            <button
                onClick={() => onMove('right')}
                className="bg-gray-200 p-4 rounded"
            >
                →
            </button>
        </div>
    )
}

export default GameControls

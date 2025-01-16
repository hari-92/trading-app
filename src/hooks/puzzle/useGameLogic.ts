'use client'
import { useState } from 'react'

const useGameLogic = () => {
    const [board, setBoard] = useState<number[][]>(Array(4).fill(0).map(() => Array(4).fill(0)))
    const [score, setScore] = useState<number>(0)
    const [gameOver, setGameOver] = useState<boolean>(false)

    const initGame = () => {
        const newBoard = Array(4).fill(0).map(() => Array(4).fill(0))
        addNewTile(newBoard)
        addNewTile(newBoard)
        setBoard(newBoard)
        setScore(0)
        setGameOver(false)
    }

    const addNewTile = (currentBoard: number[][]) => {
        const emptyCells = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (currentBoard[i][j] === 0) {
                    emptyCells.push({ x: i, y: j })
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            currentBoard[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4
        }
    }

    // Helper function để nén một hàng/cột
    const compress = (line: number[]): number[] => {
        // Loại bỏ số 0
        const nonZero = line.filter(cell => cell !== 0)
        // Thêm số 0 vào cuối
        const zeros = Array(4 - nonZero.length).fill(0)
        return nonZero.concat(zeros)
    }

    // Helper function để merge các số giống nhau
    const merge = (line: number[]): number[] => {
        for (let i = 0; i < 3; i++) {
            if (line[i] !== 0 && line[i] === line[i + 1]) {
                line[i] = line[i] * 2
                line[i + 1] = 0
                setScore(prev => prev + line[i]) // Cộng điểm
            }
        }
        return compress(line) // Nén lại sau khi merge
    }

    const moveLeft = () => {
        const newBoard = board.map(row => {
            const compressed = compress(row)
            return merge(compressed)
        })

        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            setBoard(newBoard)
            addNewTile(newBoard)
            checkGameOver(newBoard)
        }
    }

    const moveRight = () => {
        const newBoard = board.map(row => {
            const reversed = row.slice().reverse()
            const compressed = compress(reversed)
            const merged = merge(compressed)
            return merged.reverse()
        })

        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            setBoard(newBoard)
            addNewTile(newBoard)
            checkGameOver(newBoard)
        }
    }

    const moveDown = () => {
        const rotated = rotateBoard(board)
        const newBoard = rotated.map(row => {
            const compressed = compress(row)
            return merge(compressed)
        })
        const rotatedBack = rotateBoard(rotateBoard(rotateBoard(newBoard)))

        if (JSON.stringify(rotatedBack) !== JSON.stringify(board)) {
            setBoard(rotatedBack)
            addNewTile(rotatedBack)
            checkGameOver(rotatedBack)
        }
    }

    const moveUp = () => {
        const rotated = rotateBoard(board)
        const newBoard = rotated.map(row => {
            const reversed = row.slice().reverse()
            const compressed = compress(reversed)
            const merged = merge(compressed)
            return merged.reverse()
        })
        const rotatedBack = rotateBoard(rotateBoard(rotateBoard(newBoard)))

        if (JSON.stringify(rotatedBack) !== JSON.stringify(board)) {
            setBoard(rotatedBack)
            addNewTile(rotatedBack)
            checkGameOver(rotatedBack)
        }
    }

    // Helper function để xoay board 90 độ (cho moveUp và moveDown)
    const rotateBoard = (board: number[][]): number[][] => {
        const N = board.length
        const rotated = Array(N).fill(0).map(() => Array(N).fill(0))

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                rotated[i][j] = board[N - j - 1][i]
            }
        }

        return rotated
    }

    // Kiểm tra game over
    const checkGameOver = (currentBoard: number[][]) => {
        // Kiểm tra còn ô trống
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (currentBoard[i][j] === 0) return
            }
        }

        // Kiểm tra có thể merge không
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (currentBoard[i][j] === currentBoard[i][j + 1]) return
                if (currentBoard[j][i] === currentBoard[j + 1][i]) return
            }
        }

        setGameOver(true)
    }


    return {
        board,
        score,
        gameOver,
        initGame,
        moveLeft,
        moveRight,
        moveUp,
        moveDown
    }
}

export default useGameLogic

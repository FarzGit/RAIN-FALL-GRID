// src/RainGrid.js

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LightenColor } from '../colorUtils';


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 20px);
  grid-template-rows: repeat(15, 20px);
  gap: 2px;
  justify-content: center;
  margin: 50px auto;
  background-color: black;
`;

const Square = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color || 'black'};
  border: 1px solid #333;
  transition: background-color 0.2s, transform 0.2s;
  transform: ${props => (props.isDrop ? 'translateY(20px)' : 'none')};
`;

const RainGrid = () => {
    const getRandomColor = () => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#33FFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const [grid, setGrid] = useState(Array.from({ length: 15 }, () => Array(20).fill({ color: 'black' })));
    const [currentColors, setCurrentColors] = useState(Array(6).fill(getRandomColor()));
    const [isCurrentSetFinished, setIsCurrentSetFinished] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map(row => row.map(cell => ({ ...cell, color: 'black', isDrop: false })));

                let allDropsExited = true;

                for (let col = 0; col < 20; col++) {
                    if (prevGrid[0][col].isDrop) {
                        allDropsExited = false;
                    }

                    for (let row = 14; row >= 0; row--) {
                        if (prevGrid[row][col].isDrop) {
                            if (row < 14) {
                                newGrid[row + 1][col] = { ...prevGrid[row][col] };
                            }
                            newGrid[row][col] = { color: 'black', isDrop: false };
                        }
                    }
                }

                if (allDropsExited) {
                    setIsCurrentSetFinished(true);
                }

                if (isCurrentSetFinished) {
                    const newColors = currentColors.map(() => getRandomColor());
                    setCurrentColors(newColors);
                    const dropLength = 6;
                    for (let k = 0; k < 6; k++) {
                        const randomColumn = Math.floor(Math.random() * 20);
                        for (let i = 0; i < dropLength; i++) {
                            const fadedColor = LightenColor(newColors[k], i * 10);
                            newGrid[i][randomColumn] = { color: fadedColor, isDrop: true };
                        }
                    }
                    setIsCurrentSetFinished(false);
                }

                return newGrid;
            });
        }, 50); 
        return () => clearInterval(interval);
    }, [currentColors, isCurrentSetFinished]);


    return (
        <GridContainer>
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Square key={`${rowIndex}-${colIndex}`} color={cell.color} />
                ))
            )}
        </GridContainer>
    );
};

export default RainGrid;

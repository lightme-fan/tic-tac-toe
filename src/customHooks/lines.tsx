export function horizontalLine(boards: any, horizontal: any) {
    if (boards[0] === 'X' && boards[1] === 'X' && boards[2] === 'X') {
      horizontal('167px')
    } else if (boards[3] === 'X' && boards[4] === 'X' && boards[5] === 'X') {
      horizontal('268px')
    } else if (boards[6] === 'X' && boards[7] === 'X' && boards[8] === 'X') {
      horizontal('375px')
    } else if (boards[0] === 'O' && boards[1] === 'O' && boards[2] === 'O') {
      horizontal('167px')
    } else if (boards[3] === 'O' && boards[4] === 'O' && boards[5] === 'O') {
      horizontal('268px')
    } else if (boards[6] === 'O' && boards[7] === 'O' && boards[8] === 'O') {
      horizontal('375px')
    }
  }

export function verticalLine(boards: any, vertical: any) {
    if (boards[0] === 'X' && boards[3] === 'X' && boards[6] === 'X') {
      vertical('16%')
    } else if (boards[1] === 'X' && boards[4] === 'X' && boards[7] === 'X') {
      vertical('50%')
    } else if (boards[2] === 'X' && boards[5] === 'X' && boards[8] === 'X') {
      vertical('84%')
    } else if (boards[0] === 'O' && boards[3] === 'O' && boards[6] === 'O') {
      vertical('16%')      
    } else if (boards[1] === 'O' && boards[4] === 'O' && boards[7] === 'O') {
      vertical('50%')
    } else if (boards[2] === 'O' && boards[5] === 'O' && boards[8] === 'O') {
      vertical('84%')
    }
  }

export function diagonalLine(boards: any, diagonal: any) {
    if (boards[0] === 'X' && boards[4] === 'X' && boards[8] === 'X') {
      diagonal('-45deg')
    } else if (boards[2] === 'X' && boards[4] === 'X' && boards[6] === 'X') {
      diagonal('45deg')
    } else if (boards[0] === 'O' && boards[4] === 'O' && boards[8] === 'O') {
      diagonal('-45deg')
    } else if (boards[2] === 'O' && boards[4] === 'O' && boards[6] === 'O') {
      diagonal('45deg')
    }
  }

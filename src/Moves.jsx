const validCell = (x,y) => {
    return x>=0 && x<=7 && y>=0 && y<=7
} 
const whitep = ['P','B','N','R','Q','K'];
const blackp = ['p','b','n','r','q','k'];

const getPawnMoves = (x,y,board,isWhite) => { 
    const validMoves = [];
    const direction = isWhite ? -1:1;
    const pieces = isWhite ? blackp : whitep;
    if(validCell(x+direction,y) && board[x+direction][y]=='-'){
        validMoves.push([x+direction,y])

        if((isWhite && x == 6) || (!isWhite && x == 1)){
            if(validCell(x+2*direction,y) && board[x+2*direction][y]=='-')
                validMoves.push([x+2*direction,y]);
        }
    }

    if(validCell(x+direction,y-1) && board[x+direction][y-1]!='-' && pieces.includes(board[x+direction][y-1]))
        validMoves.push([x+direction,y-1]);
    if(validCell(x+direction,y+1) && board[x+direction][y+1]!='-' && pieces.includes(board[x+direction][y+1]))
        validMoves.push([x+direction,y+1]);

    return validMoves;

}

const getRookMoves = (x,y,board,isWhite) => {
    const validMoves = []
    const directions = [
        [1,0],[-1,0],[0,1],[0,-1]
    ];
    const pieces = isWhite ? blackp : whitep;
    
    

    for(const [dx,dy] of directions){
        let i = x + dx;
        let j = y + dy;
        while(validCell(i,j)){
            if(board[i][j]=='-'){
                validMoves.push([i,j])
            }
            else{
                if(pieces.includes(board[i][j]))
                    validMoves.push([i,j])
                break;
            }
            i += dx;
            j += dy;
        }
    }
    return validMoves;
}

const getKnightMoves = (x,y,board,isWhite) => {
    const validMoves = []
    const directions = [
        [2,1],[2,-1],[-2,1],[-2,-1],[-1,2],[-1,-2],[1,2],[1,-2]
    ];
    const pieces = isWhite ? blackp : whitep;

    for(const [dx,dy] of directions){
        const i = x + dx;
        const j = y + dy;
        if(validCell(i,j)){
            if(board[i][j]=='-' || pieces.includes(board[i][j]))
                validMoves.push([i,j])
        }
    }
    return validMoves;

}

const getBishopMoves = (x,y,board,isWhite) => {
    const validMoves = []
    const directions = [
        [1,1],[1,-1],[-1,1],[-1,-1],
    ];
    const pieces = isWhite ? blackp : whitep;
    for(const [dx,dy] of directions){
        let i = x + dx;
        let j = y + dy;
        while(validCell(i,j)){
            if(board[i][j]=='-'){
                validMoves.push([i,j])
            }
            else{
                if(pieces.includes(board[i][j]))
                    validMoves.push([i,j])
                break;
            }
            i += dx;
            j += dy;
        } 
    }
    return validMoves;
}

const getKingMoves = (x,y,board,isWhite) => {
    const validMoves = []
    const directions = [
        [-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]
    ];
    const pieces = isWhite ? blackp : whitep;
    for(const [dx,dy] of directions){
        const i = x + dx;
        const j = y + dy;
        if(validCell(i,j)){
            if(board[i][j]=='-' || pieces.includes(board[i][j]))
                validMoves.push([i,j]);
        }
    }
    return validMoves;

}

const getQueenMoves = (x,y,board,isWhite) => {
    let rookMoves = getRookMoves(x,y,board,isWhite);
    let bishopMoves = getBishopMoves(x,y,board,isWhite);
    return rookMoves.concat(bishopMoves);
}

export const findKing = (board,isWhite) => {
    const king = isWhite ? 'K' : 'k';
    for(let r=0;r<=7;r++){
        for(let c=0;c<=7;c++){
            if(board[r][c]==king)
                return [r,c];
        }
    }
    return null;
}

export const getMoves = (x,y,board) => {
    const piece = board[x][y];
    if(piece == '-')
        return [];

    const isWhite = whitep.includes(piece);
    switch(piece.toLowerCase()){
        case 'p': return getPawnMoves(x,y,board,isWhite);
        case 'n': return getKnightMoves(x,y,board,isWhite);
        case 'b': return getBishopMoves(x,y,board,isWhite);
        case 'r': return getRookMoves(x,y,board,isWhite);
        case 'q': return getQueenMoves(x,y,board,isWhite);
        case 'k': return getKingMoves(x,y,board,isWhite);
        default: return [];
    }
    
}
const getPawnAttackingMoves = (x,y,board,isWhite) => { 
    const validMoves = [];
    const direction = isWhite ? -1:1;
    const pieces = isWhite ? blackp : whitep;

    if(validCell(x+direction,y-1))
        validMoves.push([x+direction,y-1]);
    if(validCell(x+direction,y+1))
        validMoves.push([x+direction,y+1]);

  //  console.log(`${x} ${y}`)
 //   console.log(validMoves.length);
    
    return validMoves;

}
export const getAttackingMoves = (x,y,board) => {
    const piece = board[x][y];
    if(piece == '-')
        return [];

    const isWhite = whitep.includes(piece);
    switch(piece.toLowerCase()){
        case 'p': return getPawnAttackingMoves(x,y,board,isWhite);
        case 'n': return getKnightMoves(x,y,board,isWhite);
        case 'b': return getBishopMoves(x,y,board,isWhite);
        case 'r': return getRookMoves(x,y,board,isWhite);
        case 'q': return getQueenMoves(x,y,board,isWhite);
        case 'k': return getKingMoves(x,y,board,isWhite);
        default: return [];
    }
    
}




export const isCellAttacked = (x,y,board,isWhite) => {
    const attacking = isWhite ? blackp : whitep;
    for(let r=0;r<=7;r++){
        for(let c=0;c<=7;c++){
            const piece = board[r][c];
            if(piece!='-' && attacking.includes(piece)){
               const moves = getAttackingMoves(r,c,board);
               if(moves.some(([mx,my])=> mx == x && my == y )){
                    return true;
               }
            }
        }
    }
    return false;
}

export const isMoveLegal = (board,from,to) => {
    const piece = board[from.r][from.c];
    if(piece=='-')
        return false;
    var newBoard = board.map(row=>[...row]);
    newBoard[to.r][to.c] = piece;
    newBoard[from.r][from.c] = '-';
    const isWhite = whitep.includes(piece);
    const [kr,kc] = findKing(newBoard,isWhite);
    
    const isKingInCheck = isCellAttacked(kr,kc,newBoard,isWhite);
    return !isKingInCheck;
    
}

export const isMoveLegal2 = (board,fr,fc,tr,tc) => {
    const piece = board[fr][fc];
    if(piece=='-')
        return false;
    var newBoard = board.map(row=>[...row]);
    newBoard[tr][tc] = piece;
    newBoard[fr][fc] = '-';
    const isWhite = whitep.includes(piece);
    const [kr,kc] = findKing(newBoard,isWhite);
    
    const isKingInCheck = isCellAttacked(kr,kc,newBoard,isWhite);
    return !isKingInCheck;
    
}


export const canDropPiece = (payload,board,whiteMove) => {
     const {from,to,piece} = payload;
     if((whiteMove && blackp.includes(piece))||(!whiteMove && whitep.includes(piece))){
        return false;
     }
     const validMoves = getMoves(from.r,from.c,board);
    // console.log(to)
    // console.log(validMoves);
    if(validMoves.some(([x,y])=> to.r==x && to.c==y)){
        if(isMoveLegal(board,from,to))
            return true;
        else
            return false;
    }
    else{
        return false;
    }



}




export const getAllLegalMoves = (board,forWhite) => {
    var legalMoves = 0;
    const pieces = forWhite ? blackp : whitep;
    for(let r=0;r<=7;r++){
        for(let c=0;c<=7;c++){
            const piece = board[r][c];
            if(piece!='-' && pieces.includes(piece)){
                var moves = getMoves(r,c,board);
              moves.forEach(([x,y]) => {
                if(isMoveLegal2(board,r,c,x,y)){
                    legalMoves += 1;
                }
              })
            }
        }
    }
    return legalMoves;
}

export const isKingInCheck = (board,isWhite)=>{
    const [kx,ky] = findKing(board,isWhite);
    return isCellAttacked(kx,ky,board,isWhite);

}
const validCell = (x,y) => {
    return x>=0 && x<=7 && y>=0 && y<=7
} 
const whitep = ['P','B','N','R','Q','K','t'];
const blackp = ['p','b','n','r','q','k','t'];
const cols = ['a','b','c','d','e','f','g','h'];
const mapCols = {
    a:0,
    b:1,
    c:2,
    d:3,
    e:4,
    f:5,
    g:6,
    h:7,
};

const getPawnMoves = (x,y,board,isWhite) => { 
    const validMoves = [];
    const direction = isWhite ? -1:1;
    const pieces = isWhite ? blackp.slice(0,-1) : whitep.slice(0,-1);
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
    const pieces = isWhite ? blackp.slice(0,-1) : whitep.slice(0,-1);
    
    

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
    const pieces = isWhite ? blackp.slice(0,-1) : whitep.slice(0,-1);

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
    const pieces = isWhite ? blackp.slice(0,-1) : whitep.slice(0,-1);
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
    const pieces = isWhite ? blackp.slice(0,-1) : whitep.slice(0,-1);
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
    console.log(validMoves);
    console.log(board);
    
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

export const isPromotion = (fr,tr,p) => {
    
    if(p == 'p' && fr == 6 && tr == 7)
        return true;
    if(p == 'P' && fr == 1 && tr == 0)
        return true;
    return false;
}

export const isDoublePawnMove = (fr,tr,p) => {
    if(p == 'p' && fr == 1 && tr == 3)
        return true;
    if(p == 'P' && fr == 6 && tr == 4)
        return true;
    return false;
}

export const canCastle = (board,from,to,castlingRights) => {
    if(from.r==7 && to.r==7 && from.c==4 && to.c==6 && castlingRights[3]=='1'){
        //white kingside
        const attacked = (isCellAttacked(7,4,board,true) || isCellAttacked(7,5,board,true) || isCellAttacked(7,6,board,true));
        const empty = (board[7][5]=='-' && board[7][6]=='-');
        const isRook = board[7][7] == 'R';
        return !attacked && empty && isRook;
    }
    if(from.r==7 && to.r==7 && from.c==4 && to.c==2 && castlingRights[2]=='1'){
        //white queenside
        const attacked = (isCellAttacked(7,4,board,true) || isCellAttacked(7,3,board,true) || isCellAttacked(7,2,board,true) || isCellAttacked(7,1,board,true));
        const empty = (board[7][3]=='-' && board[7][2]=='-' && board[7][1] == '-');
        const isRook = board[7][0] == 'R';
        return !attacked && empty && isRook;
    }
    if(from.r==0 && to.r==0 && from.c==4 && to.c==6 && castlingRights[1]=='1'){
        //black kingside
        const attacked = (isCellAttacked(0,4,board,false) || isCellAttacked(0,5,board,false) || isCellAttacked(0,6,board,false));
        const empty = (board[0][5]=='-' && board[0][6]=='-');
        const isRook = board[0][7] == 'r';
        return !attacked && empty && isRook;
    }
    if(from.r==0 && to.r==0 && from.c==4 && to.c==2  && castlingRights[0]=='1'){
        //black queenside
        const attacked = (isCellAttacked(0,4,board,false) || isCellAttacked(0,3,board,false) || isCellAttacked(0,2,board,false));
        const empty = (board[0][3]=='-' && board[0][2]=='-' && board[0][1]=='-');
        const isRook = board[0][0] == 'r';
        return !attacked && empty && isRook;
    }
        
    return false;
}

export const mapMove = (from,to,piece,boardBefore,boardAfter) => {
    var x = "";
    var plus = "";
    const r = 8 - to.r
    const whiteMove = !whitep.includes(piece);
   
    if(piece.toLowerCase() == 'p'){
        return  (boardBefore[to.r][to.c]!='-'?  cols[from.c] + "x" : "") + cols[to.c] + "" + r + (isKingInCheck(boardAfter,whiteMove) ? "+" : "");
    }
    

    if(boardBefore[to.r][to.c]!='-')
        x = "x";
    if(isKingInCheck(boardAfter,whiteMove)){
        plus="+";
    }
    
    return piece + "" + x + "" + cols[to.c] + "" + r + "" + plus;
}


export const toFen = (board,whiteMove,castlingRights,moveNumber,lastMove) => {
    var fen = ""
    var nuls = 0;
   // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    for(let r=0;r<=7;r++){
        nuls = 0;
        for(let c=0;c<=7;c++){
            if(whitep.slice(0,-1).includes(board[r][c]) || blackp.slice(0,-1).includes(board[r][c])){
                if(nuls>0){
                    fen += nuls;
                    nuls = 0;
                }
                fen += board[r][c];
                
               
            }
            else{
                nuls++;
            }
        }
        if(nuls>0){
            fen+= nuls;
            nuls = 0;
        }
        if(r<7){
            fen += "/";
        }  
        
            
    }
    fen += ' ';
    fen += whiteMove==true ? 'w' : 'b';
    fen += ' ';
    fen += castlingRights[3] === '1' ? 'K' : '-';
    fen += castlingRights[2] === '1' ? 'Q' : '-';
    fen += castlingRights[1] === '1' ? 'k' : '-';
    fen += castlingRights[0] === '1' ? 'q' : '-';
    fen += ' ';
    if(!lastMove)
        fen += '-';
    else{
        const {from,to} = lastMove;
            if(Math.abs(from.r-to.r)==2 && from.c==to.c && board[to.r][to.c].toLowerCase()==='p'){
                if(whitep.includes(board[to.r][to.c])){
                    console.log(board[to.r][to.c]);
                    
                    fen += cols[to.c] + '' + (7-to.r)
                }
                else{
                    console.log("bkack");
                    console.log(from.r,to.r);
                    
                    fen += cols[to.c] + '' + (7-to.r+2)
                }
            }
            else{
                fen += '-';
            }

            fen += ' ';
            fen += "0";
            fen += ' ';
            fen += moveNumber;
    }
    

    return fen;
}


export const fromStockFish = (move,board) => {
    // e2e4
    const fc = mapCols[move[0]];
    const fr = 8-move[1];
    const tc = mapCols[move[2]];
    const tr = 8-move[3];


    
    const payload = {
        from:{
            r: fr,
            c: fc,
        },
        to: {
            r: tr,
            c: tc,
        },
        piece: board[fr][fc],
    }
    return payload
    
}

export const isViable = (move) => {
    const fc = mapCols[move[0]];
    const fr = 8-move[1];
    const tc = mapCols[move[2]];
    const tr = 8-move[3];       
}

export const isCastle = (payload) => {
    const {from,to,piece} = payload;
    if(piece.toLowerCase()==='k' && Math.abs(from.c-to.c)>1)
        return true;
    return false;
}

export const getEval = (message,whiteMove) => {
    let result = {move: "",evaluation:""}
    if(message.startsWith("bestmove")){
        result.move = message.split(" ")[1];
    }
    if(message.includes("info") && message.includes("score")){
        const parts = message.split(" ");
        const idx = parts.indexOf("score") + 2;

        if(parts[idx-1]==="cp"){
            let score = parseInt(parts[idx],10);
            if(!whiteMove){
                score *= -1;
            }
            result.evaluation = `${score/100}`;
        }
        else if(parts[idx-1]==="mate"){
            const mate = parseInt(parts[idx],10);
            result.evaluation = `M${Math.abs(mate)}`
        }
    }
    return result
}
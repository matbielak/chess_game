
export const dropPiece = (payload,board,whiteMove) => {
    const {from,to,piece} = payload;
    console.log(`dropPiece: ${from.r} ${from.c} ->  ${to.r} ${to.c} ${whiteMove}`);
    const black=['b','n','r','k','q','p'];
    const white=['B','N','R','K','Q','P'];
    if(whiteMove && black.includes(piece))
        return false;
    if(!whiteMove && white.includes(piece))
        return false;
    if(piece == 'k' || piece == 'K'){
       return kingMove(payload,board,whiteMove);
    }
    if(piece == 'P'){
       return whitePawnMove(payload,board,whiteMove)
    }
    if(piece == 'p'){
        return blackPawnMove(payload,board, whiteMove)
    }
    if(piece == 'r' || piece == 'R'){ 
        return rookMove(payload,board,whiteMove)
    }
    if(piece == 'n' || piece == 'N'){
        return knightMove(payload,board,whiteMove)
    }
    if(piece == 'b' || piece == 'B'){
        return bishopMove(payload,board,whiteMove)
    }
    if(piece == 'q' || piece == 'Q'){
        if(bishopMove(payload,board,whiteMove)==true){
            console.log("Queen bs bishop");
            
             return true;
        }     
        else 
        if(rookMove(payload,board,whiteMove)==true){
            console.log("Queen bs rook");
            return true;
        }
        return false;
    }
    return false;
}

const rookMove = (payload,board,whiteMove) => {
    const {from,to,piece} = payload;
    const black=['b','n','r','k','q','p'];
    const white=['B','N','R','K','Q','P'];
   // const blocking = whiteMove==true ? 
    if((piece == 'r' || piece == 'q') && whiteMove==true)
        return false;
    if((piece == 'R' || piece == 'Q') && whiteMove==false)
        return false;

    if(from.r == to.r){
        // horizontal
        if(from.c < to.c){
            for(let i = from.c+1;i<to.c;i++){
                if(board[from.r][i]!='-')
                    return false;
            }
            if((piece == 'r' || piece == 'q') && black.includes(board[from.r][to.c]))
                return false;
            if((piece == 'R' || piece == 'Q') && white.includes(board[from.r][to.c]))
                return false;
            return true;
        }
        if(from.c > to.c){
            for(let i = from.c-1;i>to.c;i--){
                if(board[from.r][i]!='-')
                    return false;
            }
            if((piece == 'r' || piece == 'q') && black.includes(board[from.r][to.c]))
                return false;
            if((piece == 'R' || piece == 'Q') && white.includes(board[from.r][to.c]))
                return false;
            return true; 
        }
         return true;
    }
    else if(from.c == to.c){
        // vertical
        if(from.r < to.r){
            for(let i = from.r+1;i<to.r;i++){
                if(board[i][from.c]!='-')
                    return false;
            }
            if((piece == 'r' || piece == 'q') && black.includes(board[to.r][to.c]))
                return false;
            if((piece == 'R' || piece == 'Q') && white.includes(board[to.r][to.c]))
                return false;
            return true;
        }
        if(from.r > to.r){
            for(let i = from.r-1;i>to.r;i--){
                if(board[i][from.c]!='-')
                    return false;
            }
            if((piece == 'r' || piece == 'q') && black.includes(board[to.r][to.c]))
                return false;
            if((piece == 'R' || piece == 'Q') && white.includes(board[to.r][to.c]))
                return false;
            return true; 
        }
         return true;
    }
       
    else
        return false;

}

const knightMove = (payload,board,whiteMove) => {
    const {from,to,piece} = payload;
    const black=['b','n','r','k','q','p'];
    const white=['B','N','R','K','Q','P'];

    const dr = Math.abs(from.r - to.r);
    const dc = Math.abs(from.c - to.c);
    if(piece == 'N' && white.includes(board[to.r][to.c])){
        return false;
    }
    if(piece == 'n' && black.includes(board[to.r][to.c])){
        return false;
    }
    if((dr == 2 && dc == 1) || (dr == 1 && dc == 2)){
        return true;
    } 
    return false;
}

const bishopMove = (payload,board,whiteMove) => {
    const {from,to,piece} = payload;
    const black=['b','n','r','k','q','p'];
    const white=['B','N','R','K','Q','P'];
    
    const dr = Math.abs(from.r - to.r);
    const dc = Math.abs(from.c - to.c);
    
    if(dr != dc)
        return false;
    if(from.r > to.r && from.c > to.c){
        for(let i=1;i<dr;i++){
                if(board[from.r - i][from.c - i]!='-')
                    return false;
        }
        if((piece == 'B' || piece == 'Q') && black.includes(board[to.r][to.c]))
            return true;
        if((piece == 'b' || piece == 'q') && white.includes(board[to.r][to.c]))
            return true;
        if(board[to.r][to.c]=='-')
            return true;

        return false;

    }
    if(from.r > to.r && from.c < to.c){
        for(let i=1;i<dr;i++){
                if(board[from.r -i][from.c + i]!='-')
                    return false;
        }
        if((piece == 'B' || piece == 'Q') && black.includes(board[to.r][to.c]))
            return true;
        if((piece == 'b' || piece == 'q') && white.includes(board[to.r][to.c]))
            return true;
        if(board[to.r][to.c]=='-')
            return true;

        return false;

    }
    if(from.r < to.r && from.c > to.c){
        for(let i=1;i<dr;i++){
                if(board[from.r + i][from.c - i]!='-')
                    return false;
        }
        if((piece == 'B' || piece == 'Q') && black.includes(board[to.r][to.c]))
            return true;
        if((piece == 'b' || piece == 'q') && white.includes(board[to.r][to.c]))
            return true;
        if(board[to.r][to.c]=='-')
            return true;

        return false;

    }
    if(from.r < to.r && from.c < to.c){
        for(let i=1;i<dr;i++){
                if(board[from.r + i][from.c + i]!='-')
                    return false;
        }
        if((piece == 'B' || piece == 'Q') && black.includes(board[to.r][to.c]))
            return true;
        if((piece == 'b' || piece == 'q') && white.includes(board[to.r][to.c]))
            return true;
        if(board[to.r][to.c]=='-')
            return true;

        return false;

    }

}

const whitePawnMove = (payload,board,whiteMove) => {
    const {from,to,piece} = payload;
    if(!whiteMove)
            return false;
        if(from.r-1>=0 && board[from.r-1][from.c]!='-' && from.c==to.c && from.r==to.r+1)
            return false;
        if(from.c-1>=0 && board[from.r-1][from.c-1]!='-' && from.r==to.r+1 && from.c==to.c+1 && board[from.r-1][from.c-1]!='k')
            return true;
        if(from.c+1<=7 && board[from.r-1][from.c+1]!='-' && from.r==to.r+1 && from.c==to.c-1 && board[from.r-1][from.c+1]!='k')
            return true;
            
        if(from.r==6){
            if(to.r<=6 && to.r>=4 && from.c==to.c)
                return true;
        }
        else{
            if(to.r==from.r-1 && from.c==to.c)
                return true;
        }
        return false;
}

const blackPawnMove = (payload,board,whiteMove) => {
    const {from,to,piece} = payload;
    if(whiteMove)
            return false;
    if(from.r+1<=7 && board[from.r+1][from.c]!='-' && from.c==to.c && from.r==to.r-1)
        return false;
    if(from.c-1>=0 && from.r+1<=7 && board[from.r+1][from.c-1]!='-' && from.r==to.r-1 && from.c==to.c+1 && board[from.r+1][from.c-1]!='K')
        return true;
    if(from.c+1<=7 && from.r+1<=7 && board[from.r+1][from.c+1]!='-' && from.r==to.r-1 && from.c==to.c-1 && board[from.r+1][from.c+1]!='K')
        return true;
        
    if(from.r==1){
        if(to.r<=3 && to.r>=1 && from.c==to.c)
            return true;
    }
    else{
        if(to.r==from.r+1 && from.c==to.c)
            return true;
    }
    return false;
}

const kingMove = (payload,board,whiteMove) =>{
    const {from,to,piece} = payload;
    const black=['b','n','r','k','q','p'];
    const white=['B','N','R','K','Q','P'];
    const dr = Math.abs(from.r-to.r);
    const dc = Math.abs(from.c-to.c);
    if(dr>1)
        return false;
    if(dc>1)
        return false;
    if(piece =='k' && black.includes(board[to.r][to.c]))
            return false;
    if(piece =='K' && white.includes(board[to.r][to.c])){
        return false;
    }

    const c = seeSquare(to,board,!whiteMove)
    console.log(`King cannot move because of a pawn: ${c}`);
    
    return !c;

   
   
}


const seeSquare = (square,board,whiteAttackingSquare) => {
    const blackp=['p','n','r','k','q','b'];
    const whitep=['P','N','R','K','Q','B'];
    const pieces = whiteAttackingSquare == true ? whitep : blackp;
    // idziemy przez cala plansze i sprawdzamy czy przeciwnik widzi punkt square.
    for(let r=0;r<8;r++){
        for(let c=0;c<8;c++){
            if(pieces.includes(board[r][c])){
                // znalezlismy przeciwnika na polu {i,j}
                if(whiteAttackingSquare){
                    if(board[r][c]==pieces[0]){ // pionek
                        if((r-1==square.r && c-1==square.c) || (r-1==square.r && c+1==square.c))
                            return true;
                    }
                    if(board[r][c]==pieces[1]){ // skoczek
                        const dr = Math.abs(square.r - r);
                        const dc = Math.abs(square.c - c);
                        if((dr==2 && dc==1) || (dr==1 && dc==2))
                            return true;
                    }
                    if(board[r][c] == pieces[2]){ //wieza
                        if(square.r==r){
                            if(square.c < c){
                                for(let i = c+1;i<square.c;i++){
                                    if(board[r][i]!='-')
                                        return false;
                                }
                            }
                            if(square.c > c){

                            }
                        }
                        if(square.c==c){
                            if(square.r < r){

                            }
                            if(square.r > r){
                                
                            }
                        }
                        
                    }
                }
                else{
                    if(board[r][c]==pieces[0]){ // pionek
                        if((r+1==square.r && c-1==square.c) || (r+1==square.r && c+1==square.c))
                            return true;
                    }
                    if(board[r][c]==pieces[1]){ // skoczek
                        const dr = Math.abs(square.r - r);
                        const dc = Math.abs(square.c - c);
                        if((dr==2 && dc==1) || (dr==1 && dc==2))
                            return true;
                    }
                }
                
            }
        }
    }
    return false;
}




export const dropPiece = (payload,board) => {
    
    const {from,to,piece} = payload;
    console.log(`dropPiece: ${from.r} ${from.c} ->  ${to.r} ${to.c}`);

    if(piece == 'P'){
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
    
    return false;
}



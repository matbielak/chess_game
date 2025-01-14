import bb from './assets/bb.svg'
import bk from './assets/bk.svg'
import bn from './assets/bn.svg'
import bp from './assets/bp.svg'
import bq from './assets/bq.svg'
import br from './assets/br.svg'
import wb from './assets/wb.svg'
import wk from './assets/wk.svg'
import wn from './assets/wn.svg'
import wp from './assets/wp.svg'
import wq from './assets/wq.svg'
import wr from './assets/wr.svg'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
function renderPiece(type,drag){
    switch (type) {
        case 'K':
            return <img src={wk} ref={drag} className='piece'/> 
        case 'k':
            return <img src={bk} ref={drag} className='piece'/> 
        case 'Q':
            return <img src={wq} ref={drag} className='piece'/> 
        case 'q':
            return <img src={bq} ref={drag} className='piece'/> 
        case 'R':
            return <img src={wr} ref={drag} className='piece'/> 
        case 'r':
            return <img src={br} ref={drag} className='piece'/> 
        case 'B':
            return <img src={wb} ref={drag} className='piece'/> 
        case 'b':
            return <img src={bb} ref={drag} className='piece'/> 
        case 'N':
            return <img src={wn} ref={drag} className='piece'/> 
        case 'n':
            return <img src={bn} ref={drag} className='piece'/> 
        case 'P':
            return <img src={wp} ref={drag} className='piece'/> 
        case 'p':
            return <img src={bp} ref={drag} className='piece'/> 
        // case 't': 
        //     return <div>t</div>
        default:
            return null
    }
}


function Piece({type,r,c}) {
    const piece2 = useSelector((state) => state.chessboard.board[r][c])
    const [{isDragging},drag] = useDrag(
        ()=>({
            type: 'piece',
            item:{
                p: piece2,
                r:r,
                c:c
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),[piece2]
    );

    

  return (
    <>
        {renderPiece(piece2,drag)}
    </>
  )
}

export default Piece
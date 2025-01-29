import { useSelector } from "react-redux";
function ProgessBar() {
    const evaluation = useSelector((state) => state.chessboard.evaluation)
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)

    const setProgress = (evalu) => {
            if(evalu.startsWith("M")){
                if(whiteMove)
                    return 100;
                return 0;
            }
            if(evalu < 0){
                if(evalu>-2)
                    return 40;
                else if(evalu>-4)
                    return 30;
                return 25;
            }
            else{
                if(evalu<2)
                    return 60;
                else if(evalu<4)
                    return 70;
                return 75;
            }
    }
  return (
    <div className="progress-container">
        <div className="progress-eval" style={{width: `${setProgress(evaluation)}%`}}>
            {evaluation}
        </div>
    </div>
  )
}

export default ProgessBar
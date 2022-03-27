import './playAgain.css';

export function PlayAgain({props, children}: any) {
  return(
    <button onClick={props}>{children}</button>
  )
}
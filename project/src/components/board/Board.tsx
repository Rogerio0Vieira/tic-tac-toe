import './board.css';

export function Board({props, children}: any) {
  return(
    <div className={props}>
      {children}
    </div> 
  );
}
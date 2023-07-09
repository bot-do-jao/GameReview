import './style.css';

function BasicButton({ type, title}) {
  return (
    <>
        <button className="botao" type={type} > {title}</button>
    </>
  );
}

export default BasicButton;
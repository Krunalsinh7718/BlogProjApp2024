import "../assets/styles/btn-loader.css";

function BtnLoader({className}) {
    return ( <>
        <div className={`loader ${className}`}>loader...<i></i></div>
    </>);
}

export default BtnLoader;
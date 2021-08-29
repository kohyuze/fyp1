import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div className="container">
            <h1 className="startTitle">Thermal and Hydraulic Analysis</h1>
            <div className="nav">
                <div className="navButtons" >
                    <Link to={"/RatingAnalysis"} className="navLink">
                        <h2 className="buttonText">Rating Analysis</h2>
                    </Link>
                </div>
                <div className="navButtons" >
                    <Link to={"/SizingAnalysis"} className="navLink">
                        <h2 className="buttonText">Sizing Analysis</h2>
                    </Link>
                </div>
                <div className="navButtons" >
                    <Link to={"/Data"} className="navLink">
                        <h2 className="buttonText">Data</h2>
                    </Link>
                </div>
                <div className="navButtons" >
                    <Link to={"/Interpolation"} className="navLink">
                        <h2 className="buttonText">Interpolation</h2>
                    </Link>
                </div>
                <div className="navButtons" >
                    <Link to={"/Graphics"} className="navLink">
                        <h2 className="buttonText">Graphics</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Start;
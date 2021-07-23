import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div className="start">
            <h1 className="startTitle">Thermal and Hydraulic Analysis</h1>
            <div className="nav">
                <div className="navButtons" >
                    <Link to={"/RatingAnalysis"}>
                        <h2 className="buttonText">Rating Analysis</h2>
                    </Link>
                </div>
                <div className="navButtons" >
                    <Link to={"/SizingAnalysis"}>
                        <h2 className="buttonText">Sizing Analysis</h2>
                    </Link>
                </div>
                <div className="navButtons" >
                    <Link to={"/Data"}>
                        <h2 className="buttonText">Data</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Start;
const Route =  ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;

// const UserContext = React.createContext(null);
const UserContext = React.createContext({ name: '', email:'', password:'', auth: false });

const defaultColor = "success";

function CardPersonalized(props) {

        function classes() {
            const hd = props.hdColor ? `${props.hdColor}` : defaultColor;
            const txt= props.txtColor ? `text-${props.txtColor} ` : `text-`;
            return `card-header ${txt}bg-${hd} mb-3 border border-${hd} border-3`;
        };

    return (
        <div className="container ">
            <div className="row">
                <div className="col text-center">
                    <div className={`card text-ligth  mb-3 border border-${props.hdColor ? props.hdColor : defaultColor} ${props.center == "true" ? "m-auto" :" " } float-none ${props.hdColor ? `w-${props.wide}` : ''} `} style={{ width: "18rem"}}>
                        <div className={classes()}><h5>{props.header}</h5></div>
                        <div className="card-body">  
                            <div className={`col text-${props.textCenter =="true" ? "center" : "start"}`}>
                                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                                {props.text && (<p className="card-text">{props.text}</p>)}
                                {props.image && (<><img src={props.image} className="card-img-top" alt="..."></img> </>)}
                                <br/>
                                {props.body}
                                <br/>
                            </div>
                            {props.status && (<div id='createStatus'> {props.status}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
         
        
    );
}

function ButtonPersonalized(props) {


    return (
        <>
        <div className="container text-center">
        <div className="row">
        <div className="col">
            <button type="button" onClick={props.handleOnclick} className={`btn btn-${props.color ? props.color : defaultColor}`}>{props.titleButton}</button>
        </div>
        </div>
        </div>
        </>
    )
    }


function LinkPersonalizedButtonLook(props) {
        return (
            <>
            <div className="container text-center">
            <div className="row">
            <div className="col">
                <a href={props.handleOnclick} role="button" className={`btn btn-${props.color ? props.color : defaultColor}`}>{props.titleButton}</a>
            </div>
            </div>
            </div>
            </>
        )
}

function LinkPersonalized(props) {
    return (
        <>
        <div className="container text-center">
        <div className="row">
        <div className="col">
            <a href={props.handleOnclick} className="link-offset-2 link-underline link-underline-opacity-75">{props.titleButton}</a>
        </div>
        </div>
        </div>
        </>
    )
}


function FormPersonalized(props) {
    return (
        <>
        <p>{props.descriptionForm}</p>  
        <br/>Email Address <br/>
        <input type="input" className="form-control" id="email" placeholder="Enter email address" value={props.valueEmail} onChange={props.handleOnChangeEmail} 
        ></input> 
        <br/>Password <br/>
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={props.valuePassword} onChange={props.handleOnChangePassword}
        ></input>
        <br/>
        
        </>
    )
}

// function inputFormPersonalized(props) {
//     return (
//         <>
//         <br/>{props.nameInput} <br/>
//         <input type="input" className="form-control" id={props.idInput} placeholder={props.placeholderInput} value={props.valueInput} onChange={props.handleOnChange}>
//         </input> 
//         </>
//     )
// }
function Withdraw() {
    const [withdrawAmount, setWithdrawAmount] = React.useState("");
    const [status, setStatus]= React.useState("");
    const [balance, setBalance] = React.useState(0);
    const [newBalance, setNewBalance] = React.useState(0);
    const [show, setShow] = React.useState(true);
    const ctx = React.useContext(UserContext);

    function validate(field, label) {
        if(!field){
            setStatus(<span className="alert alert-danger d-flex align-items-center" > <strong> Holy guacamole! </strong>    
            You should check in on the {label} field above.</span>);
            setTimeout(() => setStatus (''), 3000);
            
            return false;
        };
        if(field >= 0 ) {
            setStatus(<span className="alert alert-danger d-flex align-items-center" > Ups! 
            You're not able to withdraw a positive amount. Please choose a negative number.</span>);
            setTimeout(() => setStatus (''), 3000);
            return false;
        } else if(field < balance) {
            setStatus(<span className="alert alert-danger d-flex align-items-center" > Ups!
           You do not have enough funds for this withdrawal amount.</span>);
            setTimeout(() => setStatus (''), 3000);
            return false;
        };
        
        return true
    
    }

    function handleWithdraw() {
        
        if(!validate(withdrawAmount, 'withdraw Amount')) return;
        // i will think that setbalance is going to be setvariable after addign setwithdraw and then push to usercontext object somehow//
        // const balance = balancebefore + withdrawAmount;   
        const totalBalanceSofar = parseInt(balance)+parseInt(withdrawAmount);
        
        setBalance(totalBalanceSofar);
        setShow(false); 
        
    }

    function clearForm() {
        setWithdrawAmount("");
        setShow(true);

    }

    return (
        <>
            <h1>Withdraw {JSON.stringify(ctx)}</h1>
            <CardPersonalized
             wide="20"
             header="Withdraw"
             center="true"
             hdColor="danger"
             status={status}
             body= {show ? (
                <>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <h5>Balance</h5>
                        </div>
                        <div className="col">
                            <h5>{'$ '+ balance}</h5>
                        </div>
                    </div>
                </div>
                Withdraw Amount <br/>
                <input type="number" className="form-control" 
                id="withdrawAmount" 
                placeholder="Enter Amount" 
                value={withdrawAmount} 
                onChange={e => setWithdrawAmount(e.currentTarget.value)}>
                </input> <br/>
                <div className="container text-center">
                        <div className="row">
                            <div className="col">
                                <ButtonPersonalized
                                titleButton="withdraw"
                                handleOnclick={handleWithdraw}
                                />
                            </div>
                        </div>
                    </div>
             </>) :
             (
                <>
                {/* add emoji happy */}
                {/* <i className="bi bi-emoji-smile"></i> */}
                <h5  className="alert alert-success text-center" >The withdraw was successful.</h5>
                <br/>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <h5>Your new balance is:</h5>
                        </div>
                        <div className="col">
                            <h5>{'$ '+ balance}</h5>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                        <div className="col">
                            <ButtonPersonalized
                            titleButton="Initiate a new withdrawal."
                            handleOnclick={clearForm}
                            />
                        </div>
                    </div>
                </>
            )}

            />

        </>
    );
}
//spa for single-page application
function Spa () {
    return  (
        <HashRouter>
            <NavBar/>
            <UserContext.Provider value={{users: [{idUser:1, name:'Julieth', lastName:'Becerra', email:'Julieth@mit.edu', password:'bigsecret', balance:100}]}}>
                <Route path="/" exact component={Home}/>
                <Route path="/CreateAccount/" component={CreateAccount}/>
                <Route path="/login/" component={Login}/>
                <Route path="/deposit/" component={Deposit}/>
                <Route path="/withdraw/" component={Withdraw}/>
                <Route path="/balance/" component={Balance}/>
                <Route path="/alldata/" component={AllData}/>
            </UserContext.Provider>
        </HashRouter>
    )

}

ReactDOM.render(<Spa/>, document.getElementById('root'));

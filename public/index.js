//spa for single-page application
function Spa () {
const [user, setUser] = React.useState({ name: '', email:'', password:'', auth: false });
      
const login = (name,email, password) => {
    setUser((user) => ({
    name: name,
    email: email,
    password: password,
    auth: true,
    }));
};

const logout = () => {
    setUser((user) => ({
    name: '',
    email: '',
    password: '',
    auth: false,
    }));
};
    
    return  (
        <HashRouter>
            <NavBar/>
            <UserContext.Provider value={{ user, login, logout }}>
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

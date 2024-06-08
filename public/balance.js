function Balance() {
    const ctx = React.useContext(UserContext);
    return (
        <h1>Balance {JSON.stringify(ctx)}</h1>
    )
}
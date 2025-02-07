function Logout({loggedIn, setLoggedIn, setuserInfo}) {
    
    if(loggedIn){
        setLoggedIn(false);
        setuserInfo({});
        return (alert("You are now logged out")); 
    }
} export default Logout;
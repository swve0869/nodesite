function Homepage(props) {

    props.loggedIn ? console.log("logged in HM") : console.log("not logged in HM");

    console.log(props.userInfo);

    return (
        <div className="homepage">
            {props.loggedIn ? <h1>Welcome to the {props.userInfo.username}'s Homepage!</h1> : <h1>Welcome to the Homepage!</h1>}
            <div>{props.userInfo.userid}</div>
        </div>
    );
} export default Homepage;
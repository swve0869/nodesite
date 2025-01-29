function Homepage(props) {
    return (
        <div className="homepage">
            <h1>Welcome to the {props.userInfo.username}'s Homepage!</h1>
        </div>
    );
} export default Homepage;
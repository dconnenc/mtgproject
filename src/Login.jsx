import "./styles/Login.css"

export default function Login(){
    return ( 
    <div className=".container" 
        style={{
            //backgroundImage: `url(${background})`,
            backgroundRepeat:"no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.4)",
        }}>

    <form action="action_page.php" method="post">

    <div className="container" id="login-container">
        <div className="row">
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required />
        </div>
        
        <div className="row">
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />
        </div>
        
        <button type="submit">Login</button>
        <label>
        <input type="checkbox" name="remember" defaultChecked={true} /> Remember me
        </label>
        
        <div className="container">
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot password?</span>
        </div>
    </div>

    
    </form>
</div>
)}
export const MyLists = () => {

    const user = sessionStorage.getItem("@AuthFirebase:userEmail")

    return(

        <div className="container mt-5">       
            <h2>My List - {user}</h2>
        </div>
    )
    
}
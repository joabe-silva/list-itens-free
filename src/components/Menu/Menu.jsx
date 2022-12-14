import { getAuth, signOut } from "firebase/auth";

export const Menu = () => {

    const logoff = () => {
        const auth = getAuth();
        signOut(auth).then(() => {

            sessionStorage.clear()
            window.location.replace("/")
            
        }).catch((error) => {
            console.log(error)
        }); 
    }

    return(
        <>    
            <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas">
                <span className="material-symbols-outlined">
                    menu
                </span>
            </button>
            
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvas">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">My List</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><a href="/lista/arquivada" style={{ textDecoration: 'none', color: '#000' }}>Listas arquivadas</a></li>
                        <li className="list-group-item"><a href="/perfil" style={{ textDecoration: 'none', color: '#000' }}>Meu Perfil</a></li>
                        <li className="list-group-item">Sobre</li>
                        <li className="list-group-item" onClick={ logoff }>Sair</li>
                    </ul>
                </div>
            </div>
        </>
    )
    
}
import Header from "../../layout/Header/Header"

function NavBar() {
    return (
        <Header className="container px-6 py-8 mx-auto">
            <nav className="font-Poppins">
                <p className="text-dark text-2xl"> <span className="font-bold">Google</span> <span className="font-light">Jobs</span></p>
            </nav>
        </Header>
    )
}

export default NavBar
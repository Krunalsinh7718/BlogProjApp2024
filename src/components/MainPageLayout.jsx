import Header from "./header/Header";
function MainPageLayout({children}) {
    return ( <>
        <Header />
        {children}
    </> );
}

export default MainPageLayout;
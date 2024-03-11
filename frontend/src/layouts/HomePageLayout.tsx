import React from 'react'
import HeaderComponent from '../components/features/header'
import FooterComponent from '../components/features/footer'
import ProductComponent from '~/components/features/products'


const HomePageLayout = () => {
    return (
        <div>

            {/* <header>
                <HeaderComponent />
            </header> */}

            <main>
                <ProductComponent />
            </main>

            {/* <footer>
                <FooterComponent />
            </footer> */}

        </div >
    )
}



export default HomePageLayout

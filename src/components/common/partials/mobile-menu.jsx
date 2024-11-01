import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import SlideToggle from 'react-slide-toggle';
import { Collapse } from '@kunukn/react-collapse'

// Import Custom Component
import ALink from "../ALink";
import { mainMenu } from "../../../utils/data/menu";

function MobileMenu ( { router } ) {
    const pathname = router.pathname;
    const [ searchText, setSearchText ] = useState( '' );
    const [isOpen, setIsOpen] = useState({
        category:false,
        variation1:false,
        variation2:false,
        product:false,
        product_pages:false,
        product_layout:false,
        other_pages:false
    })
    const onToggle = (state) => setIsOpen({...isOpen,[state]:!isOpen[state]})

    useEffect( () => {
        router.events.on( 'routeChangeStart', closeMobileMenu );

        return () => {
            router.events.off( 'routeChangeStart', closeMobileMenu );
        }
    }, [] );

    function isOtherPage () {
        return mainMenu.other.find( variation => variation.url === pathname );
    }

    function closeMobileMenu () {
        document.querySelector( "body" ).classList.remove( "mmenu-active" );

        if ( document.querySelector( ".menu-toggler" ) ) {
            document.querySelector( ".menu-toggler" ).classList.remove( "active" );
        }
    }

    function searchProducts ( e ) {
        e.preventDefault();
        router.push( {
            pathname: '/shop',
            query: {
                search: searchText
            }
        } );
    }

    function onChangeSearchText ( e ) {
        setSearchText( e.target.value );
    }

    return (
        <>
            <div className="mobile-menu-overlay" onClick={ closeMobileMenu }></div>
            <div className="mobile-menu-container">
                <div className="mobile-menu-wrapper">
                    <span className="mobile-menu-close" onClick={ closeMobileMenu }><i className="fa fa-times"></i></span>
                    <nav className="mobile-nav">
                        <ul className="mobile-menu">
                            <li className={ pathname === '/' ? 'active' : '' }>
                                <ALink href="/">Home</ALink>
                            </li>
                            <li className={ pathname.startsWith( '/shop' ) ? 'active' : '' }>
                                <ALink href="/shop" className={ `${ isOpen.category?"expanded":"collapsed" }` }>Categories<span className="mmenu-btn" onClick={ e => { e.preventDefault(); onToggle("category"); } }></span></ALink>
                                {
                                    <Collapse isOpen={ isOpen.category } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                            <>

                                                <ul >
                                                    <li>
                                                                    <ALink href="#" className={ `${ isOpen.variation1?"expanded":"collapsed" }` }>VARIATION 1
                                                                    <span className="mmenu-btn" onClick={ e => { e.preventDefault(); onToggle('variation1'); } }></span>
                                                                    </ALink>
                                                        <Collapse isOpen={ isOpen.variation1 } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                                                <>
                                                                    <ul >
                                                                        {
                                                                            mainMenu.shop.variation1.map( ( variations, index ) => (
                                                                                <li key={ "menu-item" + index }>
                                                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                                                </li>
                                                                            ) )
                                                                        }
                                                                    </ul>
                                                                </>
                                                        </Collapse>
                                                    </li>

                                                    <li>
                                                                    <ALink href="#" className={ `${ isOpen.variation2?"expanded":"collapsed" }` }>VARIATION 2 
                                                                    <span className="mmenu-btn" onClick={ e => { e.preventDefault(); onToggle('variation2'); } }></span>
                                                                    </ALink>
                                                        <Collapse isOpen={ isOpen.variation2 } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                                                
                                                                <>
                                                                    <ul >
                                                                        {
                                                                            mainMenu.shop.variation2.map( ( variations, index ) => (
                                                                                <li key={ "menu-item" + index }>
                                                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                                                </li>
                                                                            ) )
                                                                        }
                                                                    </ul>
                                                                </>
                                                        </Collapse>
                                                    </li>
                                                </ul>
                                            </>
                                    </Collapse>
                                }
                            </li>

                            <li className={ pathname.startsWith( '/product' ) ? 'active' : '' }>
                                <ALink href="/product/default/headphone-black-two" className={ `${ isOpen.product?"expanded":"collapsed" }` }>Products<span className=" mmenu-btn" onClick={ e => { e.preventDefault(); onToggle("product"); } }></span></ALink>
                                {
                                    <Collapse isOpen={ isOpen.product } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                            <>

                                                <ul >
                                                    <li>
                                                                    <ALink href="#" className={ `${ isOpen.product_pages?"expanded":"collapsed" }` }>PRODUCT PAGES
                                                                    <span className="mmenu-btn" onClick={ e => { e.preventDefault(); onToggle("product_pages"); } }></span>
                                                                    </ALink>
                                                        <Collapse isOpen={ isOpen.product_pages } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                                                <>
                                                                    <ul >
                                                                        {
                                                                            mainMenu.product.pages.map( ( variations, index ) => (
                                                                                <li key={ "menu-item" + index }>
                                                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                                                </li>
                                                                            ) )
                                                                        }
                                                                    </ul>
                                                                </>
                                                        </Collapse>
                                                    </li>

                                                    <li>
                                                                    <ALink href="#" className={ `${ isOpen.product_layout?"expanded":"collapsed" }` }>PRODUCT LAYOUTS
                                                                    <span className="mmenu-btn" onClick={ e => { e.preventDefault(); onToggle("product_layout"); } }></span>
                                                                    </ALink>
                                                        <Collapse isOpen={ isOpen.product_layout } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                                                <>
                                                                    <ul >
                                                                        {
                                                                            mainMenu.product.layout.map( ( variations, index ) => (
                                                                                <li key={ "menu-item" + index }>
                                                                                    <ALink href={ `${ variations.url }` }>{ variations.title }</ALink>
                                                                                </li>
                                                                            ) )
                                                                        }
                                                                    </ul>
                                                                </>
                                                        </Collapse>
                                                    </li>
                                                </ul>
                                            </>
                                    </Collapse>
                                }
                            </li>

                            <li className={ isOtherPage() ? 'active' : '' }>
                                            <a href="#" className={ `${ isOpen.variation2?"expanded":"collapsed" }` } onClick={ e => { e.preventDefault(); onToggle("other_pages"); } }>Pages<span className="mmenu-btn"></span></a>
                                <Collapse isOpen={ isOpen.other_pages } transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)">
                                        <>
                                            <ul >
                                                <li><ALink href="/pages/wishlist">Wishlist</ALink></li>
                                                <li><ALink href="/pages/cart">Shopping Cart</ALink></li>
                                                <li><ALink href="/pages/checkout">Checkout</ALink></li>
                                                <li><ALink href="/pages/account">Dashboard</ALink></li>
                                                <li><ALink href="/pages/login">Login</ALink></li>
                                                <li><ALink href="/pages/forgot-password">Forgot Password</ALink></li>
                                            </ul>
                                        </>
                                </Collapse>
                            </li>

                            <li><ALink href="/pages/blog">Blog</ALink></li>
                            <li><ALink href="/pages/about-us">About Us</ALink></li>
                        </ul>

                        <ul className="mobile-menu mt-2 mb-2">
                            <li className="border-0"><ALink href="#">Special Offer!</ALink></li>
                            <li className="border-0"><a href="https://1.envato.market/DdLk5" target="_blank">Buy Porto!<span className="tip tip-hot">Hot</span></a></li>
                        </ul>

                        <ul className="mobile-menu">
                            <li><ALink href="/pages/account">My Account</ALink></li>
                            <li><ALink href="/pages/contact-us">Contact Us</ALink></li>
                            <li><ALink href="/pages/blog">Blog</ALink></li>
                            <li><ALink href="/pages/wishlist">My Wishlist</ALink></li>
                            <li><ALink href="/pages/cart">Cart</ALink></li>
                            <li><ALink href="/pages/login" className="login-link">Log In</ALink></li>
                        </ul>
                    </nav>

                    <form className="search-wrapper mb-2" action="#" onSubmit={ searchProducts }>
                        <input type="text" className="form-control mb-0" placeholder="Search..." required onChange={ onChangeSearchText } />
                        <button className="btn icon-search text-white bg-transparent p-0" type="submit"></button>
                    </form>

                    <div className="social-icons">
                        <ALink href="#" className="social-icon social-facebook icon-facebook" >
                        </ALink>
                        <ALink href="#" className="social-icon social-twitter icon-twitter">
                        </ALink>
                        <ALink href="#" className="social-icon social-instagram icon-instagram">
                        </ALink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter( MobileMenu );
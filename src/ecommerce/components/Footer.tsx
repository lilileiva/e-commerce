import '../../index.css'

function Footer() {

    return (
        <footer className="bg-card-light border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <h1 className="text-2xl font-bold text-turquoise mb-2">MegaMart</h1>
                        <p className="text-sm text-gray-700">Your one-stop shop for everything you need.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-700">Offers</h4>
                        <ul className="space-y-2 text-sm text-subtext-light">
                            <li><a className="text-gray-700" href="#">Best Deals</a></li>
                            <li><a className="text-gray-700" href="#">New Arrivals</a></li>
                            <li><a className="text-gray-700" href="#">Clearance</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-700">Products</h4>
                        <ul className="space-y-2 text-sm text-subtext-light dark:text-subtext-dark">
                            <li><a className="text-gray-700" href="#">Electronics</a></li>
                            <li><a className="text-gray-700" href="#">Apparel</a></li>
                            <li><a className="text-gray-700" href="#">Home Goods</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-700">Categories</h4>
                        <ul className="space-y-2 text-sm text-subtext-light dark:text-subtext-dark">
                            <li><a className="text-gray-700" href="#">Men</a></li>
                            <li><a className="text-gray-700" href="#">Women</a></li>
                            <li><a className="text-gray-700" href="#">Kids</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-gray-700">Support</h4>
                        <ul className="space-y-2 text-sm text-subtext-light dark:text-subtext-dark">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/lilianaleiva/"
                                    target='blank'
                                    className="text-gray-700"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/lilileiva"
                                    target='blank'
                                    className="text-gray-700"
                                >
                                    Github
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://lilianaleiva.vercel.app"
                                    target='blank'
                                    className="text-gray-700"
                                >
                                    Portfolio
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-700">
                    <p>© 2024 MegaMart. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
import { Link } from 'react-router-dom';
import '../css/Nav.css'

export default function Navbar() {

    return (<>
    
        <nav className='Nav'>
            <div className='title'>
                <h1><Link to="/">ReactBlog</Link></h1>
            </div>
            <ul className='nav_list'>
                <li>
                    <Link to = '/blog_editor'>upload</Link>
                    {/* <Link to = '/signin'></Link> */}
                </li>
            </ul>
        </nav>

    </>)

}
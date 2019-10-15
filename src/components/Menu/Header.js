import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';


const Header = () => {
    return(
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Lastest
            </Link>
            <Link to="/" className="item">
                Most Likes
            </Link>
            <Link to="/" className="item">
                Actors
            </Link>
            <Link to="/category" className="item">
                Category
            </Link>
            <Link to="/category/edit/eb4fadad-488f-4041-4407-08d6c7c77275" className="item">
                Producer
            </Link>
            <Link to="/image/upload" className="item">
                Image
            </Link>
            <div className="right menu">
                <Search />    
            </div>
        </div>
    );
}

export default Header;
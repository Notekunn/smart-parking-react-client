import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

function NavBarCustom() {
	return (
		<div>
			<Navbar>
				<NavbarBrand>
					<Link to="/">Trang chủ</Link>
				</NavbarBrand>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<Link to="/card">Quản lý thẻ</Link>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	);
}

export default NavBarCustom;

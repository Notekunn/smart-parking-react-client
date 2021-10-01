import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap'

function NavBarCustom() {
	return (
		<div>
			<Navbar>
				<NavbarBrand>
					<Link to="/">Trang chủ</Link>
				</NavbarBrand>
				<Nav className="mr-auto">
					<NavItem>
						<Link to="/card">Quản lý thẻ </Link>
					</NavItem>
					<NavItem>
						<Link to="/history">Lịch sử vào ra </Link>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	)
}

export default NavBarCustom

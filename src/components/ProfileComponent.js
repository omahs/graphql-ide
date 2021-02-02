import React, { useEffect } from 'react'
import { logout } from '../api/api'
import { observer } from 'mobx-react-lite'
import ModalStore from '../store/modalStore'
import { UserStore } from '../store/queriesStore'
import UserIcon from './UserIcon'
import { Dropdown } from 'react-bootstrap'

const Profile = observer(() => {
	const { getUser, user, setUser } = UserStore
	const { toggleModal, toggleLogin, toggleChangePassword } = ModalStore

	const clickHandler = () => {
		toggleModal()
		toggleLogin()
	}
	const changePasswordHadler = () => {
		toggleModal()
		toggleChangePassword()
	}
	const logOut = async () => {
		await logout().catch(e => console.log(e))
		setUser(null)
	}
	useEffect(() => {
		getUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return !user ? (
		<div className="flex profile__menu" onClick={clickHandler}>
			<a className="profile__email" href="# ">Login</a>
			<UserIcon />
		</div>
	) : <Dropdown className={'profile__menu'}>
			<p className="profile__email"> {user.email} </p> 
			<Dropdown.Toggle id="dropdown-basic" as={'span'} >
				<UserIcon />
			</Dropdown.Toggle>
		
			<Dropdown.Menu>
				<Dropdown.Item href="# " onClick={changePasswordHadler}>Change password</Dropdown.Item>
				<Dropdown.Item href="# "onClick={logOut}>Logout</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
})

export default Profile

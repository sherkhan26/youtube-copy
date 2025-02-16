import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import ProfileInfo from '@/components/layout/sidebar/ProfileInfo'
import Menu from '@/components/layout/sidebar/menu/Menu'
import Line from '@/components/ui/Line'

import { defaultValueAuthState } from '@/providers/AuthProvider'

import { AuthService } from '@/services/auth/auth.service'

import { useAuth } from '@/hooks/useAuth'

const Sidebar: FC = () => {
	const { user, setData } = useAuth()

	return user ? (
		<section className='sidebar'>
			<Link href='/'>
				<a className='logo' rel='noreferrer'>
					<Image
						src='http://localhost:3000/img/common/logo.png'
						alt='Youtube'
						width={169}
						height={55}
					/>
				</a>
			</Link>

			<ProfileInfo />

			<Line />

			<Menu />

			<button
				id='logout_btn'
				onClick={() => {
					AuthService.logout()
					setData && setData(defaultValueAuthState)
				}}
			>
				Logout
			</button>
			<div className='copy'>© 2022 Youtube, LLC</div>
		</section>
	) : null
}

export default Sidebar

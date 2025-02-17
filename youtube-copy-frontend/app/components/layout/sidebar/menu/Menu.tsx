import { FC, Fragment } from 'react'

import MenuItem from '@/components/layout/sidebar/menu/MenuItem'
import { menu } from '@/components/layout/sidebar/menu/menu.data'

const Menu: FC = () => {
	return (
		<ul className='mnu_sidebar'>
			{menu.map((menuItem, index) => (
				<Fragment key={menuItem.title}>
					<MenuItem item={menuItem} />
					{index === 2 && <div className='line_mnu' />}
				</Fragment>
			))}
			<div className='line_mnu' />
		</ul>
	)
}

export default Menu

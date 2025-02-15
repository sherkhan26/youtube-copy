import { FC } from 'react'

import ChannelItem from '@/components/layout/right-side/top-channel/ChannelItem'

import { IUser } from '@/types/user.interface'

const TopChannels: FC<{ channels: IUser[] }> = ({ channels }) => {
	return (
		<div id='top_channels'>
			<div className='title_gray'>
				<h2>Top Channels</h2>
			</div>

			<div className='list_channels'>
				{channels.map((channel) => (
					<ChannelItem item={channel} key={channel._id} />
				))}
			</div>
		</div>
	)
}

export default TopChannels

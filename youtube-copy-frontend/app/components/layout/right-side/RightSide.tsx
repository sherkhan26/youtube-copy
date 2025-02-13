import { FC } from 'react'

import MostPopularVideo from '@/components/layout/right-side/most-popular-video/MostPopularVideo'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import Line from '../../ui/Line'

import TopChannels from './top-channel/TopChannels'

const RightSide: FC<{ topVideo: IVideo; topChannels: IUser[] }> = (props) => {
	return (
		<div className='right_side'>
			<MostPopularVideo video={props.topVideo} />
			<Line />
			<TopChannels channels={props.topChannels} />
		</div>
	)
}

export default RightSide

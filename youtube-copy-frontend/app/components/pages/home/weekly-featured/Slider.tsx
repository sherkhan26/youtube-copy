import { FC } from 'react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

import VideoItem from '@/components/ui/video-item/VideoItem'

import { IVideo } from '@/types/video.interface'

const Slider: FC<{ videos: IVideo[] }> = ({ videos }) => {
	return (
		<Swiper
			modules={[Autoplay]}
			spaceBetween={10}
			slidesPerView={2}
			className='slider_wf'
			autoplay={{
				delay: 4500
			}}
		>
			{videos.map((video) => (
				<SwiperSlide key={video._id}>
					<VideoItem item={video} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default Slider

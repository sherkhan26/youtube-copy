import { FC } from 'react'
import { BiLike } from 'react-icons/bi'
import { useMutation } from 'react-query'

import ChannelInfoShort from '@/components/ui/ChannelInfoShort/ChannelInfoShort'
import VideoStatistics from '@/components/ui/video-item/VideoStatistics/VideoStatistics'

import { VideoService } from '@/services/VideoService'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import { formatNumberToK } from '../../../../utils/formatNumberToK'

import styles from './VideoDetail.module.scss'

const VideoDetail: FC<{ video: IVideo; channel: IUser }> = ({
	video,
	channel
}) => {
	const { mutateAsync, data } = useMutation('set like', () =>
		VideoService.updateLikes(video._id)
	)

	return (
		<div className={styles.detail}>
			<div className={styles.wrapper}>
				<div className={styles.text}>
					<h1>{video.name}</h1>
					<VideoStatistics
						views={video.views}
						createdAt={video.createdAt}
						subscribers={channel.subscribersCount}
					/>
				</div>
				<div>
					<button className={styles.likeButton} onClick={() => mutateAsync()}>
						<BiLike className={styles.likeIcon} />
						<span>{formatNumberToK(data?.data.likes || video.likes)}</span>
					</button>
				</div>
			</div>
			<article className={styles.article}>{video.description}</article>
			<ChannelInfoShort channel={channel} />
		</div>
	)
}

export default VideoDetail

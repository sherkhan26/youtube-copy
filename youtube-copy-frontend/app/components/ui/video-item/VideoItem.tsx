import { IVideoItem } from '@/components/ui/video-item/video-item.interface'

import VideoDuration from '@/components/ui/video-item/VideoDuration'
import VideoStatistics from '@/components/ui/video-item/VideoStatistics/VideoStatistics'
import cn from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

import styles from './VideoItem.module.scss'

dayjs.extend(relativeTime)

const VideoItem: FC<IVideoItem> = ({
	                                   item,
	                                   isLarge,
	                                   isAvatar,
	                                   tag,
	                                   removeHandler,
	                                   isUpdateLink
                                   }) => {
	const { push } = useRouter()
	
	return (
		<div className={styles.video_item}>
			{!!removeHandler && (
				<button
					className={'absolute top-3 right-3 z-10'}
					onClick={() => removeHandler(item._id)}
				>
					<BiTrash className='text-lg text-red-700' />
				</button>
			)}
			{isUpdateLink && (
				<button
					className={'absolute top-3 right-11 z-10'}
					onClick={() => push(`/video/edit/${item._id}`)}
				>
					<BiEdit className='text-lg text-blue-600' />
				</button>
			)}
			<Link href={`/v/${item._id}`}>
				<a className={'block'}>
					<div className={styles.thumbnail}>
						{item.thumbnailPath && (
							<Image
								src={item.thumbnailPath}
								alt={item.name}
								width={185}
								height={103}
								layout='responsive'
							/>
						)}
						<VideoDuration videoPath={item.videoPath} />
						{tag && <div className={styles.hot}>{tag}</div>}
						{isAvatar && (
							<div className={styles.avatar}>
								<Image
									width={50}
									height={50}
									alt={item.user?.name}
									src={item.user?.avatarPath || '/main/avatar.jpg'}
								/>
							</div>
						)}
					</div>
					<div
						className={cn(styles.author, {
							verified: item.user?.isVerified
						})}
					>
						{item.user?.name}
					</div>
					<div className={styles.name}>{item.name}</div>
				</a>
			</Link>
			{isLarge && <div className={styles.description}>{item.description}</div>}
			<VideoStatistics
				views={item.views}
				likes={isLarge ? item.likes : undefined}
				createdAt={item.createdAt}
			/>
		</div>
	)
}

export default VideoItem

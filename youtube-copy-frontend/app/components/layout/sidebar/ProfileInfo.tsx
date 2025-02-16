import Loader from '@/components/ui/Loader'

import { UserService } from '@/services/UserService'
import cn from 'classnames'
import Image from 'next/image'
import { useQuery } from 'react-query'

import { formatNumberToK } from '../../../utils/formatNumberToK'

import styles from './ProfileInfo.module.scss'

const ProfileInfo = () => {
	const { data, isLoading } = useQuery(
		'get profile',
		() => UserService.getProfile(),
		{ select: ({ data }) => data }
	)
	
	return isLoading ? (
		<Loader count={5} />
	) : (
		<>
			<div className={styles.profile_info}>
				<Image
					src={data?.avatarPath || '/main/avatar.jpg'}
					alt=''
					width={120}
					height={120}
					quality={90}
				/>
				
				<div
					className={cn(styles.name, {
						verified: data?.isVerified
					})}
				>
					{data?.name}
				</div>
				<div className={styles.location}>{data?.location}</div>
			</div>
			<div className={styles.information}>
				<div className={styles.item}>
					<div className={styles.top}>{data?.videosCount}</div>
					<div className={styles.bottom}>videos</div>
				</div>
				<div className={styles.item}>
					<div className={styles.top}>
						{formatNumberToK(data?.subscribersCount || 0)}
					</div>
					<div className={styles.bottom}>subscribers</div>
				</div>
			</div>
		</>
	)
}

export default ProfileInfo

import { FC } from 'react'
import { useQuery } from 'react-query'

import AddCommentForm from '@/components/pages/video/comments/AddCommentForm'
import CommentItem from '@/components/pages/video/comments/CommentItem'
import Loader from '@/components/ui/Loader'

import { CommentService } from '@/services/CommentService'

import { useAuth } from '@/hooks/useAuth'

import styles from './Comments.module.scss'

const Comments: FC<{ videoId: string }> = ({ videoId }) => {
	const { user } = useAuth()

	const { refetch, data, isLoading } = useQuery(
		['get comments', videoId],
		() => CommentService.getCommentsByVideo(videoId),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			<div>
				{user && <AddCommentForm videoId={videoId} refetch={refetch} />}
			</div>
			{isLoading ? (
				<Loader count={4} />
			) : data?.length ? (
				<>
					<div className={styles.grid}>
						{data.map((comment) => (
							<CommentItem comment={comment} key={comment._id} />
						))}
					</div>
				</>
			) : (
				<p>Comments not found!</p>
			)}
			<h2>{}</h2>
		</>
	)
}

export default Comments

import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'
import { useMutation } from 'react-query'

import styles from '@/components/layout/header/auth-form/AuthForm.module.scss'
import Field from '@/components/ui/Field/Field'

import { CommentService } from '@/services/CommentService'

import { ICommentDto } from '@/types/comment.interface'

const AddCommentForm: FC<{ videoId: string; refetch: any }> = ({
	videoId,
	refetch
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ICommentDto>({
		mode: 'onChange'
	})

	const { mutateAsync } = useMutation(
		'add comment',
		(data: ICommentDto) => CommentService.createComment({ ...data, videoId }),
		{
			onSuccess(data) {
				reset()
				refetch()
			}
		}
	)

	const onSubmit: SubmitHandler<ICommentDto> = async (data) => {
		await mutateAsync(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={'relative'}>
				<Field
					{...register('message', {
						required: 'Message is required'
					})}
					// @ts-ignore
					placeholder='Add a public comment'
					error={errors.message}
				/>

				<button className={'text-2xl absolute right-0 top-0'}>
					<MdSend />
				</button>
			</div>
		</form>
	)
}

export default AddCommentForm

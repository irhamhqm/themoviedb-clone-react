
import { compareDesc } from "date-fns";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, commentType } from "../app/commentSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { formatDate } from "../utils";

type CommentItemProps = {
  comment: commentType
}

const CommmentItem = (props: CommentItemProps) => {
  const { comment } = props;
  return (
    <div className="flex gap-4 mb-4">
      <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg text-blue-400">{comment.user}</span>
          <span>{formatDate(comment.dateCreated)}</span>
        </div>
        <div>{comment.comment}</div>
      </div>
    </div>
  )
}

export const Comment = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.comment);
  const commentArr = comments[movieId as string] ? Object.values(comments[movieId as string]).sort((a, b) => compareDesc(a.dateCreated, b.dateCreated)) : [];

  const [commentInput, setCommentInput] = useState('');

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (movieId) {
      dispatch(addComment({ movieId, comment: commentInput }));
      setCommentInput('');
    }
  }

  return (
    <div className="bg-white mt-6 p-4">
      <div className="font-semibold text-lg">Comments</div>
      <form className="bg-white mt-2" onSubmit={handleAddComment}>
        <textarea
          name="comment" 
          id="comment"
          placeholder="Add a comment"
          className="p-2 border border-solid border-blue-300 w-full"
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
        />
        <button
          type="submit"
          className="block bg-blue-400 px-4 py-2 rounded-sm text-white font-semibold h-12 xs3:w-full md:w-auto md:ml-auto mt-2"
        >
          Comment
        </button>
      </form>
      <div className="mt-4">
        {commentArr.map((comment) => (
          <CommmentItem key={comment.uuid} comment={comment}/>
        ))}
      </div>
    </div>
  )
}
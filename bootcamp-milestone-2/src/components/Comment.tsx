type IComment = {
    _id: string;
    user: string;
    comment: string;
    time: Date;
  };
  
  type CommentProps = {
    comment: IComment;
  };
  
  function parseCommentTime(time: Date | string) {
    // Ensure time is a valid Date object
    const date = new Date(time); // Convert to Date object if it's not already
    if (isNaN(date.getTime())) {
      return ""; // Return empty string if the date is invalid
    }
  
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  
  
  function Comment({ comment }: CommentProps) {
    return (
      <div className="border-b p-4 flex flex-col">
        <h4 className="font-semibold text-lg">{comment.user}</h4>
        <p className="text-sm text-gray-700 mt-2">{comment.comment}</p>
        <span className="text-xs text-gray-500 mt-1">{parseCommentTime(comment.time)}</span>
      </div>
    );
  }
  
  export default Comment;
  
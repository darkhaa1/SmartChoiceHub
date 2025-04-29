import type { CommentType } from "../pages/RequestDetails";
import "./CommentEdit.css";

interface EditCommentProps {
  comment: CommentType;
  editedComment: Partial<CommentType>;
  setEditedComment: React.Dispatch<React.SetStateAction<Partial<CommentType>>>;
  isEditingComment: boolean;
  setIsEditingComment: React.Dispatch<React.SetStateAction<boolean>>;
  refreshComments: () => void;
}

function CommentEdit({
  comment,
  editedComment,
  setEditedComment,
  isEditingComment,
  setIsEditingComment,
  refreshComments,
}: EditCommentProps) {
  const handleEditToggle = () => {
    setIsEditingComment(!isEditingComment);
  };
  const handleSave = async () => {
    if (!comment) return;
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/comments/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: comment.id,
            details: editedComment.details,
          }),
        },
      );
      setEditedComment({ ...comment, ...editedComment } as CommentType);
      setIsEditingComment(false);
      refreshComments();
    } catch (error) {
      console.error("Error while fetching :", error);
    }
  };
  return (
    <>
      <button
        id="button_icon-update-comment"
        type="button"
        onClick={handleEditToggle}
      >
        {isEditingComment ? "Cancel change" : "Edit comment"}
      </button>
      {isEditingComment && (
        <button
          type="button"
          id="button_icon-update-comment"
          onClick={handleSave}
        >
          Save comment
        </button>
      )}
    </>
  );
}

export default CommentEdit;

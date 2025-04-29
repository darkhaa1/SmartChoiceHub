import "./CommentDelete.css";

interface PropsType {
  id: number;
  refreshComments: () => void;
}

function CommentDelete({ id, refreshComments }: PropsType) {
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/comments/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          refreshComments(); // Rafraîchit les commentaires sans recharger la page
        }
      })
      .catch((error) => {
        console.error("Error deleting comment", error);
        alert("An error occurred, please try again.");
      });
  };

  return (
    <>
      <button type="button" id="delete-button-comment" onClick={handleDelete}>
        Delete comment
      </button>
    </>
  );
}

export default CommentDelete;

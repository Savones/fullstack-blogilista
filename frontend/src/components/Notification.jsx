const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  } else if (errorMessage === null) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  }
  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

export default Notification
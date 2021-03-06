import React, { Fragment, useState } from "react"

const EditTodo = ({ todo }) => {
  const updateDescription = async (e) => {
    e.preventDefault()
    try {
      const body = { description }
      await fetch(`http://localhost:5000/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      window.location = "/"
    } catch (err) {
      console.error(err)
    }
  }

  const [description, setDescription] = useState(todo.description)
  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.id}`}>
        Edit
      </button>
      <div className="modal" id={`id${todo.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditTodo

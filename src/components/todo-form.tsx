// Import dependencies
import * as React from 'react'
import shortid from 'shortid'

// Import interfaces
import {TodoInterface, TodoFormInterface} from './../interfaces'

// Todo form component
const TodoForm = (props: TodoFormInterface) => {
  // Create ref for form input
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Create new form state
  const [formState, setFormState] = React.useState('')

  // Handle todo input change
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Update form state with the text from input
    setFormState(event.target.value)
  }

  // Handle 'Enter' in todo input
  function handleInputEnter(event: React.KeyboardEvent) {
    // Check for 'Enter' key
    if (event.key === 'Enter') {
      // Prepare new todo object
      const newTodo: TodoInterface = {
        id: shortid.generate(),
        text: formState,
        isCompleted: false
      }

      // Create new todo item
      props.handleTodoCreate(newTodo)

      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div className="todo-form">
      <input
        ref={inputRef}
        type="text"
        placeholder='Enter new todo'
        onChange={event => handleInputChange(event)}
        onKeyPress={event => handleInputEnter(event)}
      />
    </div>
  )
}

export default TodoForm

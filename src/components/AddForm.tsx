import React from 'react'

interface AddFormProps {
  placeholder: string
}

const AddForm: React.FC <AddFormProps> = ({placeholder}) => {
  return(
    <form>
      <input type="text" placeholder={placeholder}/>
    </form>
  )
}

import React, { SFC } from 'react';

/* interface FormProps {
  onNewBoard: (string: string) => void
} */

interface AddBoardFormProps {
  onNewBoard: (title: string) => void
}

const AddBoardForm: React.FC <AddBoardFormProps> = ({onNewBoard}) => {
  let boardNameRef: React.RefObject <HTMLInputElement> = React.createRef();

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(boardNameRef.current.value);
    console.log(e.target);

    onNewBoard(boardNameRef.current.value);
    
    boardNameRef.current.value = '';
    boardNameRef.current.focus();
  }

  return(
    <form onSubmit={submit}>
      <input 
        type='text' 
        placeholder='Enter the board name'
        ref={boardNameRef} 
        required/>
        <input type='submit' value='Create'/>
    </form>
  )
} 



/* class AddBoardForm extends React.Component <FormProps> {
  boardNameRef: React.RefObject<HTMLInputElement>;
  
  constructor(props: FormProps) {
    super(props);
    this.boardNameRef = React.createRef();
  }
  
  submit = (e: React.FormEvent) => {
    const { onNewBoard } = this.props;
    const { boardNameRef } = this;
    e.preventDefault();

    onNewBoard(boardNameRef.current.value);
    boardNameRef.current.value = '';
    boardNameRef.current.focus(); 
  }

  render() {
    return(
      <form onSubmit={this.submit}>
        <input 
          type='text' 
          placeholder='Enter the board name'
          ref={this.boardNameRef}/>
        <input type='submit' value='Create'/>
      </form>
    )
  }
} */


export default AddBoardForm;

import React from 'react';

interface WithEdditableProps {
  handleEditingEnd: (title: string) => void,
}

export const withEdditable = <P extends object>(PassedComponent: React.ComponentType<P>) => 
  class WithEdditable extends React.Component<P & WithEdditableProps> {

    // Start of element editing
    startEditing = (e: React.MouseEvent|MouseEvent): void => {
      const target = e.target as HTMLElement;
      const parent = target.parentElement;
      console.log('Start Editing');

      if(parent.hasAttribute('draggable')) {
        parent.setAttribute('draggable', 'false');
      }

      target.setAttribute('contenteditable', 'true');
      target.classList.add('editing');
      target.focus();

      target.addEventListener('keypress', (e) => {
        if(e.code === "Enter") {
          target.blur();
          e.preventDefault();
        }
      })
    }

    // End of element editing
    endEditing = (
      e: React.FocusEvent, 
      handleEditing: (title: string) => void
    ): void => {

      const target = e.target as HTMLElement;
      const newTitle = target.textContent;
      const parent = target.parentElement;

      if(newTitle === '') {
        target.focus();
        return;
      } 

      if(parent.hasAttribute('draggable')) {
        parent.setAttribute('draggable', 'true');
      }

      handleEditing(newTitle);
      target.removeAttribute('contenteditable');
      target.classList.remove('editing');
    }

    render() {
      return(
        <PassedComponent
          onStartEdit={this.startEditing}
          onEndEdit={
            (e: React.FocusEvent) => 
              this.endEditing(e, this.props.handleEditingEnd)
          }
          {...this.props}
        />
      )
    }
  } 

export default withEdditable;
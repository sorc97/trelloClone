import React from 'react';

interface WithEdditableProps {
  handleEditingEnd: (title: string) => void,
}

export const withEdditable = <P extends object>(PassedComponent: React.ComponentType<P>) =>
  class WithEdditable extends React.Component<P & WithEdditableProps> {

    // Start of element editing
    startEditing = (e: React.MouseEvent | MouseEvent): void => {
      const target = e.target as HTMLElement;
      const parent = target.parentElement;
      // When element is edited, disable draggable attribute
      if (parent.hasAttribute('draggable')) { 
        parent.setAttribute('draggable', 'false');
      }
      // Start editing
      target.setAttribute('contenteditable', 'true');
      target.classList.add('editing');
      target.focus();
      // Submit by enter handler 
      target.addEventListener('keypress', (e) => {
        if (e.code === "Enter") {
          target.blur();
          e.preventDefault();  // Prevent break line by enter
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

      if (newTitle === '') {  // When no data in the field, return focus
        target.focus();
        return;
      }
      // If element was draggable, set it back
      if (parent.hasAttribute('draggable')) {
        parent.setAttribute('draggable', 'true');
      }

      handleEditing(newTitle);  // Refresh data with new value
      // End of editing
      target.removeAttribute('contenteditable');
      target.classList.remove('editing');
    }

    render() {
      return (
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
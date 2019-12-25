import React, { useState } from 'react';

interface withToggleProps {

}

// type WithToggleState = boolean;

interface WithToggleState {
  isHidden: boolean
}

export const withToggle = <P extends object>(PassedComponent: React.ComponentType<P>) => 
  class WithToggle extends React.Component<P, WithToggleState> {
    readonly state = {
      isHidden: false
    }

    toggle = (): void => {
      this.setState((prevState) => ({
        isHidden: !prevState.isHidden
      }))
    }

    render() {
      return(
        <PassedComponent
          {...this.props}
          toggle={this.toggle}
          toggleStatus={this.state.isHidden}
        />
      )
    }
  } 

export default withToggle;
import React from 'react';
import { Button } from 'react-bootstrap';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chatInput: '' };

    // React ES6 does not bind 'this' to event handlers by default
    this.submitHandler = this.submitHandler.bind(this);
    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.startOrdering = this.startOrdering.bind(this);
  }

  submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    // Clear the input box
    this.setState({ chatInput: '' });

    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
    this.props.onSend("kkkkkk");
  }
  startOrdering() {
    this.props.onSend("start");
  }

  textChangeHandler(event) {
    this.setState({ chatInput: event.target.value });
  }

  render() {
    return (
      <div> 
        <Button bsStyle="primary" bsSize="large" block onClick={this.startOrdering}>
        START
    </Button>
        {/* <form className="chat-input" onSubmit={this.submitHandler}>
        <input type="text"
          onChange={this.textChangeHandler}
          value={this.state.chatInput}
          placeholder="Write a message..."
          required />
      </form> */}
      </div>

    );
  }
}

ChatInput.defaultProps = {
};

export default ChatInput;

import { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export class MessageForm extends Component {
  state = {
    value: ''
  }

  onSubmit = async (e) => {
    const message = this.state.value
    e.preventDefault()
    const signature = await this.props.library?.getSigner().signMessage(message)
    if (signature !== undefined) {
      console.log(`signing message..${message} ${signature} `)
      this.props.onChange({ message: message, hash: signature })
    } else {
      console.error('Error signing message, no signature')
    }
  }

  render() {
    return (
      <Form>
        <Row className="align-items-center">
          <Col xs="10">
            <Form.Control
              required
              placeholder="Enter Text Here"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2" onClick={this.onSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

MessageForm.propTypes = {
  library: PropTypes.object,
  onChange: PropTypes.func
}

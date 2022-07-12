import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'

import { useWeb3React } from '@web3-react/core'

import { injected } from 'components/wallet/connectors'
import { MessageForm } from 'components/messageForm'
const { ethers } = require('ethers')

export default function Index() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React()

  const [messages, setMessages] = useState([])

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '50px',
          paddingRight: '100px'
        }}
      >
        {active ? (
          <Button variant="primary" onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button variant="success" onClick={connect}>
            Connect Wallet
          </Button>
        )}
      </div>

      <div style={{ padding: '20%' }}>
        <h1> gm </h1>
        <ListGroup as="ol" numbered style={{ paddingBottom: '50px' }}>
          {messages.map((message, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">{message.message}</div>
              <Badge bg="primary" pill>
                {message.hash}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <MessageForm
          library={library}
          onChange={(message) => {
            messages.push({ message: message.value, hash: message.hash })
            console.log(`setting messages ${JSON.stringify(messages)}`)
            setMessages(messages)
          }}
        />
      </div>
    </div>
  )
}

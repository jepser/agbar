import React from "react"
import styled from "styled-components"

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #ccc;
`

const Close = styled.button`
  // border: 0;
  // background: transparent;
`

const CloseWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Modal = ({ onClose }) => {
  return (
    <Root>
      <CloseWrap>
        <Close onClick={onClose}>Close</Close>
      </CloseWrap>
      <h2>🤔 Why do we do this?</h2>
      <p>
        5 people thought that "hacking" the Agbar tower (Olivia, Paola, Pilar,
        Tiago & Jepser), might be really cool.
      </p>
      <p>
        We wanted people to share a message with Barcelona, so why not something
        that makes makes them feel part of it.
      </p>
      <p>That's how we created this...</p>
      <h2>🤷‍♀️ How does it work?</h2>
      <p>
        You have a list of emotions that you can share with others, the most
        voted is the one shown in the tower as a cool projection!
      </p>
      <p>
        Every 10 minutes we reset the counters and you can vote again, make it
        count and share it with your friends.
      </p>
    </Root>
  )
}

export default Modal

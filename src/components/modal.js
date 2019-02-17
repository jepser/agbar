import React from "react"
import styled from "styled-components"

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: ${props => (props.color ? "white" : "#111")};
  background-color: ${props => props.color || "#f1f1"};
`

const Close = styled.button`
  marginb-bottom: 20px;
`

const CloseWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Modal = ({ color, onClose }) => {
  return (
    <Root color={color}>
      <CloseWrap>
        <Close onClick={onClose}>Close</Close>
      </CloseWrap>
      <h2>🤔 Why did we do this?</h2>
      <p>We...</p>
      <ul>
        <li>
          <a
            href="https://instagram.com/oliviakristinabengtsson"
            target="_blank"
          >
            Olivia
          </a>
        </li>
        <li>
          <a href="https://instagram.com/pmquerini" target="_blank">
            Paola
          </a>
        </li>
        <li>
          <a href="https://instagram.com/p_mayol" target="_blank">
            Pilar
          </a>
        </li>
        <li>
          <a href="https://twitter.com/tpombeiro87" target="_blank">
            Tiago
          </a>
        </li>
        <li>
          <a href="https://twitter.com/jepser" target="_blank">
            Jepser
          </a>
        </li>
      </ul>
      <p>...thought that "hacking" the Glories tower would be awesome.</p>
      <p>
        We wanted people to share a message with Barcelona, so why not something
        that makes makes them feel part of it.
      </p>
      <p>That's why we created this...</p>
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

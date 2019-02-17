import React from "react"
import styled from "styled-components"
import { Card } from "./styled-components"

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: ${props => props.color || "#f1f1"};
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
`

const Container = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
`

const Close = styled.button``

const CloseWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

const Image = styled.img`
  display: block;
  margin: 0 auto 32px;
  border-radius: 8px;
`

const Heading = styled.h2`
  color: white;
`

const Modal = ({ color, onClose, feelings }) => {
  return (
    <Root color={color}>
      <CloseWrap>
        <Close onClick={onClose}>Close</Close>
      </CloseWrap>
      <Heading>🤔 Why did we do this?</Heading>
      <Card>
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
          We wanted people to share a message with Barcelona, so why not
          something that makes makes them feel part of it.
        </p>
        <p>
          That's why we created a web app that will let you vote for what do you
          want to display in Glories tower.
        </p>
      </Card>
      <Heading>🤷‍♀️ How does it work?</Heading>
      <Card>
        <p>
          You have a list of emotions that you can share with others, the most
          voted is the one shown in the tower as a cool projection!
        </p>
        <p>
          Every 10 minutes we reset the counters and you can vote again, make it
          count and share it with your friends.
        </p>
      </Card>
      <Heading>What happens after I vote?</Heading>
      <Card>
        <p>
          You will sum to the feeling that you want to be displayed in Glories
          tower.
        </p>
        {feelings.map(feeling => (
          <div key={feeling.key}>
            <h3>
              {feeling.icon} {feeling.label}
            </h3>
            <Image src={feeling.preview} />
          </div>
        ))}
      </Card>
    </Root>
  )
}

export default Modal

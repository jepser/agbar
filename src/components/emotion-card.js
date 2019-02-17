import React from "react"
import styled, { css } from "styled-components"

const Icon = styled.div`
  font-size: 48px;
  pointer-events: none;
  margin-right: 16px;
  padding: 10px;
  transition: transform 1.2s cubic-bezier(0.75, -0.5, 0, 1.75);
`

const Button = styled.button`
  display: flex;
  background-color: ${props => (props.active ? props.color : "white")};
  color: ${props => (props.active ? "white" : "inherit")};
  border: 2px solid rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.08);
  font-family: inherit;
  transition: all 0.2s ease;
  outline: 0;
  ${props =>
    props.disabled
      ? css`
          pointer-events: none;
        `
      : null}

  :active {
    background-color: ${props => props.color || "white"};
    color: white;

    ${Icon} {
      transform: scale(1.2);
    }
  }

  * {
    pointer-events: none;
  }
`

const Content = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  align-items: center;
  font-size: 24px;
`

const Votes = styled.div`
  justify-self: flex-end;
  align-self: center;
  font-size: 18px;
  padding: 10px;
  background-color: ${props => (props.bg ? props.bg : "transparent")};
`

const Label = styled.span`
  display: block;
`

const EmotionCard = ({
  id,
  icon,
  color,
  label,
  votes,
  active,
  disabled,
  handleVotes
}) => {
  return (
    <Button
      onClick={handleVotes}
      onTouchStart={() => {}}
      value={id}
      color={color}
      active={active}
      disabled={disabled}
    >
      <Icon>{icon}</Icon>
      <Content>
        <Label>{label}</Label>
      </Content>
      <Votes>
        {votes}
        <br />
        times
      </Votes>
    </Button>
  )
}

export default EmotionCard

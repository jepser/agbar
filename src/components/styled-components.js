import styled from "styled-components"

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 48px;
`

export const CardWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Footer = styled.footer`
  text-align: center;
`

export const Paragraph = styled.p`
  max-width: 340px;
  margin-bottom: 32px;
  line-height: 1.5;
`

export const Link = styled.a`
  text-decoration: underline;
`

export const Card = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.08);
`

export const Message = styled(Card)`
  color: white;
  background-color: ${props => (props.voted ? "#111" : "#666")};
`

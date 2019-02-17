import React from "react"
import ReactDOM from "react-dom"
import EmotionCard from "./components/emotion-card"
import Modal from "./components/modal"
import styled from "styled-components"
import "./styles.css"

const EMOTIONS = {
  love: {
    label: "Love",
    icon: "🥰",
    color: "#BF395B"
  },
  vibes: {
    label: "Good Vibes",
    icon: "😎",
    color: "#62AF00"
  },
  peace: {
    label: "Peace",
    icon: "✌️",
    color: "#96CEDC"
  }
}

const AGBAR_ENDPOINT =
  "https://us-central1-hackup-light.cloudfunctions.net/changeTorreGloriasImage"

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 48px;
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: ${props => (props.voted ? 0.5 : 1)};
`

const Paragraph = styled.p`
  max-width: 320px;
  margin-bottom: 32px;
  line-height: 1.5;
`

const Link = styled.a`
  text-decoration: underline;
`

const getVotes = () => {
  return (
    // fetch("https://hackup-light.firebaseio.com/votes.json")
    Promise.resolve({ love: 100, vibes: 21, peace: 10 })
      // .then(r => r.json())
      .then(r => {
        const sortedArray = Object.entries(r).sort((keyA, keyB) => {
          return keyB[1] - keyA[1]
        })
        return sortedArray.map(([key, value]) => {
          return {
            key: key,
            votes: value,
            icon: EMOTIONS[key].icon,
            label: EMOTIONS[key].label,
            color: EMOTIONS[key].color
          }
        })
      })
  )
}

class App extends React.Component {
  state = {
    feelings: [],
    voted: "",
    isModalVisible: false
  }

  updateVotes = () => {
    getVotes().then(r => {
      this.setState({
        feelings: r
      })
    })
  }

  componentDidMount() {
    this.updateVotes()

    // setInterval(() => {
    //   this.updateVotes()
    // }, 5000)
  }

  closeModal = e => {
    e.preventDefault()
    this.setState({
      isModalVisible: false
    })
  }

  openModal = e => {
    e.preventDefault()
    this.setState({
      isModalVisible: true
    })
  }

  handleSelectEmotion = e => {
    e.preventDefault()

    const votedEmotion = e.target.value

    this.setState({
      voted: votedEmotion
    })
    console.log(votedEmotion)
    // fetch(`${AGBAR_ENDPOINT}?image=${image}`).then(r => {
    //   console.log(r)
    // })
  }

  render() {
    const { isModalVisible, feelings, voted } = this.state
    return (
      <div className="App">
        <Title>
          What would you <br /> like to share?
        </Title>
        <Paragraph>
          Each person shapes the city, each one has something that makes it
          special. <Link onClick={this.openModal}>Want to learn more?</Link>
        </Paragraph>
        <ButtonWrap voted={voted}>
          {feelings.map(emotion => {
            const { key } = emotion
            return (
              <EmotionCard
                {...emotion}
                id={key}
                active={key === voted}
                disabled={!!voted}
                handleSelectEmotion={this.handleSelectEmotion}
              />
            )
          })}
        </ButtonWrap>
        {isModalVisible && <Modal onClose={this.closeModal} />}
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

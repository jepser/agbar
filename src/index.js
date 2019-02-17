import React from "react"
import ReactDOM from "react-dom"
import EmotionCard from "./components/emotion-card"
import Modal from "./components/modal"
import {
  Title,
  CardWrap,
  Paragraph,
  Link,
  Card,
  Footer,
  Message
} from "./components/styled-components"
import "./styles.css"
import { getVotes, saveVote } from "./lib"

class App extends React.Component {
  state = {
    secsLeft: 20,
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

    setInterval(() => {
      this.updateVotes()
    }, 60000)
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

  startCounter = () => {
    let secsLeft = 30
    const c = setInterval(() => {
      --secsLeft
      if (secsLeft <= 0) {
        clearInterval(c)
        return this.setState({
          voted: ""
        })
      }

      this.setState({
        secsLeft: secsLeft
      })
    }, 1000)
  }

  handleVote = e => {
    e.preventDefault()

    if (this.state.voted) return false

    const votedEmotion = e.target.value

    this.startCounter()

    this.setState(state => ({
      voted: votedEmotion
    }))

    saveVote(votedEmotion).then(feelings => {
      this.setState({
        feelings
      })
    })
  }

  render() {
    const { isModalVisible, feelings, voted, secsLeft } = this.state
    const timeLeft = secsLeft
    return (
      <div className="App">
        <Title>What feeling would you like to share?</Title>
        <Paragraph>
          Each person shapes the city, each one has something that makes it
          special. <br /> <b>Let's show it in Glories tower.</b> <br />—{" "}
          <Link onClick={this.openModal}>Want to learn more?</Link>
        </Paragraph>

        <CardWrap voted={voted}>
          <Message voted={!!voted}>
            {voted
              ? `Thanks for voting! You can vote again in ${timeLeft} seconds. 💁‍♀️`
              : "Choose one and see the tower 👀"}
          </Message>
          {feelings.map(emotion => {
            const { key } = emotion
            return (
              <EmotionCard
                {...emotion}
                id={key}
                active={key === voted}
                disabled={!!voted}
                handleVotes={this.handleVote}
              />
            )
          })}
        </CardWrap>
        {isModalVisible && (
          <Modal
            color={feelings[0] ? feelings[0].color : "#f1f1f1"}
            onClose={this.closeModal}
            feelings={feelings}
          />
        )}
        <Footer>
          <p>·</p>
          <p>
            <a
              href="https://feel-glories.typeform.com/to/UlVwlw"
              target="_blank"
            >
              Want to add another one?
            </a>
          </p>
          <p>
            Share it in your favourite platform.{" "}
            <a
              target="_blank"
              href="https://www.instagram.com/explore/tags/feelglories/"
            >
              #feelglories
            </a>
          </p>
          <p>Made with ☕️, 🍕, 🍺 and 💝 in Barcelona, in 24 hours.</p>
        </Footer>
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

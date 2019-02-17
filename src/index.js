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
  Footer
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
        <Title>
          What would you <br /> like to share?
        </Title>
        <Paragraph>
          Each person shapes the city, each one has something that makes it
          special. <Link onClick={this.openModal}>Want to learn more?</Link>
        </Paragraph>

        <CardWrap voted={voted}>
          <Card>
            {voted
              ? `Thanks for voting! Wait ${timeLeft} seconds to vote again. 💁‍♀️`
              : "Choose what you want to share, then see the tower 👀"}
          </Card>
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
            <a href="">Want to share your own feeling?</a>
          </p>
          <p>Made with ☕️, 🍕, 🍺 and 💝 in Barcelona, in 24 hours.</p>
        </Footer>
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

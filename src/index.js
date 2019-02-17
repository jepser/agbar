import React from "react"
import ReactDOM from "react-dom"
import EmotionCard from "./components/emotion-card"
import Modal from "./components/modal"
import {
  Title,
  ButtonWrap,
  Paragraph,
  Link,
  Voted
} from "./components/styled-components"
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
  },
  energy: {
    label: "Energy",
    icon: "⚡️",
    color: "#FFBA49"
  }
}

const ADD_VOTE_EP =
  "https://us-central1-hackup-light.cloudfunctions.net/addVote"
const GET_VOTES_EP =
  "https://us-central1-hackup-light.cloudfunctions.net/getVotes"

const mapVotesToUI = votes => {
  return votes.map(({ feeling, numberVotes }) => {
    const feelingMeta = EMOTIONS[feeling]
    return {
      key: feeling,
      votes: numberVotes,
      icon: feelingMeta.icon,
      label: feelingMeta.label,
      color: feelingMeta.color
    }
  })
}

const getVotes = () => {
  return fetch(GET_VOTES_EP)
    .then(r => r.json())
    .then(r => r.orderedRanking)
    .then(mapVotesToUI)
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

  handleVotes = e => {
    e.preventDefault()

    if (this.state.voted) return false

    const votedEmotion = e.target.value

    this.setState(state => ({
      voted: votedEmotion
    }))

    fetch(`${ADD_VOTE_EP}?feeling=${votedEmotion}`)
      .then(r => r.json())
      .then(r => r.orderedRanking)
      .then(mapVotesToUI)
      .then(feelings => {
        this.setState({
          feelings
        })
        // this.setState(state => {
        //   const newFeelings = state.feelings.map(feel => ({
        //     ...feel,
        //     votes: votedEmotion === feel.key ? feel.votes + 1 : feel.votes
        //   }))
        //   return {
        //     feelings: newFeelings
        //   }
        // })
      })

    setTimeout(() => {
      this.setState({
        voted: ""
      })
    }, 20000)
  }

  render() {
    const { isModalVisible, feelings, voted } = this.state
    const votedEmotion = feelings.find(f => f.key === voted)
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
          <Voted>
            {voted
              ? "Thanks for voting! Wait a bit to vote again. 💁‍♀️"
              : "Choose what you want to share, then see the tower 👀"}
          </Voted>
          {feelings.map(emotion => {
            const { key } = emotion
            return (
              <EmotionCard
                {...emotion}
                id={key}
                active={key === voted}
                disabled={!!voted}
                handleVotes={this.handleVotes}
              />
            )
          })}
        </ButtonWrap>
        {isModalVisible && (
          <Modal color={feelings[0].color} onClose={this.closeModal} />
        )}
        <p>Made with ☕️, 🍕, 🍺 and 💝 in Barcelona.</p>
      </div>
    )
  }
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

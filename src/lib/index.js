import { EMOTIONS, ADD_VOTE_EP, GET_VOTES_EP } from "../contants"

export const mapVotesToUI = votes => {
  return votes.map(({ feeling, numberVotes }) => {
    const feelingMeta = EMOTIONS[feeling]
    return {
      key: feeling,
      votes: numberVotes,
      icon: feelingMeta.icon,
      label: feelingMeta.label,
      color: feelingMeta.color,
      preview: feelingMeta.preview
    }
  })
}

export const mockedVotes = () => {
  return Promise.resolve({
    orderedRanking: [
      {
        feeling: "love",
        numberVotes: 10
      },
      {
        feeling: "energy",
        numberVotes: 1
      }
    ]
  })
}

export const getVotes = () => {
  return fetch(GET_VOTES_EP)
    .then(r => r.json())
    .then(r => r.orderedRanking)
    .then(mapVotesToUI)
}

export const saveVote = emotion => {
  return fetch(`${ADD_VOTE_EP}?feeling=${emotion}`)
    .then(r => r.json())
    .then(r => r.orderedRanking)
    .then(mapVotesToUI)
}

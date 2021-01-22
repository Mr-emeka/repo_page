export var query = `query ($noOfRepository: Int!,$noOfOrg: Int!) {
	viewer {
	  name
	  login
	  avatarUrl
	  bio
	organizations(first: $noOfOrg) {
      nodes {
        name
        avatarUrl
      }
    }
    twitterUsername
    websiteUrl
    company
	  followers {
		totalCount
	  }
	  following {
		totalCount
	  }
	  starredRepositories {
		totalCount
	  }
	  repositories(first: $noOfRepository,orderBy: {field: UPDATED_AT, direction: DESC}) {
	    totalCount
		nodes {
		  id
		  name
		  createdAt
		  viewerHasStarred
		  forkCount
		  stargazerCount
		  updatedAt
      description
      nameWithOwner
      isFork
      isPrivate
		  primaryLanguage {
			id
			name
			color
		  }
		}
	  }
	  status {
		emojiHTML
		message
		emoji
	  }
	}
  }`;


export const formatTime = (dateString) => {
  const options = { day: "numeric", month: "short" };
  return new Date(dateString).toLocaleDateString("en-NG", options);
};

export const formatNumber = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}
import React from 'react';
import { formatTime, formatNumber } from '../../../helpers'

type Props = {
	name: string,
	description: string,
	stargazerCount: any,
	forkCount: any,
	primaryLanguage: any,
	updatedAt: string,
	isPrivate: boolean
}
const RepoCard: React.FC<Props> = ({ name, isPrivate, description, stargazerCount, forkCount, primaryLanguage, updatedAt }) => {
	return <div className="d-flex py-4 justify-content-between repository">
		<div className="p-0">
			<div>
				<h3 className="repository__name"><a href={`https://github.com/Mr-emeka/${name}`} >{name} </a></h3>
				<span className={`${isPrivate ? 'repository__isPrivate' : ''}`}>{isPrivate ? 'Private' : ''}</span>
			</div>
			<div>
				<p className="repository__description pr-4">
					{description ? description : ""}
				</p>
			</div>
			<div className="repository__info d-flex mt-2">
				{primaryLanguage !== null && <span>
					<span className="repository__color" style={{ backgroundColor: `${primaryLanguage?.color}` }}></span>
					<span>{primaryLanguage?.name}</span>
				</span>}
				{stargazerCount >= 1 && <span>
					<span>
						<svg
							className="octicon octicon-star mr-1"
							viewBox="0 0 16 16"
							version="1.1"
							width="16"
							height="16"
							aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
						</svg>
					</span>
					<span className="repository__star">{stargazerCount && stargazerCount}</span>
				</span>}
				{forkCount >= 1 && <span>
					<span>
						<svg
							aria-label="fork"
							className="octicon octicon-repo-forked"
							viewBox="0 0 16 16"
							version="1.1"
							width="16"
							height="16"
							role="img">
							<path
								fill-rule="evenodd"
								d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
						</svg>
					</span>
					<span className="repository__fork">{formatNumber(Number(forkCount))}</span>
				</span>}
				<span className="repository__update">Updated on {formatTime(updatedAt)}</span>
			</div>
		</div>
		<div className="p-0 repository__star">
			<button className="btn-sm repository__btn">
				<svg
					className="octicon octicon-star mr-1"
					viewBox="0 0 16 16"
					version="1.1"
					width="16"
					height="16"
					aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
				</svg>
					Star
				</button>
		</div>
	</div>;
}

export default RepoCard;
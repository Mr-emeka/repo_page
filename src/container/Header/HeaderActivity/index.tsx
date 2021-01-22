import React from 'react';

type Props = {
    avatar: string
}
const HeaderActivity: React.FC<Props> = ({ avatar }) => {
    return <div className="activity">
        <summary>
            <svg className="octicon octicon-plus" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                aria-hidden="true">
                <path fillRule="evenodd"
                    d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z">
                </path>
            </svg>
            <span className="activity__dropdown"></span>
        </summary>
        <summary>
            <img id="avatar" className="profile__avatar--sm" alt="profile avatar" width="20" height="20" src={avatar} />
            <span className="activity__dropdown"></span>
        </summary>
    </div>;
}

export default HeaderActivity;
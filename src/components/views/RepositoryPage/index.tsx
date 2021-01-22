import React, { useEffect, useState } from 'react';
import Layout from '../../Layouts'
import Tabs from '../../custom/Tabs'
import { query } from '../../../helpers'
import Search from '../../custom/Search'
import RepoCard from '../../custom/RepoCard'
import useScroll from '../../../hooks/useScroll'

const Home: React.FC = () => {
    const [noOfRepository] = useState<number>(100)
    const [noOfOrg] = useState<number>(20)
    const [edit, setEdit] = useState<boolean>(false)
    const [data, setData] = useState<any>({})
    const [repos, setRepos] = useState<any>([])
    const [searchValue, setSearchValue] = useState<string>('')
    // Pagination Use State
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [maxItemsPerPage] = useState<number>(30)
    const { y } = useScroll()

    useEffect(() => {

        var variables = { noOfRepository, noOfOrg };
        let body = JSON.stringify({ query, variables, });
            fetch("https://api.github.com/users/Mr-emeka/repos")
        .then(res => res.json())
        .then(repos => {
            console.log(repos)
        });

        fetch(`https://api.github.com/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `bearer ${process.env.REACT_APP_access_token}`,
            },
            body,
        }).then(res => res.json()).then(({ data }) => {
            setRepos(data.viewer.repositories.nodes)
            setData(data.viewer)
        })
    }, [noOfOrg, noOfRepository])


    const handleSearch = (e:any) => {
        setSearchValue(e.target.value)
    }
    return <Layout avatar={data.avatarUrl} handleSearch={handleSearch}>
        <div className="col-sm-12 d-block d-sm-none ">
            <div className="d-flex mb-2">
                <img className="profile__avatar--sm"
                    src={data.avatarUrl}
                    alt="profile picture" width="32" height="32" />
                <div>
                    <span className="profile__name--sm" id="fullname">{data.name} </span>
                    <span className="profile__username-sm" id="username">{data.login} </span>
                </div>
            </div>
            <div className="profile__status--sm">👻 <span>Ghost Mode</span></div>
            <p id="profile__bio" className="mb-3">{data.bio}</p>
            {!edit && <button className="btn profile__editBtn my-3" onClick={() => setEdit(true)} > Edit Profile</button>}
            {edit && <div className="form-group-body">
                <textarea className="form-control mb-3" value={data.bio} placeholder="Add bio"></textarea>
            </div>}
            {!edit && <div className="profile__column d-flex mb-3">
                <div className="profile__followers">
                    <span>
                        <svg className="octicon octicon-people text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
                    </span>
                    {data?.followers?.totalCount} followers {'.'}
                </div>
                <div className="profile__following">
                    {data?.following?.totalCount} Following {"."}
                </div>
                <div className="profile__starred">
                    <span>
                        <svg className="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                    </span>
                    {data?.starredRepositories?.totalCount}
                </div>
            </div>}
            <div className="profile__data mb-3">
                {edit && <div>
                    <span>
                        <svg className="octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path></svg></span>

                    <input className="profile__input" value={data.company} />

                </div>}
                {edit && <div> <span><svg className="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </span>

                    <input className="profile__input" value="Lagos Nigeria" />
                </div>}
                <div><span><svg className="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></span>  {!edit && <span className="truncate">{data.websiteUrl}</span>}
                    {edit && <input className="profile__input" value={data.websiteUrl} />}</div>
                {edit && <div> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3" className="octicon"><path d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1" fill="currentColor"></path></svg></span>
                    <input className="profile__input" value={data.twitterUsername} />
                </div>}

            </div>
            {edit && <div className="my-3">
                <button className="btn profile__saveBtn" onClick={() => setEdit(false)}>save </button>
                <button className="btn profile__cancelBtn" onClick={() => setEdit(false)}>cancel </button>
            </div>}


        </div>
        <nav className="scroll-nav sticky">
            <div className="d-flex  px-3 px-md-4 px-lg-5">
                <div className="d-none d-md-block col-md-3" style={{ opacity: `${y >= 373 ? '1' : '0'}` }}>
                    <span>
                        <img className="profile__avatar--sm"
                            src={data.avatarUrl}
                            alt="profile picture" width="32" height="32" />
                        <span className="ml-2" id="username">{data.login} </span>
                    </span>
                </div>
                <Tabs count={data?.repositories?.totalCount} />
            </div>
        </nav>
        {/*  Main Content */}
        <section className="mb-5">
            <div className="d-flex px-3 px-md-4 px-lg-5">
                <div className="profile col-md-3 d-none d-md-block">
                    <div className="profile__container">
                        <img
                            src={data.avatarUrl}
                            alt="avatar_url"
                            className="profile__img"
                            width="260"
                            height="260"
                        />
                        <div className="profile__statusEmoji">👻</div>
                    </div>
                    <div className="profile__userdetails mt-3">
                        <h3 className="profile__fullname">{data.name}</h3>
                        <span className="profile__username mb-3">{data.login}</span>
                        <p className="profile__bio my-3">{data.bio}</p>
                    </div>
                    <div className="flex-column">
                        {edit && <div className="form-group-body">
                            <textarea className="form-control mb-3" value={data.bio} placeholder="Add bio"></textarea>
                        </div>}
                        {!edit && <button className="btn profile__editBtn" onClick={() => setEdit(true)} > Edit Profile</button>}
                        {!edit && <div className="profile__column d-flex mb-3">
                            <div className="profile__followers">
                                <span>
                                    <svg className="octicon octicon-people text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
                                </span>
                                {data?.followers?.totalCount} followers {'.'}
                            </div>
                            <div className="profile__following">
                                {data?.following?.totalCount} Following {"."}
                            </div>
                            <div className="profile__starred">
                                <span>
                                    <svg className="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                                </span>
                                {data?.starredRepositories?.totalCount}
                            </div>
                        </div>}
                        <div className="profile__data">
                            <div>
                                <span>
                                    <svg className="octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path></svg></span>
                                {!edit && <span>{data.company}</span>}
                                {edit && <input className="profile__input" value={data.company} />}

                            </div>
                            <div> <span><svg className="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                            </span>
                                {!edit && <span>Lagos Nigeria</span>}
                                {edit && <input className="profile__input" value="Lagos Nigeria" />}
                            </div>
                            <div><span><svg className="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></span>  {!edit && <span className="truncate">{data.websiteUrl}</span>}
                                {edit && <input className="profile__input" value={data.websiteUrl} />}</div>
                            <div> <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3" className="octicon"><path d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1" fill="currentColor"></path></svg></span> {!edit && <span>{data.twitterUsername}</span>}
                                {edit && <input className="profile__input" value={data.twitterUsername} />}</div>
                        </div>
                        {edit && <div className="my-3">
                            <button className="btn profile__saveBtn" onClick={() => setEdit(false)}>save </button>
                            <button className="btn profile__cancelBtn" onClick={() => setEdit(false)}>cancel </button>
                        </div>}
                    </div>
                    <hr />
                    <div>
                        <h6>Highlights</h6>
                        <div>
                            <span><svg className="octicon octicon-north-star text-gray-light mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z"></path></svg></span> Artic Code Vault Contributor
                    </div>
                    </div>
                    <hr />
                    <div>
                        <h6>Organizations</h6>
                        <div>
                            {data?.organizations?.nodes.map(({ avatarUrl, name }:{avatarUrl:string, name:string}) => {
                                return <img height="32" width="32" alt={name} src={avatarUrl} className="mr-1 mb-1" />
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-md-9 repo p-0">
                    <div className="repo__search py-3">
                        <Search handleSearch={handleSearch} />
                    </div>
                    {repos.slice((currentPage * maxItemsPerPage) - maxItemsPerPage, currentPage * maxItemsPerPage)
                        .filter(({ name }:{name:string}) => name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map(({ name, isPrivate, description, stargazerCount, forkCount, primaryLanguage, updatedAt }:{name:string, isPrivate:boolean, description:string, stargazerCount:string, forkCount:number, primaryLanguage:any, updatedAt:string}, idx:number) => <RepoCard key={idx}
                            name={name} description={description} stargazerCount={stargazerCount}
                            forkCount={forkCount} primaryLanguage={primaryLanguage}
                            isPrivate={isPrivate}
                            updatedAt={updatedAt} />

                        )}
                    {repos.length >= 1 && <div className="repository__pagination my-3">
                        <button className="btn repository__prevBtn" disabled={currentPage > 1 ? false : true} onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : null}>Previous</button>

                        <button className="btn repository__nextBtn"
                            disabled={repos.length > currentPage * maxItemsPerPage ? false : true}
                            onClick={() => repos.length > currentPage * maxItemsPerPage ? setCurrentPage(currentPage + 1) : null}>Next</button>
                    </div>}
                </div>
            </div>
        </section>
    </Layout>;
}

export default Home;
import { useEffect, useState } from 'react';
import { TVShowApi } from './api/tv-show'
import s from './style.module.css'
import { BACKDROP_BASE_URL } from './config';
import { TvShowDetail } from './components/TvShowDetail/TvShowDetails';
import { Logo } from './components/Logo/Logo';
import LogoImg from './assets/images/logo.png'
import { TvShowListItem } from './components/TvShowListItem/TvShowListItem';
import { TvShowList } from './components/TvShowList/TvShowList';
import { SearchBar } from './components/SearchBar/SearchBar';

export function App() {
    const [currentTvShow, setCurrentTvShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try{
            const popularTvShowList = await TVShowApi.fetchPopulars();
            if (popularTvShowList.length > 0) {
                setCurrentTvShow(popularTvShowList[0]);
            }
        }catch(error){
            alert('soemthing went wrong')
        }
        
    }

    async function fetchRecommendations(tvShowId) {
        const recommendationListResp = await TVShowApi.fetchRecommendations(tvShowId);
        if (recommendationListResp.length > 0) {
            setRecommendationList(recommendationListResp.slice(0,10));
        }
    }

    async function fetchByTitle(title) {
        const searchResponse = await TVShowApi.fetchByTitle(title);
        if (searchResponse.length > 0) {
            setCurrentTvShow(searchResponse[0]);
        }
    }
    
    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if(currentTvShow){
            fetchRecommendations(currentTvShow.id)
        }
    },[currentTvShow]);

    function updateCurrentTvShow(tvShow){
        setCurrentTvShow(tvShow);
    }

    return (
        <div className={s.main_container} style={{
            background: currentTvShow
                ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
                 url("${BACKDROP_BASE_URL}${currentTvShow.backdrop_path}") no-repeat center / cover`
                : "black",
        }}>
            <div className={s.header}>
                <div className='row'>
                    <div className='col-4'>
                        <Logo img={LogoImg} title='Watowatch' subtitle='Find a show you may like'/>
                    </div>
                    <div className='col-md-12 col-lg-4'>
                        <SearchBar onSubmit={fetchByTitle}/>
                    </div>
                </div>
            </div>
            <div className={s.tv_show_details}>
                {currentTvShow && <TvShowDetail tvShow={currentTvShow}/>}
            </div>
            <div className={s.recommended_tv_shows}>
                {currentTvShow && <TvShowList onClickItem={updateCurrentTvShow} tvShowList={recommendationList}/>}
            </div>
        </div>
    )
}
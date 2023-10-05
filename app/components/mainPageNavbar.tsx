import { AddFriend, UserDefaultIcon, Users } from './Icons/Icons';

export default function MainPageNavbar() {


    return (
        <div className="main-page-navbar">
            <div className='main-page-profile-icon-container'>
                <UserDefaultIcon height={32} width={32} className='profile-icon-icon'/>
            </div>
            <div className='users-icon-container'>
                <div className='users-div'>
                    <Users height={52} width={52} className='users-add-friend-icon'/>
                    <div className='requests-count'>
                        <p>0</p>
                    </div>
                </div>
                <AddFriend height={52} width={52} className='users-add-friend-icon'/>
            </div>
        </div>
    )

}
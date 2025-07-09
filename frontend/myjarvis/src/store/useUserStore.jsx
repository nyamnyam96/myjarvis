import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create (
    persist (
        (set) => ({
            isLogined : false,
            setIsLogined : function(loginChk){
                set({
                    isLogined : loginChk
                })
            },
            loginMember : null,
            setLoginMember : function(memberObj){
                set({
                    loginMember : memberObj
                })
            },
            accessToken : null,
            setAccessToken : function(accessToken){
                set({
                    accessToken : accessToken
                })
            },
            refreshToken : null,
            setRefreshToken : function(refreshToken){
                set({
                    refreshToken : refreshToken
                })
            }
        })
    )
);

export default useUserStore;
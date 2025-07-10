import axios from "axios";
import Swal from "sweetalert2";
import useUserStore from '../store/useUserStore';
import { customHistory } from "../component/common/history";

//외부 컴포넌트에서 서버 요청 시 사용할 axios 인트선트 생성 함수
export default function createInstance(){
    const instance = axios.create();
    return setInterceptors(instance);
}

//axios 인스턴스에 인터셉터 설정
function setInterceptors(instance) {

    instance.interceptors.request.use(
        function(config) {

            //zustand 라이브러리에서 로그인된 사용자의 accessToken을 꺼내옴
            const accessToken = useUserStore.getState().accessToken;

            if(accessToken != null){ // 토큰이 있을 경우, 요청 헤더에 자동으로 추가함
                config.headers['Authorization'] = accessToken; //로그인 후 서버에 요청 보낼 때마다 자동으로 토큰이 붙음
            }
            
            return config; //수정된 설정 config를 axios에 전달해서 요청이 실제로 나가도록 만듬
        },
        function(error){
            return Promise.reject(error); //요청전에 오류가 발생하면 Promise.reject 해서 .catch()로 처리되게 함
        },
    );

    instance.interceptors.response.use( //axios 인스턴스에 응답 인터셉터(response interceptor)를 등록하면 서버에서 응답을 받을 때 이 코드가 자동으로 실행됨

        function(response) { //응답이 성공했을 때 실행되는 함수
            if(response.data.clientMsg != undefined && response.data.clientMsg != ''){ 
                Swal.fire({
                    title : '알림',
                    text : response.data.clientMsg,
                    icon : response.data.alertIcon
                });
        
            }
            return response;
        },
        function(error) { //응답이 실패했을 때 실행되는 함수
            
            const originalRequest = error.config; //실패한 요청 정보 config를 originalRequest라는 변수에 저장 

            if(error.status == 403){ // HTTP 상태 코드가 403이면 권한없음, 토큰 만료인경우

                if(error.config.headers.refreshToken === undefined
                    && !originalRequest._retry
                ){  //조건 : 이 요청이 리프레시 토큰 요청이 아님
                    //아직 재시도 한 적이 없음 retry플래그가 false
                    
                    //상태 저장소에서 로그인 정보와 리프레시 토큰을 꺼냄
                    const loginMember = useUserStore.getState().loginMember;
                    const refreshToken = useUserStore.getState().refreshToken;
                
                    let options = {};
                    options.url = import.meta.env.VITE_BACK_SERVER + '/member/refresh';
                    options.method = 'post';
                    options.data = loginMember;
                    options.headers = {};
                    options.headers.refreshToken = refreshToken;
                    //토큰 재발급 요청 구성 
                    //데이터 : 로그인된 사용자 정보
                    //헤더 : 리프레시 토큰을 함께 보냄


                    //재발급 성공 요청 재시도
                    return instance(options)
                    .then(function(res){ 
                    if(res.data.resData != null){
                                //응답 데이터가 있다면 토큰 재발급 성공
                                const reAccessToken = res.data.resData;
                                useUserStore.getState().setAccessToken(reAccessToken);

                                originalRequest.headers['Authorization'] = reAccessToken;
                                originalRequest._retry = true;
                                //원래 요청의 헤더에 새 토큰 설정하고 retry 를 true로 바꿈

                                return instance(originalRequest);
                                //원래 요청을 새 토큰으로 다시 실행
                            }
                        })
                        .catch(function(error){
                            return Promise.reject(error);
                        })
                    }else {
                        console.log('test2');
                    //실패하거나 재시도 조건이 맞지않으면
                    Swal.fire({
                        title : '알림',
                        text : '로그인 기간이 만료되었습니다. 다시 로그인 하세요.',
                        icon : 'warning',
                        confirmButtonText : '확인'
                    }).then(function(result){

                        if(result.isConfirmed){
                            useUserStore.getState().setIsLogined(false);
                            useUserStore.getState().setAccessToken(null);
                            useUserStore.getState().setRefreshToken(null);

                            customHistory.push('/login');
                        }
                    })
                }
            }else if(error.status == 401){

            }else {
                const res = error.response.data;
                Swal.fire({
                    title : '알림',
                    text : res.clientMsg,
                    icon : res.alertIcon
                });
            }

            return Promise.reject(error);
        },
    );

    return instance;
}
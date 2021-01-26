import Vue from 'vue'

export default Vue.directive('google-sheets-signin-button', {
    bind: function (el, binding, vnode) {
        CheckComponentMethods()
        let clientId = binding.value
        let googleSignInAPI = document.createElement('script')
        googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api.js')
        document.head.appendChild(googleSignInAPI)

        googleSignInAPI.onload = InitGoogleButton

        function InitGoogleButton() {
            gapi.load('auth2', () => {
                const auth2 = gapi.auth2.init({
                    client_id: clientId,
                    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
                    cookie_policy: 'single_host_origin',
                    fetch_basic_profile: false,
                    access_type: 'offline',
                    response_type: 'token'
                })
                auth2.attachClickHandler(el, {},
                    OnSuccess,
                    OnFail
                )
            })
        }

        function OnSuccess(googleUser) {
            let authResponse = googleUser.getAuthResponse()
            googleUser.grantOfflineAccess().then((res) => {
                authResponse.refresh_token = res.code;
                vnode.context.OnGoogleSheetsAuthSuccess(authResponse)
            });
        }

        function OnFail(error) {
            vnode.context.OnGoogleSheetsAuthFail(error)
        }

        function CheckComponentMethods() {
            if (!vnode.context.OnGoogleSheetsAuthSuccess) {
                throw new Error('The method OnGoogleSheetsAuthSuccess must be defined on the component')
            }

            if (!vnode.context.OnGoogleSheetsAuthFail) {
                throw new Error('The method OnGoogleSheetsAuthFail must be defined on the component')
            }
        }
    }
})

type User = {
    user: string
    token: string
}

class AuthService {
    private users: User[] = [
        { user : "Authority", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InJlbnRhbCIsImFwcGxpY2F0aW9uSWQiOiJyZW50YWwiLCJwYXJ0eSI6IkF1dGhvcml0eSJ9.yyLBJ84Wmte6Qh3tuoTc4bajzmGMqxc_1WqVa3X9ykk" },
        { user : "Agency", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InJlbnRhbCIsImFwcGxpY2F0aW9uSWQiOiJyZW50YWwiLCJwYXJ0eSI6IkFnZW5jeSJ9.w_pWjiEB3bYLlrdXHwFw3o6Qq_bXXr093lPtPfcnVIE" },
        { user : "Landlord", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InJlbnRhbCIsImFwcGxpY2F0aW9uSWQiOiJyZW50YWwiLCJwYXJ0eSI6IkxhbmRsb3JkIn0.4gVoTUa5g7EN0DQHYuJvutJtDCIGPf_HcWY4SK2xzes" },
        { user : "Tenant", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InJlbnRhbCIsImFwcGxpY2F0aW9uSWQiOiJyZW50YWwiLCJwYXJ0eSI6IlRlbmFudCJ9.SewIFzDkt3Nhdwe1B_F8yns9WbfZjvGBABm8hbrhBqw" },
        { user : "Renter1", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InJlbnRhbCIsImFwcGxpY2F0aW9uSWQiOiJyZW50YWwiLCJwYXJ0eSI6IlJlbnRlcjEifQ.5dom08x-MhNCYxkaL8QnQfgnzxMfThz-HLEgdT_I1Fo" },
        { user : "Renter2", token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWRnZXJJZCI6InJlbnRhbCIsImFwcGxpY2F0aW9uSWQiOiJyZW50YWwiLCJwYXJ0eSI6IlJlbnRlcjIifQ.sJd0PbO5mP4F4AVTol7INe5VxyNmSSWWi17rGkExNc0" }
    ]

    signIn = async (u: string): Promise<string> =>
        new Promise((resolve, reject) => {
            setTimeout (
                () => {
                    const lookedUpUser = this.users.find(user => user.user === u)
                    if (lookedUpUser != null)
                        resolve(lookedUpUser.token)
                    else
                        reject("Wrong credentials")
                },
                100
            )
        });

    isUserAuthenticated = () => !!localStorage.getItem('user')

    isUser = (role: string) => localStorage.getItem('user') === role
}

export default new AuthService()
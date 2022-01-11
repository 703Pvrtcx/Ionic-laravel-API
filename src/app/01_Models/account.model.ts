import { UserInfo } from "./userInfo";

export class Account{

    private UserInfo: UserInfo;

    constructor(UserInfo: UserInfo){
        this.UserInfo = UserInfo;
    }

    public setUserInfo(UserInfo: UserInfo){
        this.UserInfo = UserInfo;
    }

    public getUserInfo(): UserInfo{
        return this.UserInfo;
    }
 
}